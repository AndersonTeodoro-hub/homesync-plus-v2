import React from "react";
import SyncAvatar from "./SyncAvatar";

interface MainProps {
  userName: string;
}

const MainInterface: React.FC<MainProps> = ({ userName }) => {
  return (
    <div className="w-full h-full p-6 text-white">
      <div className="text-3xl mb-4 font-semibold">
        Como posso ajudar hoje, {userName}?
      </div>

      {/* Botões, modos, IA, etc. */}
      <div className="mt-10 text-lg text-gray-300">
        Escolha um modo ou converse comigo por voz.
      </div>

      <SyncAvatar />
    </div>
  );
};

export default MainInterface;
