
/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    TWILIO_ACCOUNT_SID?: string;
    TWILIO_AUTH_TOKEN?: string;
    TWILIO_PHONE_NUMBER?: string;
    [key: string]: string | undefined;
  }
}
