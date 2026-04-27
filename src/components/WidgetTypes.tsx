import type {
  TextContent,
  VideoContent,
} from "../ProjectContentTypes";

export const Text = ({ textData }: { textData: TextContent }) => {
  return (
    <div>
      <p>{textData.data}</p>
    </div>
  );
};

export const Video = ({ videoData }: { videoData: VideoContent }) => {
  // const ext = videoData.data.split(".").at(-1);

  return (
    <div>
      <video src={videoData.data}>Your browser does not support the video tag.</video>
    </div>
  );
  {
    /* 
        return <iframe width="560" height="315" src={videoData.data} title="YouTube video player" 
        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe> 
    */
  }
};
