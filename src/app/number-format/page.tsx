"use client";
import { Box, Button, debounce } from "@mui/material";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import NumericField from "./NumericField";

const NumberFormatInput = () => {
  const removeFractions = (value: string) => Math.floor(parseFloat(value));

  const upToTwoFractions = (value: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(parseFloat(value));

  const formValues = {
    price1: removeFractions("100000.21"),
    price2: upToTwoFractions("200000.1234"),
    price3: null,
    price4: undefined,
    price5: "",
  };

  type FormValues = typeof formValues;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { dirtyFields, errors },
  } = useForm<FormValues>({
    defaultValues: formValues,
  });

  const isDirty = Object.keys(dirtyFields).length > 0;

  console.log("isDirty", isDirty);

  console.log("dirtyFields", dirtyFields);

  const submitForm = (data: FormValues) => {
    console.log("submitForm", data);
    reset(data);
  };

  const debounceHandler = useCallback(
    debounce(() => {
      handleSubmit(submitForm)();
    }, 6000),
    []
  );

  const handleChange = true ? debounceHandler : () => {};

  const onValueChangePrice1 = (fieldName: string, fieldValue: string) => {
    setValue(fieldName as keyof FormValues, fieldValue, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onValueChangePrice2 = (fieldName: string, fieldValue: string) => {
    setValue(fieldName as keyof FormValues, fieldValue, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    handleChange();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Box sx={{ padding: 6 }}>
        <h2> React Number formatter with Register </h2>
        <Box sx={{ padding: 2 }}>
          <NumericField
            label="price 1"
            registerOptions={register("price1", {
              required: "This field is required",
            })}
            value={formValues.price1}
            handleChange={onValueChangePrice1}
            error={errors.price1?.message}
          />
        </Box>
        <Box sx={{ padding: 2 }}>
          <h2> React Number formatter with Register handle Bouncing </h2>
          <NumericField
            label="price 2"
            registerOptions={register("price2")}
            value={formValues.price2}
            handleChange={onValueChangePrice2}
          />
        </Box>
      </Box>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default NumberFormatInput;
