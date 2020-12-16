import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Google from "expo-google-app-auth";
import styled from "styled-components/native";
import AuthButton from "../../Components/AuthButton";
import AuthInput from "../../Components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT } from "./AuthQueries";
import constants from "../../constants";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const GoogleContainer = styled.View`
  width: ${constants.width / 1.5};
  margin-top: 20px;
  padding-top: 20px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.darkGreyColor};
  border-style: solid;
  align-items: center;
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
    if (firstName === "" || lastName === "") {
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
  const googleLogIn = async () => {
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        androidClientId:
          "865769731655-kudsdhlbjh07c29ugi234ad00k867jgf.apps.googleusercontent.com",
        iosClientId:
          "865769731655-vbju5lnq89lqkd1r56s1bi0nfjcrrjdd.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });
        const { email, family_name, given_name } = await user.json();
        updateFormData(email, given_name, family_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    } finally {
      setLoading(false);
    }
  };
  const updateFormData = (email, firstName, lastName) => {
    console.log(email, firstName, lastName);
    emailInput.setValue(email);
    FirstNameInput.setValue(firstName);
    LastNameInput.setValue(lastName);
    const [username] = email.split("@");
    userNameInput.setValue(username);
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
        <GoogleContainer>
          <AuthButton
            color={"#DE5246"}
            loading={false}
            onPress={googleLogIn}
            text="Connect Google"
          />
        </GoogleContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
