import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreenExpo from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainTabs from "./src/navigation/MainTabs";
import { colors } from "./src/theme/colors";

SplashScreenExpo.preventAutoHideAsync().catch(() => {});

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    "Oxanium-Regular": require("./assets/fonts/Oxanium-Regular.ttf"),
    "Oxanium-Medium": require("./assets/fonts/Oxanium-Medium.ttf"),
    "Oxanium-SemiBold": require("./assets/fonts/Oxanium-SemiBold.ttf"),
    "Oxanium-Bold": require("./assets/fonts/Oxanium-Bold.ttf"),
    "Oxanium-ExtraBold": require("./assets/fonts/Oxanium-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontsError) {
      await SplashScreenExpo.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.background }} onLayout={onLayoutRootView}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
