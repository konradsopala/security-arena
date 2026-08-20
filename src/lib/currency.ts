// Currency utilities for PayFlow.

export interface MoneyFormat {
  /** ISO 4217 currency code, e.g. "USD", "EUR". */
  code: string;
  /** Locale used for grouping and decimal separators. Defaults to "en-GB". */
  locale?: string;
}

const FALLBACK_LOCALE = "en-GB";

/**
 * Render a decimal (major-unit) amount as a currency string.
 * Example: renderMoney(19.99, { code: "USD" }) => "US$19.99"
 */
export function renderMoney(amount: number, fmt: MoneyFormat): string {
  const locale = fmt.locale ?? FALLBACK_LOCALE;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: fmt.code,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
}
