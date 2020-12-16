import React from "react";
import styled from "styled-components/native";
import AuthButton from "../../Components/AuthButton";
import constants from "../../constants";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: ${constants.width / 1.5};
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
  margin-top: 15px;
`;

export default ({ navigation }) => (
  <View>
    <Image source={require("../../assets/logo.png")} resizeMode="contain" />
    <AuthButton
      onPress={() => navigation.navigate("SignUp")}
      text="Create New Account"
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log in</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
