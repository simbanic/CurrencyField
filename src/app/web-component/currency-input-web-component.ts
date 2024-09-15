function formatValue(
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

  console.log('allowFractions === ', allowFractions)
  console.log('allowFractions value=== ', value)

  if (!allowFractions) return integerPart;

  return parts.length > 1 ? integerPart + "." + decimalPart : integerPart;
}

class CurrencyInputWebComponent extends HTMLElement {
  inputElement: HTMLInputElement;
  allowedFractions: boolean;

  constructor() {
    super();

    /** Set default attributes value */
    this.allowedFractions = true;

    this.inputElement = document.createElement("input");
    this.inputElement.type = "text";
    this.inputElement.style.width = "100%";
    this.inputElement.style.height = "100%";
    this.inputElement.style.padding = "8px"; // Add padding to match MUI TextField's input padding
    this.inputElement.style.border = "none"; // Remove border
    this.inputElement.style.outline = "none"; // Remove outline
    this.inputElement.style.font = "inherit"; // Inherit font styles (size, family, etc.)
    this.inputElement.style.background = "transparent"; // Transparent background to match MUI style
    this.inputElement.style.boxSizing = "border-box"; // Ensure padding is included in width
    this.inputElement.style.letterSpacing = "normal"; // Ensure normal letter spacing
    this.inputElement.style.color = "black";

    this.attachShadow({ mode: "open" }).appendChild(this.inputElement);

    this.inputElement.addEventListener("input", this.onInput.bind(this));
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    const { selectionStart } = target;
    const value = target.value.replace(/[^0-9.]/g, "");

    const currentCursorPosition = selectionStart || 0;

    if (!isNaN(Number(value)) || value.includes(".")) {
      this.inputElement.value = formatValue(value, this.allowedFractions);

      /** thanks to Kamlesh */
      requestAnimationFrame(() => {
        this.inputElement.setSelectionRange(currentCursorPosition, currentCursorPosition);
      });

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: this.value,
        })
      );
    }
  }

  static get observedAttributes() {
    return ["allowed-fractions"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log('new value',newValue,oldValue, newValue === "true")
  
    if (name === "allowed-fractions") {
      this.allowedFractions = newValue === "true";
    }
  }

  get value() {
    //clean the value
    return this.inputElement.value.replace(/,/g, "");
  }

  set value(val: string) {
    this.inputElement.value = formatValue(val, this.allowedFractions);
  }
}

customElements.define(
  "currency-input-web-component",
  CurrencyInputWebComponent
);
