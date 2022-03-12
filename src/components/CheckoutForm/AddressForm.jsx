import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { commerce } from "../../lib/commerce";
import FormInput from "./Checkout/CustomTextField";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setshippingCountries] = useState([]);
  const [shippingCountry, setshippingCountry] = useState("");
  const [shippingSubDivisions, setshippingSubDivisions] = useState([]);
  const [shippingSubDivision, setshippingSubDivision] = useState("");
  const [shippingOptions, setshippingOptions] = useState([]);
  const [shippingOption, setshippingOption] = useState("");

  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubDivisions).map(
    ([code, name]) => ({
      // Destructure code and name from an array and convert into object
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((shipOption) => ({
    id: shipOption.id,
    label: `${shipOption.description} - (${shipOption.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    // It return object with code and name of country {"": ""}
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setshippingCountries(countries);
    setshippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivision = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setshippingSubDivisions(subdivisions);
    setshippingSubDivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setshippingOptions(options);
    setshippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivision(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubDivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubDivision
      );
  }, [shippingSubDivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Form
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubDivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name="firstname" label="First name" />
            <FormInput name="firstname" label="Last name" />
            <FormInput name="address" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="Zip / Postal code" />
          </Grid>
          <br />
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select
              value={shippingCountry}
              fullWidth
              onChange={(e) => setshippingCountry(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <br />
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Subdivison</InputLabel>
            <Select
              value={shippingSubDivision}
              fullWidth
              onChange={(e) => setshippingSubDivision(e.target.value)}
            >
              {subdivisions.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <br />
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Options</InputLabel>
            <Select
              value={shippingOption}
              fullWidth
              onChange={(e) => setshippingOption(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back To Cart
            </Button>
            <Button type="submit " variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
