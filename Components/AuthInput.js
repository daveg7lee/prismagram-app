import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.greyColor};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.lightGreyColor};
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2};
  padding: 5px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize,
  onChange,
  placeholderTextColor,
  returnKeyType = "done",
  onSubmitEditing = () => null,
  autoCorrect = true,
}) => (
  <Container>
    <TextInput
      placeholderTextColor={placeholderTextColor}
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      autoCapitalize={autoCapitalize}
      onChangeText={onChange}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
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
  placeholderTextColor: PropTypes.string.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
};

export default AuthInput;
