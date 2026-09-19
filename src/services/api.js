// Serviço de API — PLACEHOLDER
// Substitua BASE_URL pelo endpoint real do backend do BentoTec quando disponível.

const BASE_URL = "https://api.bentotec.exemplo.com";

/**
 * Envia os dados de um lote de medicamento escaneado via QR Code para o servidor.
 * Nesta etapa é apenas um placeholder: simula a chamada de rede e retorna
 * uma resposta mockada, para que o fluxo da UI possa ser demonstrado
 * mesmo sem um backend real disponível.
 */
export async function enviarLoteEscaneado(qrCodeData) {
  const payload = {
    codigo: qrCodeData,
    escaneadoEm: new Date().toISOString(),
    origem: "app-nautillus",
  };

  try {
    // Chamada real (descomente quando o backend estiver disponível):
    //
    // const response = await fetch(`${BASE_URL}/lotes/validar`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // if (!response.ok) throw new Error(`Erro do servidor: ${response.status}`);
    // return await response.json();

    // --- Simulação (placeholder) ---
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const simulacaoValida = qrCodeData && qrCodeData.length % 2 === 0;

    return {
      sucesso: true,
      status: simulacaoValida ? "LOTE_VALIDO" : "LOTE_EM_ANALISE",
      mensagem: simulacaoValida
        ? "Lote validado com sucesso junto ao servidor (simulação)."
        : "Lote recebido e enviado para análise (simulação).",
      lote: payload,
    };
  } catch (error) {
    return {
      sucesso: false,
      status: "ERRO",
      mensagem: "Não foi possível contatar o servidor. Tente novamente.",
      erro: String(error?.message || error),
    };
  }
}

export default { enviarLoteEscaneado };
