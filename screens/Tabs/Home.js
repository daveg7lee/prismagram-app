import React from "react";
import styled from "styled-components/native";
import Loader from "../../Components/Loader";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => (
  <View>
    <Loader />
  </View>
);
