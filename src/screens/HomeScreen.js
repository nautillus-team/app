import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import { colors, fonts } from "../theme/colors";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} contentFit="contain" />
      <Text style={styles.title}>Bem-vindo ao Nautillus</Text>
      <Text style={styles.text}>
        Use a aba <Text style={styles.bold}>Scanner</Text> para escanear o QR Code do lote de
        medicamento e enviar a leitura para validação no servidor.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sobre o projeto</Text>
        <Text style={styles.cardText}>
          Aplicativo desenvolvido para o projeto interdiciplinar Nautillus para BentoTec.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Rastreamento Fácil</Text>
        <Text style={styles.cardText}>
          O aplicativo lê códigos e envia para a API, registrando lote, tempo e funcionário.
        </Text>
      </View>

      <Image
        source={require("../../assets/homescreen.svg")}
        style={styles.illustration}
        contentFit="contain"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  logo: {
    width: 94,
    height: 94,
    marginTop: 12,
    marginBottom: 16,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primaryDark,
    textAlign: "center",
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 19,
  },
  bold: {
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    marginTop: 26,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.teal,
    marginBottom: 6,
  },
  cardText: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 18,
  },
  illustration: {
    width: 280,
    height: 280,
    marginTop: 32,
    marginBottom: 8,
  },
});
