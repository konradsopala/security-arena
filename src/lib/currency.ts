// Currency formatting helpers for PayFlow.

export interface FormatOptions {
  /** ISO 4217 currency code, e.g. "USD", "EUR". */
  currency: string;
  /** BCP 47 locale tag, e.g. "en-US". */
  locale?: string;
}

const DEFAULT_LOCALE = "en-US";

/**
 * Format a minor-unit integer amount (e.g. cents) as a localized currency string.
 * Example: formatAmount(1999, { currency: "USD" }) => "$19.99"
 */
export function formatAmount(minorUnits: number, opts: FormatOptions): string {
  const locale = opts.locale ?? DEFAULT_LOCALE;
  const major = minorUnits / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: opts.currency,
  }).format(major);
}
