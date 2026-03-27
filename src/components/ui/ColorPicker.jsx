import React from 'react';
import { ALL_COLORS, generateShades, getNextAvailableColor } from '../../lib/colorUtils';

const ColorPicker = ({ value, onChange, usedColors = [] }) => {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', display: 'block', marginBottom: 12 }}>
        Couleur de l'icône
      </label>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {ALL_COLORS.map(c => {
          const shadesOfC = generateShades(c);
          const isPartOfFamily = shadesOfC.includes(value);
          const isBaseUsed = usedColors.includes(c);
          
          const handleClick = () => {
            // Find next available shade in this family
            const nextColor = getNextAvailableColor(c, usedColors);
            onChange(nextColor);
          };

          return (
            <button 
              key={c} 
              type="button" 
              onClick={handleClick}
              style={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                background: c, 
                border: isPartOfFamily ? '3px solid #1a1a2e' : 'none', 
                cursor: 'pointer', 
                padding: 0,
                position: 'relative',
                transition: 'transform 0.2s',
              }} 
              title={isBaseUsed ? "Cette couleur est déjà utilisée, une nuance sera choisie" : ""}
            >
              {isBaseUsed && !isPartOfFamily && (
                <div style={{ 
                  position: 'absolute', 
                  bottom: -2, 
                  right: -2, 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%', 
                  background: '#94a3b8', 
                  border: '2px solid white' 
                }} />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Show current shade info if it's not the base color */}
      {value && !ALL_COLORS.includes(value) && (
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: value }} />
          <span style={{ fontSize: 11, color: '#94a3b8' }}>Nuance automatique sélectionnée</span>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
