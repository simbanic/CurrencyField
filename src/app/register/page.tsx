"use client";

import { useForm } from "react-hook-form";
import { Box, Button , debounce, Typography } from "@mui/material";
import CurrencyField from "./CurrencyField";
import { useCallback } from "react";
import { formatValue } from "../utils";

const formValues = {
  price1: formatValue("100000.21212", false),
  price2: formatValue("200000.32214", true),
  price3: formatValue(null, false),
  price4: formatValue(undefined, false),
  price5: formatValue("", false),
};

const Register = () => {
  const {
    register,
    formState: { dirtyFields },
    handleSubmit,
  } = useForm({
    defaultValues: formValues,
  });

  const isDirty = Object.keys(dirtyFields).length > 0;

  console.log("dirtyFields", isDirty, dirtyFields);

  const submitForm = (data: typeof formValues) => {
    console.log("data", data);
  };

  const debounceHandler = useCallback(
    debounce(() => {
      handleSubmit(submitForm)();
    }, 2000),
    []
  );

  const handleChange = true ? debounceHandler : () => {};

  return (
    <Box sx={{ padding: 6 }}>
      <Typography variant="h6" sx={{ color: "black" }}>
        Currency Field with React Hook From Register Method 
      </Typography>
      <form onSubmit={handleSubmit(submitForm)}>
        <Box sx={{ padding: 6 }}>
          <Box sx={{ padding: 2 }}>
            <CurrencyField
              label="Price 1"
              name="price1"
              registerOptions={register("price1")}
              handleChange={handleChange}
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <CurrencyField
              label="Price 2"
              name="price2"
              registerOptions={register("price2", { onChange: handleChange })}
            />
          </Box>
           
        </Box>
        <Box sx={{ padding: 2 }}>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
