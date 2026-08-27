/**
 * Normalizes text for search comparisons by:
 * 1. Converting to lowercase
 * 2. Removing diacritics/accents
 * 3. Removing all non-alphanumeric characters (including spaces if we want strict matching,
 *    but usually just punctuation like commas, periods, apostrophes, etc.)
 */
export function normalizeText(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Decompose combined characters (e.g., 'é' -> 'e' + '´')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s]/g, '') // Remove all characters except letters, numbers, and spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim();
}
