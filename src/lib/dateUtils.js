export const formatMonthDate = (date) => {
  const d = new Date(date);
  const month = '' + (d.getMonth() + 1);
  const year = d.getFullYear();

  return [year, month.padStart(2, '0'), '01'].join('-');
};

export const getMonthName = (date) => {
  return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date);
};

export const getNextMonth = (date) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  return d;
};

export const getPrevMonth = (date) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() - 1);
  return d;
};
