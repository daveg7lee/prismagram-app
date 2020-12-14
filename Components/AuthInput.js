import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.greyColor};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.lightGreyColor};
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2};
  padding: 7px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize,
  onChange,
}) => (
  <Container>
    <TextInput
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      autoCapitalize={autoCapitalize}
      onChangeText={onChange}
    />
  </Container>
);

AuthInput.prototype = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "words", "sentences", "characters"]),
  onChange: PropTypes.func.isRequired,
};

export default AuthInput;
