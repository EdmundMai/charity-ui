import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Form from "./Form";
import Donations from "./Donations";
import Button from "../shared/Button";
import Text from "../shared/Text";

const Container = styled.div`
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 24px #dacfcf;
  flex: 0.5;
  margin-bottom: 20px;
  max-width: 500px;
  overflow: hidden;
  position: relative;
`;

const Picture = styled.div`
  background-image: ${props => `url(/images/${props.src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
  width: 100%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Overlay = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const ExitButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  outline: none;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const DonationsButton = styled.button`
  background: none;
  border: none;
  color: #656e7f;
  cursor: pointer;
  font-size: 12px;
  margin-right: 5px;
  outline: none;
  padding: 10px;
`;

const CallToActionContainer = styled.div`
  align-items: center;
  display: flex;
`;

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { hideForm: true, hideDonations: true };
  }

  hideDonations() {
    this.setState({ hideDonations: true });
  }

  showDonations() {
    this.setState({ hideDonations: false });
  }

  hideForm() {
    this.setState({ hideForm: true });
  }

  showForm() {
    this.setState({ hideForm: false });
  }

  render() {
    const { id, name, image, postPaymentRequestFn, donations } = this.props;
    return (
      <Container>
        <Picture src={image} />
        <Footer>
          <Text>{name}</Text>
          <CallToActionContainer>
            <DonationsButton onClick={() => this.showDonations()}>
              View Donations
            </DonationsButton>
            <Button onClick={() => this.showForm()}>Donate</Button>
          </CallToActionContainer>
        </Footer>
        {!this.state.hideDonations && (
          <Overlay>
            <Donations list={donations} />
            <ExitButton onClick={() => this.hideDonations()}>x</ExitButton>
          </Overlay>
        )}
        {!this.state.hideForm && (
          <Overlay>
            <Form charityId={id} postPaymentRequestFn={postPaymentRequestFn} />
            <ExitButton onClick={() => this.hideForm()}>x</ExitButton>
          </Overlay>
        )}
      </Container>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  donations: PropTypes.arrayOf(PropTypes.object).isRequired,
  postPaymentRequestFn: PropTypes.func.isRequired
};

export default Card;
