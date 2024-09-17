import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

type NumericFieldProps = {
  label: string;
  registerOptions: {
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    name: string;
  };
  value: string | number;
  handleChange: (name:string,value:string) => void;
  allowedFractions?: boolean;
  maxFractionsDigits?: number;
  error?: string;
};

const NumericField = ({
  /** do not bind onChange of register with NumericFormate as it can receive only formatted value */
  registerOptions: { onBlur, name },
  label,
  handleChange,
  value,
  allowedFractions = true,
  maxFractionsDigits = 2,
  error,
}: NumericFieldProps) => {
  return (
    <>
      <NumericFormat
        onBlur={onBlur}
        defaultValue={value || ""}
        thousandSeparator
        prefix="$ "
        name={name}
        decimalScale={!allowedFractions ? 0 : maxFractionsDigits}
        fixedDecimalScale
        allowNegative={false}
        customInput={TextField}
        label={label}
        variant="outlined"
        fullWidth
        onValueChange={(values) => {
          console.log("onValueChange value", values);
          handleChange(name, values.value);
        }}
        error={!!error}
        helperText={error}
      />
    </>
  );
};

export default NumericField;
