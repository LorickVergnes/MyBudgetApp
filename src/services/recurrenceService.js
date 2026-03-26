import { supabase } from '../lib/supabaseClient';
import { formatMonthDate } from '../lib/dateUtils';

/**
 * Service pour gérer la récurrence des éléments (Revenus, Dépenses, Enveloppes, Épargne)
 */
export const recurrenceService = {
  /**
   * Vérifie et applique les éléments récurrents du mois précédent vers le mois actuel
   * @param {string} userId - ID de l'utilisateur
   * @param {Date} currentMonth - Date du mois actuel
   */
  async checkAndApplyRecurrence(userId, currentMonth) {
    if (!userId) return;

    // Calcul du mois précédent
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    const currentMonthStr = formatMonthDate(currentMonth);
    const prevMonthStr = formatMonthDate(prevMonth);

    const tables = ['incomes', 'expenses', 'envelopes', 'savings'];

    for (const table of tables) {
      await this.syncTableRecurrence(table, userId, prevMonthStr, currentMonthStr);
    }
  },

  /**
   * Synchronise une table spécifique pour la récurrence
   */
  async syncTableRecurrence(table, userId, prevMonthStr, currentMonthStr) {
    try {
      // 1. Récupérer les éléments récurrents du mois précédent
      const { data: recurrentItems, error: fetchError } = await supabase
        .from(table)
        .select('*')
        .eq('user_id', userId)
        .eq('month_date', prevMonthStr)
        .eq('is_recurrent', true);

      if (fetchError) throw fetchError;
      if (!recurrentItems || recurrentItems.length === 0) return;

      // 2. Récupérer les éléments du mois actuel pour éviter les doublons
      const { data: currentItems, error: currentError } = await supabase
        .from(table)
        .select('name')
        .eq('user_id', userId)
        .eq('month_date', currentMonthStr);

      if (currentError) throw currentError;

      const currentNames = new Set(currentItems?.map(item => item.name.toLowerCase()));

      // 3. Filtrer les éléments qui n'existent pas encore dans le mois actuel et dont la date limite n'est pas dépassée
      const itemsToClone = recurrentItems
        .filter(item => {
          if (currentNames.has(item.name.toLowerCase())) return false;
          if (item.max_month && currentMonthStr > item.max_month) return false;
          return true;
        })
        .map(item => {
          // eslint-disable-next-line no-unused-vars
          const { id, created_at, month_date, ...rest } = item;

          // Les tables incomes/expenses ont une colonne `date` à recalculer
          if (table === 'expenses' || table === 'incomes') {
            const prevDate = new Date(item.date);
            const nextDate = new Date(currentMonthStr);
            nextDate.setDate(Math.min(prevDate.getDate(), new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate()));
            return {
              ...rest,
              month_date: currentMonthStr,
              date: nextDate.toISOString().split('T')[0]
            };
          }

          // Pour envelopes et savings : pas de colonne `date`, on ne l'inclut pas
          return {
            ...rest,
            month_date: currentMonthStr
          };
        });

      if (itemsToClone.length > 0) {
        const { error: insertError } = await supabase
          .from(table)
          .insert(itemsToClone);

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error(`Erreur lors de la synchronisation de la table ${table}:`, error.message);
    }
  }
};
