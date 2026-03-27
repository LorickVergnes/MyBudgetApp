export const ALL_COLORS = [
  '#5C6EFF', // Blue
  '#22c55e', // Green
  '#F9A825', // Orange/Yellow
  '#ef4444', // Red
  '#9B5CFF', // Purple
  '#06b6d4', // Cyan
  '#f43f5e', // Rose
  '#ec4899', // Pink
  '#d946ef', // Fuchsia
  '#8b5cf6', // Violet
  '#3b82f6', // Blue-500
  '#0ea5e9', // Sky
  '#10b981', // Emerald
  '#84cc16', // Lime
  '#eab308', // Yellow
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#475569'  // Slate
];

/**
 * Converts a hex color to HSL.
 */
function hexToHSL(hex) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Converts HSL to hex.
 */
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

/**
 * Generates shades for a given hex color.
 */
export function generateShades(hex) {
  const { h, s, l } = hexToHSL(hex);
  return [
    hex.toUpperCase(), // Original
    hslToHex(h, s, Math.max(l - 15, 10)), // Darker
    hslToHex(h, s, Math.min(l + 15, 90)), // Lighter
    hslToHex(h, Math.max(s - 20, 10), l), // Desaturated
  ];
}

/**
 * Finds the next available shade for a base color.
 */
export function getNextAvailableColor(baseHex, usedColors) {
  const shades = generateShades(baseHex);
  for (const shade of shades) {
    if (!usedColors.includes(shade)) {
      return shade;
    }
  }
  // If all shades used, return a random shade or just the original
  return shades[Math.floor(Math.random() * shades.length)];
}

/**
 * Groups segments into "Other" if they exceed the limit.
 */
export function groupSegments(segments, limit = 10) {
  if (segments.length <= limit + 1) return segments;

  const sorted = [...segments].sort((a, b) => b.value - a.value);
  const top = sorted.slice(0, limit);
  const others = sorted.slice(limit);
  
  const othersValue = others.reduce((sum, s) => sum + s.value, 0);
  
  return [
    ...top,
    {
      name: 'Autres',
      value: othersValue,
      color: '#94a3b8', // Slate-400 (Gray)
      isOther: true
    }
  ];
}
