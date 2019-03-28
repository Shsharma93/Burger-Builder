import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 0.5,
  meat: 2,
  bacon: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      cheese: 1,
      salad: 1,
      bacon: 1,
      meat: 1
    },
    totalPrice: 9,
    purchasable: false
  };

  componentDidMount = () => {
    this.updatePurchasable();
  };

  updatePurchasable = () => {
    const ingredients = { ...this.state.ingredients };
    let sum = 0;
    Object.values(ingredients).forEach(el => {
      sum += el;
    });
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = async type => {
    let updatedIngredients = { ...this.state.ingredients };
    let oldCount = updatedIngredients[type];
    let updatedCounted = oldCount + 1;
    updatedIngredients[type] = updatedCounted;
    let priceAddition = INGREDIENT_PRICES[type];
    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice + priceAddition;
    await this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasable();
  };

  removeIngredientHandler = async type => {
    let updatedIngredients = { ...this.state.ingredients };
    let oldCount = updatedIngredients[type];
    if (oldCount > 0) {
      let updatedCounted = oldCount - 1;
      updatedIngredients[type] = updatedCounted;
      let priceAddition = INGREDIENT_PRICES[type];
      let oldPrice = this.state.totalPrice;
      let newPrice = oldPrice - priceAddition;
      await this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      });
      this.updatePurchasable();
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
