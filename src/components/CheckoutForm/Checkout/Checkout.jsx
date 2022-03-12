import React, { useState, useEffect } from "react";
import PaymentForm from "../PaymentForm";
import AddressForm from "./../AddressForm";
import {
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { commerce } from "../../../lib/commerce";

import useStyles from "./styles";

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const classes = useStyles();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinshed, setIsFinsed] = useState(false);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch (error) {
        history.push("/");
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        backStep={backStep}
        nextStep={nextStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      />
    );

  const timeout = () => {
    setTimeout(() => {
      setIsFinsed(true);
    }, 3000);
  };

  const Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h6">
            Thank you for your purchase, {order.customer.firstname}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order Ref: {order.customer.refenrence}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined">
          Back to Home
        </Button>
      </>
    ) : isFinshed ? (
      <>
        <div>
          <Typography variant="h6">Thank you for your purchase.</Typography>
          <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
