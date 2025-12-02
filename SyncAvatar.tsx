import React from "react";

const SyncAvatar: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "22px",
        right: "22px",
        width: "110px",
        height: "110px",
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid #ffffff30",
        boxShadow: "0 0 20px #00000070",
      }}
    >
      <img
        src="/images/sync-avatar.png"
        alt="Sync Avatar"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default SyncAvatar;
