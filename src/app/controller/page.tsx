"use client";

import { useForm } from "react-hook-form";
import { Box, Button, debounce, Typography } from "@mui/material";
import CurrencyField from "./CurrencyField";
import React, { useCallback } from "react";
import { formatValue } from "../utils";

const formValues = {
  price1: formatValue("100000.21212", false),
  price2: formatValue("200000.32214", true),
  price3: formatValue(null, false),
  price4: formatValue(undefined, false),
  price5: formatValue("", false),
};

const WithController = () => {
  const {
    formState: { dirtyFields },
    handleSubmit,
    control,
    watch,
  } = useForm({
    defaultValues: formValues,
  });

  const isDirty = Object.keys(dirtyFields).length > 0;

  console.log("dirtyFields", dirtyFields);

  const submitForm = (data: any) => {
    console.log("submitForm data", data);
  };

  const debounceHandler = useCallback(
    debounce(() => {
      handleSubmit(submitForm)();
    }, 2000),
    []
  );

  const handleChange = true ? debounceHandler : () => {};

  const price1 = watch("price1");
  const price2 = watch("price2");

  console.log("watch price1 === ", price1);
  console.log("watch price2 === ", price2);

  return (
    <Box sx={{ padding: 6 }}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Typography variant="h6" sx={{ color: "black" }}>
          Currency Field with React Hook Form Controller with Bouncing
        </Typography>

        <Box sx={{ padding: 6 }}>
          <CurrencyField
            label="Price 1"
            name="price1"
            control={control}
            /** only required to handle debounce */
            handleChange={handleChange}
          />
        </Box>

        <Typography variant="h6" sx={{ color: "black" }}>
          Currency Field with React Hook From Controller without Bouncing
        </Typography>

        <Box sx={{ padding: 6 }}>
          <CurrencyField
            label="Price 2"
            name="price2"
            control={control}
            allowFractions={true}
          />
        </Box>
        <Box sx={{ padding: 6 }}>
          <CurrencyField label="Price 3" name="price3" control={control} />
        </Box>
        <Box sx={{ padding: 6 }}>
          <CurrencyField label="Price 4" name="price4" control={control} />
        </Box>
        <Box sx={{ padding: 6 }}>
          <CurrencyField label="Price 5" name="price5" control={control} />
        </Box>
        <Button disabled={!isDirty} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default WithController;
