import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import constants from "../constants";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${(props) =>
    props.color ? props.color : props.theme.blueColor};
  padding: 10px;
  margin: 10px 50px;
  border-radius: 4px;
  width: ${constants.width / 1.5};
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({ text, onPress, loading = false, color = null }) => (
  <Touchable onPress={onPress} disabled={loading}>
    <Container color={color}>
      {loading ? <ActivityIndicator color="white" /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AuthButton;
