import React from "react";
import SyncAvatar from "./SyncAvatar";

interface MainInterfaceProps {
  userName: string;
}

const MainInterface: React.FC<MainInterfaceProps> = ({ userName }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#0b0f18",
        color: "white",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Barra superior */}
      <header
        style={{
          width: "100%",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#111623",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600 }}>
          Sync Plus
        </h2>
        <span style={{ opacity: 0.8, fontSize: "1rem" }}>
          Olá, {userName}
        </span>
      </header>

      {/* Área principal */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "25px" }}>
          <SyncAvatar autoPlay small />
        </div>

        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Como posso ajudar hoje?
        </h1>

        <p
          style={{
            opacity: 0.85,
            fontSize: "1.1rem",
            maxWidth: "400px",
            textAlign: "center",
            lineHeight: "1.5",
          }}
        >
          Pode falar comigo livremente ou escolher uma das funções abaixo.
        </p>

        {/* BOTÕES DE FUNÇÕES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "15px",
            marginTop: "30px",
            width: "100%",
            maxWidth: "380px",
          }}
        >
          {[
            "Assistente Pessoal",
            "Chef Inteligente",
            "Organização",
            "Finanças",
            "Treino",
            "Nutrição",
            "Sync Kids",
            "English Tutor",
          ].map((label) => (
            <button
              key={label}
              style={{
                padding: "14px",
                background: "#1a2133",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "12px",
                color: "white",
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "0.25s",
              }}
              onMouseOver={(e) =>
                ((e.target as HTMLElement).style.background = "#25304a")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLElement).style.background = "#1a2133")
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainInterface;
