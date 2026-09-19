import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { colors, fonts } from "../theme/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [secure, setSecure] = useState(true);

  // Login é apenas placeholder: não há autenticação real.
  // Qualquer preenchimento (ou nenhum) libera o acesso ao app.
  const handleEntrar = () => {
    navigation.replace("Main");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Image source={require("../../assets/login.svg")} style={styles.logo} contentFit="contain" />
          <Text style={styles.brand}>Nautillus</Text>
          <Text style={styles.tagline}>Acesse para cadastrar lotes</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@aluno.cps.sp.gov.br"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={secure}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Text style={styles.toggle}>{secure ? "Mostrar" : "Ocultar"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleEntrar} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.placeholderNote}>
            * A página de login é placeholder, a API Spring Boot ainda não está completa.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 220,
    height: 162,
    marginBottom: 12,
  },
  brand: {
    fontFamily: fonts.extraBold,
    fontSize: 26,
    color: colors.primaryDark,
  },
  tagline: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.textDark,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    fontFamily: fonts.regular,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.textDark,
    backgroundColor: colors.background,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.background,
    paddingRight: 14,
  },
  passwordInput: {
    flex: 1,
    fontFamily: fonts.regular,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.textDark,
  },
  toggle: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.primary,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.white,
    letterSpacing: 0.5,
  },
  placeholderNote: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 14,
    textAlign: "center",
  },
});
