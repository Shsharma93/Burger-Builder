import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postcode: ''
    },
    loading: false
  };

  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Shashank',
        address: {
          street: 'Edward Street',
          zipCode: '4000',
          Country: 'Australia'
        },
        email: 'shashank@gmail.com'
      },
      deliveryMethod: 'Fastest'
    };
    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false });
        console.log(order);
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type='text'
          name='name'
          placeholder='Your Name'
        />
        <input
          className={classes.Input}
          type='email'
          name='email'
          placeholder='Your Email'
        />
        <input
          className={classes.Input}
          type='text'
          name='street'
          placeholder='Street Name'
        />
        <input
          className={classes.Input}
          type='text'
          name='postcode'
          placeholder='Your Post Code'
        />
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Ente your contact details</h4>
        {form}
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </div>
    );
  }
}

export default ContactData;
