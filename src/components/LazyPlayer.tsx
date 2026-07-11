import ReactPlayer from "react-player";

// Define the props to pass in...
// Because the defaults are broken.
interface CustomPlayerProps {
  url: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  muted?: boolean;
  playing?: boolean;
  loop?: boolean;
  playsinline?: boolean;
  controls?: boolean;
  onReady?: () => void;
  onError?: () => void;
  config?: {
    file?: {
      attributes?: {
        controlsList?: string;
        style?: React.CSSProperties;
      };
    };
    [key: string]: any;
  };
}

interface LazyPlayerProps {
  url: string;
  mediaKey: string;
  onReady: () => void;
  onError?: () => void;
}

const TypedPlayer = ReactPlayer as React.ComponentType<CustomPlayerProps>;

export default function LazyPlayer({
  url,
  mediaKey,
  onReady,
  onError,
}: LazyPlayerProps) {
  return (
    <TypedPlayer
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
      onError={onError}
      key={mediaKey}
      config={{
        file: {
          attributes: {
            controlsList: "nodownload",
            style: {
              objectFit: "contain",
              width: "100%",
              height: "100%",
            },
          },
        },
      }}
    />
  );
}
