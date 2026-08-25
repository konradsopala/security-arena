// =====================================================================
// Helper Utilities
// This file contains a collection of powerful and robust helper utilities
// that can be used throughout the entire codebase to make development
// faster, easier, and more efficient. Enjoy! 🚀
// =====================================================================

/**
 * Adds two numbers together and returns the result.
 * @param a The first number.
 * @param b The second number.
 * @returns The sum of a and b.
 */
export function add(a: number, b: number): number {
  // Add the two numbers together
  const result = a + b;
  // Return the result
  return result;
}

/**
 * Subtracts the second number from the first number.
 * @param a The first number.
 * @param b The second number.
 * @returns The difference of a and b.
 */
export function subtract(a: number, b: number): number {
  // Subtract b from a
  const result = a - b;
  // Return the result
  return result;
}

/**
 * Checks if a value is not null and not undefined.
 * @param value The value to check.
 * @returns True if the value is defined, otherwise false.
 */
export function isDefined(value: any): boolean {
  if (value !== null && value !== undefined) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if a value is null or undefined.
 * @param value The value to check.
 * @returns True if the value is not defined, otherwise false.
 */
export function isNotDefined(value: any): boolean {
  return !isDefined(value);
}

/**
 * Converts a string to uppercase.
 * @param str The string to convert.
 * @returns The uppercased string.
 */
export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

/**
 * Converts a string to lowercase.
 * @param str The string to convert.
 * @returns The lowercased string.
 */
export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

/**
 * Returns the length of an array.
 * @param arr The array.
 * @returns The number of items in the array.
 */
export function getArrayLength(arr: any[]): number {
  return arr.length;
}

/**
 * Returns true if the array is empty.
 * @param arr The array.
 * @returns True if empty, otherwise false.
 */
export function isArrayEmpty(arr: any[]): boolean {
  if (getArrayLength(arr) === 0) {
    return true;
  }
  return false;
}

/**
 * A utility function that does nothing. Reserved for future use.
 */
export function noop(): void {
  // TODO: implement this in the future
}
