# Nautillus 🐚

App em **React Native (Expo)** para o projeto integrador **BentoTec**, focado em rastreabilidade
de lotes de medicamentos via leitura de QR Code.

## Fluxo do app

1. **Splash Screen** — exibe o ícone do app com a fonte Oxanium, por ~2s.
2. **Login (placeholder)** — campos de e-mail e senha sem autenticação real; qualquer
   preenchimento libera o acesso.
3. **Início / Scanner (abas)**
   - **Início**: tela de boas-vindas.
   - **Scanner**: abre a câmera, trata permissão negada (inclusive "Não perguntar
     novamente", direcionando para as Configurações do sistema), escaneia o QR Code do lote e
     envia os dados para o servidor (`src/services/api.js`, atualmente **mockado**).

## Como rodar

```bash
npm install
npx expo start
```

Abra no dispositivo físico pelo app **Expo Go** (lendo o QR Code do terminal) ou em um emulador
Android/iOS.

> Câmera não funciona no simulador iOS nem sempre no emulador Android sem câmera virtual
> configurada — teste preferencialmente em um dispositivo físico.

## Estrutura

```
nautillus/
├── App.js                     # Carregamento de fontes + navegação raiz
├── app.json                   # Configuração do Expo (ícone, splash, permissões)
├── assets/
│   ├── icon.png                # Ícone do app (fornecido)
│   └── fonts/                  # Oxanium (Regular, Medium, SemiBold, Bold, ExtraBold)
└── src/
    ├── theme/colors.js         # Paleta branca + azuis + teal
    ├── services/api.js         # Requisição (placeholder) ao servidor de lotes
    ├── navigation/MainTabs.js  # Abas Início / Scanner
    └── screens/
        ├── SplashScreen.js
        ├── LoginScreen.js
        ├── HomeScreen.js
        └── ScannerScreen.js    # Câmera + leitura de QR Code + tratamento de erros
```

## Próximos passos sugeridos

- Conectar `src/services/api.js` ao endpoint real de validação de lotes do BentoTec.
- Implementar autenticação real na tela de Login.
- Persistir o histórico de leituras localmente (AsyncStorage/SQLite) para consulta offline.
- Exibir indicador de precisão de GPS na auditoria da visita, se essa etapa for incorporada.
