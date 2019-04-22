import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>CheckOut Summary</h1>
      <div style={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.checkoutCancelled} btnType='Danger'>
        CANCEL
      </Button>
      <Button clicked={props.checkoutContinued} btnType='Success'>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
