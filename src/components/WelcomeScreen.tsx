import React from "react";
import SyncAvatar from "./SyncAvatar";

interface WelcomeScreenProps {
  userName: string;
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userName, onContinue }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#0a0d14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "Inter, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <SyncAvatar autoPlay />
      </div>

      <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "10px" }}>
        Olá {userName}, que bom te ver!
      </h1>

      <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: "30px" }}>
        Estou pronta para te ajudar em tudo.  
        Quer conversar?  
      </p>

      <button
        onClick={onContinue}
        style={{
          padding: "14px 28px",
          background: "#4f8cff",
          border: "none",
          borderRadius: "12px",
          color: "white",
          fontSize: "1.1rem",
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: "0 0 18px rgba(79,140,255,0.5)",
          transition: "0.3s",
        }}
      >
        Entrar no painel
      </button>
    </div>
  );
};

export default WelcomeScreen;
