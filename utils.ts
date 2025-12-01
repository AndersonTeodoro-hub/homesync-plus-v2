// utils.ts – Funções auxiliares

export const encode = (buffer: Uint8Array): string => {
  return btoa(String.fromCharCode(...buffer));
};

export const decode = (b64: string): Uint8Array => {
  const binary = atob(b64);
  return new Uint8Array([...binary].map(x => x.charCodeAt(0)));
};

export const decodeAudioData = async (
  data: Uint8Array,
  audioContext: AudioContext,
  sampleRate: number,
  channels: number
) => {
  try {
    return await audioContext.decodeAudioData(data.buffer.slice(0));
  } catch (err) {
    console.error("Erro ao decodificar áudio:", err);
    throw err;
  }
};
