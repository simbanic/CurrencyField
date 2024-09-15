import { forwardRef, useEffect, useRef } from "react";
import { InputBaseComponentProps } from "@mui/material";

import "./currency-input-web-component";

const CurrencyInput = forwardRef<HTMLInputElement, InputBaseComponentProps>(
  function CurrencyInput({ onChange, value = "", allowedFractions, ...other }) {
    const numericFieldRef = useRef<HTMLInputElement>(null);

    if (numericFieldRef.current) {
      numericFieldRef.current.value = value;
    }

    const handleChange = () => {
      const numericFieldElement = numericFieldRef.current;

      const handleValueChange = (e: Event) => {
        const customEvent = e as CustomEvent<string>;
        onChange(customEvent);
      };

      numericFieldElement &&
        numericFieldElement.addEventListener("change", handleValueChange);
      return () => {
        numericFieldElement &&
          numericFieldElement.removeEventListener("change", handleValueChange);
      };
    };

    useEffect(handleChange, [onChange]);

    return (
      <currency-input-web-component
        ref={numericFieldRef}
        {...other}
        allowed-fractions={allowedFractions}
      />
    );
  }
);

export default CurrencyInput;
