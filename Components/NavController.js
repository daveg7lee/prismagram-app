import React from "react";
import { Text } from "react-native";

export default () => {
  const logUserIn = useIsLoggedIn();
  console.log(logUserIn);
  return <Text>Nav Controller</Text>;
};
