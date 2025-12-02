import React, { useEffect, useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import MainInterface from './MainInterface';

export default function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoadingName, setIsLoadingName] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("sync_user_name");
    if (stored) {
      setUserName(stored);
    }
    setIsLoadingName(false);
  }, []);

  const handleNameSubmit = (name: string) => {
    localStorage.setItem("sync_user_name", name);
    setUserName(name);
  };

  if (isLoadingName) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: 22
        }}
      >
        Carregando...
      </div>
    );
  }
  // Se o usuário ainda não informou o nome → mostrar vídeo + tela de boas-vindas
  if (!userName) {
    return (
      <WelcomeScreen onNameSubmit={handleNameSubmit} />
    );
  }
  // Se já tem nome → abrir interface principal
  return (
    <MainInterface userName={userName} />
  );
}
