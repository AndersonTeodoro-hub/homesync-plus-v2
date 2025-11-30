
import twilio from 'twilio';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { to, message } = request.body;

  if (!to || !message) {
    return response.status(400).json({ error: 'Missing parameters' });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (accountSid && authToken && fromNumber) {
    try {
      const client = twilio(accountSid, authToken);
      console.log(`[SERVER] Iniciando ligação real via Twilio para ${to}...`);
      
      const call = await client.calls.create({
        twiml: `<Response><Say language="pt-BR" voice="alice">${message}</Say></Response>`,
        to: to,
        from: fromNumber,
      });

      return response.status(200).json({ success: true, mode: 'real', sid: call.sid });

    } catch (error) {
      console.error('[SERVER] Erro na Twilio:', error);
      return response.status(500).json({ error: 'Failed to initiate Twilio call', details: error.message });
    }
  } else {
    // Fallback: Modo Simulação se não tiver chaves
    return response.status(200).json({ success: true, mode: 'simulation' });
  }
}
