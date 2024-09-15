import React, { useRef } from "react";

import { InputAdornment, TextField } from "@mui/material";
import { formatValue } from "../utils";

type CurrencyFieldProps = {
  name: string;
  label: string;
  registerOptions:  any;
  handleChange?:any
};

const CurrencyField = ({
  registerOptions: { onChange: registerOnChange, ...restRegisterOptionsWithoutOnChange }, 
  name,
  label,
  handleChange
}: CurrencyFieldProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCursorPosition = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    formattedValue: string,
    oldCursorPosition: number
  ) => {
    const input = inputRef.current;
    if (!input) return;

    // Calculate how the cursor should shift based on value length change
    const oldValue = event.target.value;
    const diff = formattedValue.length - oldValue.length;

    // Adjust the cursor position depending on where the formatting was applied
    const newCursorPosition = oldCursorPosition + diff;

    // Apply the new cursor position after the DOM Update
    setTimeout(() => {
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldCursorPosition = inputRef.current?.selectionStart || 0;
    const formattedValue = formatValue(event.target.value);
    event.target.value = formattedValue;

    // Fire the registered onChange handler
    registerOnChange(event);

    // Trigger the handleChange if it's passed as a prop
    if (handleChange) handleChange();

    // Adjust cursor position after formatting
    handleCursorPosition(event, formattedValue, oldCursorPosition);
  };

  return (
    <TextField
      label={label}
      {...restRegisterOptionsWithoutOnChange}
      inputRef={inputRef}
      name={name}
      // formatValue is called for all fields in the form on each keystroke in any form field.
      // Initial formatting must be applied when the form values are fed into React Hook Form.
      // The onChange handler is necessary to keep the formatted value updated in React Hook Form's values.
      // TODO: Investigate optimization with useMemo.
      //value={formatValue(field.value)}
      onChange={onChange}
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        },
      }}
      size="small"
    />
  );
};

export default CurrencyField;
