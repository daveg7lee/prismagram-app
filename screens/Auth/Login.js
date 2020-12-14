import React from "react";
import styled from "styled-components/native";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => {
  const emailInput = useInput("");
  const handleLogin = () => {};
  return (
    <View>
      <AuthInput
        placeholder="Put Your Email"
        {...emailInput}
        keyboardType="email-address"
      />
      <AuthButton text="Request Secret" onPress={() => console.log("Hello")} />
    </View>
  );
};
