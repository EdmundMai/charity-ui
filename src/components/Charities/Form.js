import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Text from "../shared/Text";
import Button from "../shared/Button";

import { DONATION_AMOUNTS } from "../../config";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RadioButtonRow = styled.div`
  display: flex;
  margin: 10px 0;
`;

const RadioButtonLabel = styled.label`
  color: #656e7f;
  margin: 0 6px;
`;

const RadioButtonInput = styled.input.attrs({
  type: "radio",
  name: props => `payment-${props.charityId}`
})`
  margin: 0 6px;
`;

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { donationAmount: DONATION_AMOUNTS[0] };
  }

  setDonationAmount(val) {
    this.setState({ donationAmount: parseInt(val) });
  }

  render() {
    const { charityId, postPaymentRequestFn } = this.props;
    return (
      <Container>
        <Text>Select the amount to donate (THB)</Text>
        <RadioButtonRow>
          {DONATION_AMOUNTS.map(amount => (
            <RadioButtonLabel key={amount}>
              <RadioButtonInput
                charityId={charityId}
                value={amount}
                checked={this.state.donationAmount === amount}
                onChange={({ target: { value } }) =>
                  this.setDonationAmount(value)
                }
              />{" "}
              {amount}
            </RadioButtonLabel>
          ))}
        </RadioButtonRow>
        <Button
          onClick={() =>
            postPaymentRequestFn({
              charityId,
              amount: this.state.donationAmount,
              currency: "THB"
            })
          }
        >
          Pay
        </Button>
      </Container>
    );
  }
}

Form.propTypes = {
  charityId: PropTypes.number.isRequired,
  postPaymentRequestFn: PropTypes.func.isRequired
};

export default Form;
