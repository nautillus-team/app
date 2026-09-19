import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  ActivityIndicator,
  Modal,
  Animated,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";
import { colors, fonts } from "../theme/colors";
import { enviarLoteEscaneado } from "../services/api";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erroCamera, setErroCamera] = useState(null);
  const [cameraVisivel, setCameraVisivel] = useState(false);
  const [cameraPronta, setCameraPronta] = useState(false);

  // A câmera só deve existir enquanto a tela estiver em foco.
  // Manter o CameraView montado entre trocas de aba deixa uma sessão de câmera
  // "stale" no Android, que aparece como um preview preto sem imagem. Montar
  // (e desmontar) a câmera a cada foco garante que ela inicie limpa e visível.
  useFocusEffect(
    useCallback(() => {
      console.log("[ScannerScreen] aba focada — montando a câmera");
      setCameraVisivel(true);
      setCameraPronta(false);
      return () => {
        console.log("[ScannerScreen] aba desfocada — desmontando a câmera");
        setCameraVisivel(false);
        setCameraPronta(false);
      };
    }, [])
  );

  const handleAbrirConfiguracoes = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const handleBarcodeScanned = async ({ data }) => {
    if (scanned || enviando) return;
    setScanned(true);
    setEnviando(true);

    try {
      const resposta = await enviarLoteEscaneado(data);
      setResultado(resposta);
    } catch (e) {
      setResultado({
        sucesso: false,
        status: "ERRO",
        mensagem: "Falha inesperada ao processar a leitura.",
      });
    } finally {
      setEnviando(false);
    }
  };

  const reiniciarLeitura = () => {
    setResultado(null);
    setScanned(false);
  };

  // ---- 1. Permissão ainda não determinada ----
  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.infoText}>Verificando permissão da câmera...</Text>
      </View>
    );
  }

  // ---- 2. Permissão negada ----
  if (!permission.granted) {
    const negadoPermanente = !permission.canAskAgain;

    return (
      <View style={styles.centered}>
        <View style={styles.iconCircle}>
          <Text style={{ fontSize: 30 }}>📷</Text>
        </View>
        <Text style={styles.title}>Acesso à câmera necessário</Text>

        {negadoPermanente ? (
          <>
            <Text style={styles.infoText}>
              Você negou permanentemente o acesso à câmera ("Não perguntar novamente"). Para
              escanear o QR Code do lote, habilite manualmente a permissão nas configurações do
              sistema:
            </Text>
            <Text style={styles.steps}>
              Configurações {">"} Apps {">"} Nautillus {">"} Permissões {">"} Câmera {">"} Permitir
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleAbrirConfiguracoes}>
              <Text style={styles.buttonText}>Abrir Configurações</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.infoText}>
              O Nautillus precisa da câmera para ler o QR Code do lote de medicamento.
            </Text>
            <TouchableOpacity style={styles.button} onPress={requestPermission}>
              <Text style={styles.buttonText}>Permitir Acesso</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  // ---- 3. Erro de hardware (ex.: sem câmera disponível no dispositivo) ----
  if (erroCamera) {
    return (
      <View style={styles.centered}>
        <View style={styles.iconCircle}>
          <Text style={{ fontSize: 30 }}>⚠️</Text>
        </View>
        <Text style={styles.title}>Câmera indisponível</Text>
        <Text style={styles.infoText}>
          Não foi possível acessar a câmera deste dispositivo. Verifique se ela não está sendo
          usada por outro aplicativo e tente novamente.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => setErroCamera(null)}>
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---- 4. Câmera pronta ----
  return (
    <View style={styles.container}>
      {cameraVisivel && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={cameraPronta && !scanned ? handleBarcodeScanned : undefined}
          onCameraReady={() => {
            console.log("[ScannerScreen] CameraView onCameraReady (preview ativo)");
            setCameraPronta(true);
            setErroCamera(null);
          }}
          onMountError={(e) => {
            console.log("[ScannerScreen] CameraView onMountError", e?.message ?? e);
            setErroCamera("mount_error");
          }}
        />
      )}

      <View style={styles.overlay}>
        <View style={styles.frame}>{!scanned && <ScanLine />}</View>
        <Text style={styles.hint}>Posicione o QR Code do lote dentro da área marcada</Text>
      </View>

      <Modal visible={!!resultado || enviando} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {enviando ? (
              <>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.modalTitle}>Enviando lote ao servidor...</Text>
              </>
            ) : (
              <>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: resultado?.sucesso ? colors.teal : colors.danger },
                  ]}
                />
                <Text style={styles.modalTitle}>
                  {resultado?.sucesso ? "Leitura processada" : "Falha no envio"}
                </Text>
                <Text style={styles.modalMessage}>{resultado?.mensagem}</Text>
                {resultado?.lote?.codigo ? (
                  <Text style={styles.modalCode}>Código: {resultado.lote.codigo}</Text>
                ) : null}

                <TouchableOpacity style={styles.button} onPress={reiniciarLeitura}>
                  <Text style={styles.buttonText}>Escanear Novamente</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Linha horizontal animada que varre o quadro de leitura para cima e para baixo,
// deixando claro que a câmera está ativa e procurando um QR Code. Implementada
// apenas com Animated (React Native puro), sem dependência nativa extra.
function ScanLine() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 224],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.scanLine, { transform: [{ translateY }] }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textDark,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    backgroundColor: colors.background,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.textDark,
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 12,
  },
  steps: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.primary,
    textAlign: "center",
    marginBottom: 18,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 26,
    marginTop: 6,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.white,
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: 240,
    height: 240,
    borderWidth: 3,
    borderColor: colors.tealLight,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  scanLine: {
    position: "absolute",
    top: 0,
    left: 12,
    right: 12,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.tealLight,
    shadowColor: colors.tealLight,
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  hint: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.white,
    marginTop: 18,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(10, 37, 64, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 26,
    alignItems: "center",
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: 12,
  },
  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textDark,
    marginTop: 8,
    textAlign: "center",
  },
  modalMessage: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
  },
  modalCode: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.primary,
    marginTop: 10,
  },
});
