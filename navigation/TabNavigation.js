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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (initialRoute, name, customConfig) => (
  <Stack.Navigator>
    <Stack.Screen
      name={name}
      component={initialRoute}
      options={{ ...customConfig }}
    />
  </Stack.Navigator>
);

export default () => (
  <Tab.Navigator tabBarOptions={{ showLabel: false }}>
    <Tab.Screen
      name="Home"
      options={{
        tabBarIcon: () => (
          <NavIcon name={Platform.OS === "ios" ? "ios-home" : "md-home"} />
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
        tabBarIcon: () => (
          <NavIcon name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
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
        tabBarIcon: () => (
          <NavIcon
            name={
              Platform.OS === "ios"
                ? "ios-add-circle-outline"
                : "md-add-circle-outline"
            }
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
        tabBarIcon: () => (
          <NavIcon name={Platform.OS === "ios" ? "ios-heart" : "md-heart"} />
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
        tabBarIcon: () => (
          <NavIcon name={Platform.OS === "ios" ? "ios-person" : "md-person"} />
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
