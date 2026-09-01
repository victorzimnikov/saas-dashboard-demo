/**
 * Добавляет альфа-канал к цвету
 * @param {string} color - Цвет в формате #RRGGBB, #RGB, rgb(r,g,b) или rgba(r,g,b,a)
 * @param {number} alpha - Прозрачность от 0 до 1
 * @returns {string} Цвет в формате rgba(r, g, b, a)
 */
export const alpha = (color: string, a: number): string => {
  // Проверка на валидность alpha
  if (a < 0 || a > 1) {
    throw new Error("Alpha должен быть от 0 до 1");
  }

  let r, g, b;

  // Убираем пробелы
  color = color.trim();

  // HEX формат: #RRGGBB или #RGB
  if (color.startsWith("#")) {
    let hex = color.slice(1);

    // Расширяем #RGB до #RRGGBB
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    if (hex.length !== 6) {
      throw new Error("Некорректный HEX цвет");
    }

    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }
  // RGB или RGBA формат
  else if (color.startsWith("rgb")) {
    const match = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+\s*)?\)/);
    if (!match || !match[1] || !match[2] || !match[3]) {
      throw new Error("Некорректный RGB/RGBA формат");
    }
    r = parseInt(match[1], 10);
    g = parseInt(match[2], 10);
    b = parseInt(match[3], 10);
  } else {
    throw new Error("Поддерживаются только HEX и RGB/RGBA форматы");
  }

  // Проверка диапазона значений
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error("RGB значения должны быть от 0 до 255");
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
