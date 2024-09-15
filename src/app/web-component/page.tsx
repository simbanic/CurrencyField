"use client";

import { Controller, useForm } from "react-hook-form";

import {
  Box,
  Button,
  Container,
  debounce,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, ChangeEvent } from "react";
import CurrencyInput from "./CurrencyInput";

const formValues = {
  price1: "100000.1234",
  price2: "200000",
  price3: null,
  price4: undefined,
  price5: "",
};

const WebComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
    watch,
  } = useForm({
    defaultValues: formValues,
  });

  console.log("dirtyFields", dirtyFields);

  const submitForm = (data: typeof formValues) => {
    console.log("Submitted data:", data);
  };

  const debounceHandler = useCallback(
    debounce(() => {
      handleSubmit(submitForm)();
    }, 2000),
    []
  );

  const price1 = watch("price1");
  console.log("watch price1 === ", price1);
  
  //const price2 = watch('price2')
  //console.log('watch price2 === ', price2)

  const handleChange = true ? debounceHandler : () => {};

  return (
    <Container maxWidth={false} sx={{ mt: 5, pt: 5 }}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Box sx={{ mb: 4 }}>
          <Typography>Web Component</Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography>Simple Currency Input Fields</Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Controller
            name="price1"
            control={control}
            render={({ field }) => (
              <TextField
                label="Price 1 (Controller) 100000"
                slotProps={{
                  input: {
                    inputComponent: CurrencyInput,
                    inputProps: {
                      allowedFractions: true,
                    },
                  },
                }}
                {...field}
              />
            )}
          />
        </Box>

        {/* <Box sx={{ mb: 4 }}>
          <TextField
            {...register("price2")}
            label="Price 2 (Register)"
            name="price2"
            value={formValues["price2"]}
            slotProps={{
              input: {
                inputComponent: CurrencyInput,
              },
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue('price2', e.target.value, { shouldDirty: true });
            }} 
          />
        </Box> */}

        <Box sx={{ mb: 4 }}>
          <Typography>
            With Bounce, handle side effects after value change
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Controller
            name="price2"
            control={control}
            render={({ field }) => (
              <TextField
                label="Price 2 ( handle side effects )"
                value={field.value}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  /** trigger to save value to react hook form */
                  field.onChange(event.target.value);
                  /** handle debounce */
                  handleChange();
                }}
                slotProps={{
                  input: {
                    inputComponent: CurrencyInput,
                    inputProps: {
                      allowedFractions: false,
                    },
                  },
                }}
              />
            )}
          />
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};

export default WebComponent;
