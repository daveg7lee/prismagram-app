import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ route, navigation }) => {
  const userNameInput = useInput("");
  const emailInput = useInput(route.params?.email ?? "");
  const FirstNameInput = useInput("");
  const LastNameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: userNameInput.value,
      email: emailInput.value,
      firstName: FirstNameInput.value,
      lastName: LastNameInput.value,
    },
  });
  const handleSignIn = async () => {
    const { value: email } = emailInput;
    const { value: firstName } = FirstNameInput;
    const { value: lastName } = LastNameInput;
    const { value: username } = userNameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (firstName === "") {
      return Alert.alert("I need your name");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...userNameInput}
          placeholder="Name"
          placeholderTextColor="grey"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="grey"
        />
        <AuthInput
          {...FirstNameInput}
          placeholder="First Name"
          placeholderTextColor="grey"
          autoCapitalize="words"
        />
        <AuthInput
          {...LastNameInput}
          placeholder="Last Name"
          placeholderTextColor="grey"
          autoCapitalize="words"
        />
        <AuthButton text="Sign Up" onPress={handleSignIn} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
