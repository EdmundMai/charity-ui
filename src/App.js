import React, { Component } from "react";
import { connect } from "react-redux";

import navigationActions from "./redux/actions/navigation-actions";
import paymentActions from "./redux/actions/payment-actions";

import Charities from "./components/Charities";

const mapStateToProps = state => ({
  charities: state.charity.list,
  donations: state.payment.list,
  status: state.payment.status
});
const mapDispatchToProps = dispatch => ({
  loadHomepageFn: () => dispatch(navigationActions.loadHomepage()),
  postPaymentRequestFn: ({ charityId, currency, amount }) =>
    dispatch(paymentActions.postPaymentRequest({ charityId, currency, amount }))
});

export class App extends Component {
  componentDidMount() {
    const { loadHomepageFn } = this.props;
    loadHomepageFn();
  }

  render() {
    const { charities, donations, postPaymentRequestFn, status } = this.props;
    return (
      <Charities
        list={charities}
        donations={donations}
        postPaymentRequestFn={postPaymentRequestFn}
        status={status}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
