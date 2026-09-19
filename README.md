# Nautillus 🐚

App em **React Native (Expo)** do projeto integrador Nautillus para **BentoTec**, focado em rastreabilidade
de lotes de medicamentos via leitura de QR Code.

## Fluxo do app

1. **Splash Screen** Exibe o ícone do app.
2. **Login** Campos de e-mail e senha sem autenticação real, a API auth Spring Boot está em fases de teste.
3. **Início e Scanner**
   - **Início**: tela de boas-vindas.
   - **Scanner**: abre a câmera, trata permissão negada (inclusive "Não perguntar
     novamente", direcionando para as Configurações do sistema).

## Como rodar

```bash
npm install
npx expo start
```

Abra no dispositivo físico pelo app **Expo Go** (lendo o QR Code do terminal) ou em um emulador
Android/iOS.

> Câmera não funciona no simulador iOS nem sempre no emulador Android sem câmera virtual
> Nos meus testes (Kühl) eu não consegui acessar a Live preview da câmera, porém pelo debug em console está tudo correto.


## Próximos passos sugeridos

- Conectar `src/services/api.js` ao endpoint real de validação de lotes do Nautillus.
- Implementar autenticação real na tela de Login.
- Persistir o histórico de leituras localmente (AsyncStorage ou SQLite) para consulta offline.
- Exibir localização ao registrar o lote para segurança adicional.
