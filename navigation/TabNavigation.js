import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import Home from "../screens/Home";
import Notification from "../screens/Notification";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <NavigationContainer>
      <TabNavigation.Navigator>
        <TabNavigation.Screen name="Home" component={Home} />
        <TabNavigation.Screen name="Search" component={Search} />
        <TabNavigation.Screen
          name="Add"
          component={View}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              console.log("add");
            },
          })}
        />
        <TabNavigation.Screen name="Notification" component={Notification} />
        <TabNavigation.Screen name="Profile" component={Profile} />
      </TabNavigation.Navigator>
    </NavigationContainer>
  );
};
