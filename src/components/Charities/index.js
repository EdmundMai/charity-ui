import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import MDSpinner from "react-md-spinner";

import { PAYMENT_STATUSES } from "../../config";
import Card from "./Card";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1028px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Header = styled.div`
  margin: 20px;
  display: flex;
`;

const Logo = styled.img`
  height: 40px;
  width: 110px;
`;

const Spinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
`;

const Notification = styled.p`
  text-align: center;
  padding: 10px;
`;

const SuccessNotification = styled(Notification)`
  background: #e2f2d6;
`;

const ErrorNotification = styled(Notification)`
  background: #e3c7c4;
`;

export const Charities = ({
  list,
  postPaymentRequestFn,
  status,
  donations
}) => (
  <Container>
    {status === PAYMENT_STATUSES.ERROR && (
      <ErrorNotification>
        Sorry, something was wrong with your payment. Please try again.
      </ErrorNotification>
    )}
    {status === PAYMENT_STATUSES.SUCCESS && (
      <SuccessNotification>
        Congratulations! You have successfully made a donation.
      </SuccessNotification>
    )}
    <Header>
      <Logo src={"/images/logo.svg"} />
    </Header>
    <div>
      {_.chunk(list, 2).map((charities, i) => (
        <Row key={i}>
          {charities.map(({ id, name, image }) => (
            <Card
              donations={donations.filter(d => d.charitiesId === id)}
              key={id}
              id={id}
              name={name}
              image={image}
              postPaymentRequestFn={postPaymentRequestFn}
            />
          ))}
        </Row>
      ))}
    </div>
    {status === PAYMENT_STATUSES.PENDING && (
      <Spinner>
        <MDSpinner />
      </Spinner>
    )}
  </Container>
);

Charities.propTypes = {
  status: PropTypes.string.isRequired,
  donations: PropTypes.arrayOf(PropTypes.object).isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  postPaymentRequestFn: PropTypes.func.isRequired
};

export default Charities;
