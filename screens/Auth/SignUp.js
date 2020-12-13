import React from "react";
import styled from "styled-components/native";
import AuthButton from "../../Components/AuthButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => (
  <View>
    <AuthButton text="Sign Up" onPress={() => console.log("Hi")} />
  </View>
);
