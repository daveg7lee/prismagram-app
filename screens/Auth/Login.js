import React from "react";
import styled from "styled-components/native";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => (
  <View>
    <AuthInput
      placeholder="Put Your Email"
      value=""
      keyboardType="email-address"
    />
    <AuthButton text="Request Secret" onPress={() => console.log("Hello")} />
  </View>
);
