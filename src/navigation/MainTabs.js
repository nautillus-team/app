import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
import ScannerScreen from "../screens/ScannerScreen";
import { colors, fonts } from "../theme/colors";

const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }) {
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.4 }}>{label}</Text>;
}

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTitleStyle: { fontFamily: fonts.semiBold, color: colors.textDark },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 64 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          title: "Escanear Lote",
          tabBarIcon: ({ focused }) => <TabIcon label="📷" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
