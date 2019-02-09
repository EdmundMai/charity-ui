import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 2px;
  border: 2px solid #3756eb;
  color: #3756eb;
  cursor: pointer;
  font-size: 14px;
  outline: none;
  padding: 5px 10px;
  :hover {
    background: #3756eb;
    color: white;
  }
`;

export default Button;
