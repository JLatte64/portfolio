// src/components/LazyPlayer.tsx

import ReactPlayer from "react-player";

interface LazyPlayerProps {
  url: string;
  mediaKey: string;
  onReady: () => void;
  onError?: () => void; // ✅ 1. Add optional error prop tracking method definition
}

const Player = ReactPlayer as any;

export default function LazyPlayer({
  url,
  mediaKey,
  onReady,
  onError,
}: LazyPlayerProps) {
  return (
    <div className="project-media-asset player-wrapper">
      <Player
        key={mediaKey}
        url={url}
        className="react-player"
        width="100%"
        height="100%"
        muted
        playing
        loop
        playsinline
        controls
        onReady={onReady}
        onError={onError} // ✅ 2. Pass it down straight onto the underlying ReactPlayer engine instance
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
    </div>
  );
}
