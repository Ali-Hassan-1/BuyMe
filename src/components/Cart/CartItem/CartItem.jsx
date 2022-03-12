import React from "react";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>

        <Typography variant="h5">{item.price.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>

          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveFromCart(item.id, item.quantity)}
          >
            Remove
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartItem;
