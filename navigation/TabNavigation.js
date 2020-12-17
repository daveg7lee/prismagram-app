import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Tabs/Home";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notification";
import MessagesLink from "../Components/MessagesLink";
import NavIcon from "../Components/NavIcon";
import { stackStyles } from "./config";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (initialRoute, name, customConfig) => (
  <Stack.Navigator>
    <Stack.Screen
      name={name}
      component={initialRoute}
      options={{
        ...customConfig,
        headerStyle: { ...stackStyles },
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

export default () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: {
        backgroundColor: "#FAFAFA",
      },
    }}
  >
    <Tab.Screen
      name="Home"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-home"
                  : "ios-home-outline"
                : focused
                ? "md-home"
                : "md-home-outline"
            }
          />
        ),
      }}
    >
      {() =>
        stackFactory(Home, "Home", {
          headerRight: () => <MessagesLink />,
          headerTitle: () => <NavIcon name={"logo-instagram"} size={35} />,
        })
      }
    </Tab.Screen>
    <Tab.Screen
      name="Search"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
          />
        ),
      }}
    >
      {() =>
        stackFactory(Search, "Search", {
          title: "Search",
        })
      }
    </Tab.Screen>
    <Tab.Screen
      name="Add"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={28}
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
          />
        ),
      }}
      component={View}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate("PhotoNavigation");
        },
      })}
    />
    <Tab.Screen
      name="Notifications"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-outline"
                : focused
                ? "md-heart"
                : "md-heart-outline"
            }
          />
        ),
      }}
    >
      {() =>
        stackFactory(Notifications, "Notifications", {
          title: "Notifications",
        })
      }
    </Tab.Screen>
    <Tab.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-person"
                  : "ios-person-outline"
                : focused
                ? "md-person"
                : "md-person-outline"
            }
          />
        ),
      }}
    >
      {() =>
        stackFactory(Profile, "Profile", {
          title: "Profile",
        })
      }
    </Tab.Screen>
  </Tab.Navigator>
);
