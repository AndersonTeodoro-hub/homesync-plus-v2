import React, { useEffect, useState } from "react";

interface WelcomeScreenProps {
  userName: string;
  onFinish: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userName, onFinish }) => {
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (videoEnded) {
      setTimeout(() => {
        onFinish();
      }, 800); // pequena transição suave
    }
  }, [videoEnded]);

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-black"
      style={{ position: "absolute", top: 0, left: 0, zIndex: 9999 }}
    >
      <video
        autoPlay
        playsInline
        onEnded={() => setVideoEnded(true)}
        className="w-full h-full object-cover"
      >
        <source src="/videos/sync-welcome.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute bottom-10 text-center text-white text-3xl font-semibold animate-fade-in"
        style={{ width: "100%" }}
      >
        Olá {userName}, que bom te ver novamente!
      </div>
    </div>
  );
};

export default WelcomeScreen;
