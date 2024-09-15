import React, { useRef } from "react";

import { InputAdornment, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { formatValue } from "../utils";

type CurrencyFieldWrapperProps = {
  name: string;
  label: string;
  control: Control<any>;
  allowFractions?: boolean;
  handleChange?: () => void;
};

const CurrencyField = ({
  name,
  label,
  control,
  handleChange,
}: CurrencyFieldWrapperProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCursorPosition = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    formattedValue: string,
    oldCursorPosition: number
  ) => {
    const input = inputRef.current;
    if (!input) return;

    const oldValue = event.target.value;

    // Calculate the cursor shift due to the formatting change
    const diff = formattedValue.length - oldValue.length;

    // Adjust the cursor position depending on where the dot is placed
    const newCursorPosition = oldCursorPosition + (diff >= 0 ? diff : 0);

    // Apply the new cursor position after the DOM Update
    setTimeout(() => {
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          {...field}
          inputRef={inputRef}
          // formatValue is called for all fields in the form on each keystroke in any form field.
          // Initial formatting must be applied when the form values are fed into React Hook Form.
          // The onChange handler is necessary to keep the formatted value updated in React Hook Form's values.
          // TODO: Investigate optimization with useMemo.
          //value={formatValue(field.value)}
          onChange={(event) => {
            const oldCursorPosition = inputRef.current?.selectionStart || 0;
            const formattedValue = formatValue(event.target.value);
            field.onChange(formattedValue);
            handleCursorPosition(event, formattedValue, oldCursorPosition);
            if (handleChange) handleChange();
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          size="small"
        />
      )}
    />
  );
};

export default CurrencyField;
