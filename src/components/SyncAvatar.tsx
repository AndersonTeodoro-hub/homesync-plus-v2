import React from "react";

interface SyncAvatarProps {
  autoPlay?: boolean;
  small?: boolean;
}

const SyncAvatar: React.FC<SyncAvatarProps> = ({ autoPlay = false, small = false }) => {
  const size = small ? 160 : 260;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid rgba(255,255,255,0.2)",
        boxShadow: "0 0 22px rgba(79,140,255,0.4)",
        background: "#0d1118",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
        src="/avatar-intro.mp4"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default SyncAvatar;

