export const decode = (str: string): string => atob(str);

export const encode = (data: Uint8Array): string => {
    let binary = '';
    const len = data.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(data[i]);
    }
    return btoa(binary);
};

export const decodeAudioData = async (
  data: string | Uint8Array | ArrayBuffer,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> => {
   // The App.tsx calls this with the result of decode(audioData), which is a binary string.
   // We need to convert that string back to an ArrayBuffer for standard decoding, or process PCM manually.
   // Assuming PCM 16-bit little-endian based on genai samples.
   let pcmData: Int16Array;
   
   if (typeof data === 'string') {
       const len = data.length;
       const bytes = new Uint8Array(len);
       for (let i = 0; i < len; i++) {
           bytes[i] = data.charCodeAt(i);
       }
       pcmData = new Int16Array(bytes.buffer);
   } else if (data instanceof Uint8Array) {
        pcmData = new Int16Array(data.buffer);
   } else {
       pcmData = new Int16Array(data as ArrayBuffer);
   }

   const frameCount = pcmData.length;
   const buffer = ctx.createBuffer(1, frameCount, sampleRate);
   const channelData = buffer.getChannelData(0);
   
   for (let i = 0; i < frameCount; i++) {
       // Convert Int16 to Float32 [-1.0, 1.0]
       channelData[i] = pcmData[i] / 32768.0;
   }
   
   return buffer;
};