import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Text from "../shared/Text";
import Button from "../shared/Button";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Row = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Content = styled(Text)`
  margin: 5px;
`;

export const Donations = ({ list }) => (
  <Container>
    <Row>
      <Content>Amount</Content> <Content>Currency</Content>
    </Row>
    {list.map(({ id, amount, currency }) => (
      <Row key={id}>
        <Content>{amount}</Content> <Content>{currency}</Content>
      </Row>
    ))}
  </Container>
);

Donations.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Donations;
