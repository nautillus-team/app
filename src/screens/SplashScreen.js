import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients, fonts } from "../theme/colors";

export default function SplashScreen({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={gradients.splash} style={styles.container}>
      <Animated.View style={[styles.logoWrap, { opacity: fade, transform: [{ scale }] }]}>
        <Image source={require("../../assets/icon.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Nautillus</Text>
        <Text style={styles.subtitle}>Rastreabilidade de Lotes Farmacêuticos</Text>
      </Animated.View>

      <View style={styles.loaderWrap}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={styles.loaderText}>Carregando...</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrap: {
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 18,
  },
  title: {
    fontFamily: fonts.extraBold,
    fontSize: 34,
    color: colors.primaryDark,
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  loaderWrap: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
  },
  loaderText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
  },
});
