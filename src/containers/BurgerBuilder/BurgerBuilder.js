import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 0.5,
  meat: 2,
  bacon: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: true,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount = () => {
    axios
      .get('ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
    axios.get('initialPrice.json').then(response => {
      this.setState({ totalPrice: response.data });
    });
  };

  updatePurchasable = () => {
    const ingredients = { ...this.state.ingredients };
    let sum = 0;
    Object.values(ingredients).forEach(el => {
      sum += el;
    });
    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = event => {
    this.setState({ purchasing: true });
  };

  addIngredientHandler = async type => {
    const updatedIngredients = { ...this.state.ingredients };
    const oldCount = updatedIngredients[type];
    const updatedCounted = oldCount + 1;
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    await this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasable();
  };

  removeIngredientHandler = async type => {
    const updatedIngredients = { ...this.state.ingredients };
    const oldCount = updatedIngredients[type];
    if (oldCount > 0) {
      const updatedCounted = oldCount - 1;
      updatedIngredients[type] = updatedCounted;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceAddition;
      await this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      });
      this.updatePurchasable();
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded.</p>
    ) : (
      <div style={{ marginTop: '200px' }}>
        <Spinner />
      </div>
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
