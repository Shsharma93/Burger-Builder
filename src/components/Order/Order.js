import React from 'react';
import classes from './Order.module.css';

const order = props => {
  const ingredients = Object.keys(props.ingredients).map(el => {
    return (
      <span
        key={el}
        style={{
          margin: '0 10px',
          textTransform: 'capitalize',
          display: 'inline-block',
          border: '1px solid #ccc',
          padding: '8px'
        }}
      >
        <strong>
          {el} ({props.ingredients[el]})
        </strong>
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Order ID : {props.id}</p>
      <p>Ingredients : {ingredients}</p>
      <p>
        Price : <strong>AUD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
