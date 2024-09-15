export function formatValue(
  value?: string | null,
  allowFractions: boolean = true,
  maxFractionsDigits = 2
) {
  if (!value) return "";

  // clean by removing non-numeric characters but keep for the decimal point
  let cleanedValue = value.replace(/[^0-9.]/g, "");

  const parts = cleanedValue.split(".");
  const decimalPart = parts[1] ? parts[1].substring(0, maxFractionsDigits) : "";

  if (parts.length > 2) {
    cleanedValue = parts[0] + "." + decimalPart;
  }

  //add thousand separator
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!allowFractions) return integerPart;

  return parts.length > 1 ? integerPart + "." + decimalPart : integerPart;
}
