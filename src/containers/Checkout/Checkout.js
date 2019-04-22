import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: null
  };

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = null;
    for (let params of query.entries()) {
      if (params[0] === 'price') {
        price = +params[1];
      } else {
        ingredients[params[0]] = +params[1];
      }
    }
    this.setState({ ingredients, totalPrice: price });
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let checkoutSummary = null;

    if (this.state.ingredients) {
      checkoutSummary = (
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
      );
    }

    return (
      <div>
        {checkoutSummary}
        <Route
          path={this.props.match.url + '/contact-data'}
          render={props => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
