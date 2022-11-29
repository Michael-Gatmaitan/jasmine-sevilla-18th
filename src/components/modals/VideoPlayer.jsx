import ReactPlayer from 'react-player/lazy';
import './VideoPlayer.css';

const { PUBLIC_URL } = process.env;

const VideoPlayer = props => {

  const {
    showVideoPlayer,
    setShowVideoPlayer,
    videoSrc,
    setVideoSrc
  } = props;

  return (
    <div className="video-player"
      style={{
        display: showVideoPlayer ? "flex" : "none"
      }}
    >
      <div
        onClick={ () => {
          setShowVideoPlayer(false);
          setVideoSrc(".");
          console.log("close video player");
        } }
        className="close-video-player"
      >
        <img src={`${PUBLIC_URL}/svg/icons/close_black.svg`} alt="close" />
      </div>

      <div className="player"> 
        <ReactPlayer
          playing={true}
          controls={true}
          url={videoSrc}
          className="video-element"
        />

        <button className="download-video">Download video</button>
      </div>
    </div>

  )
}

export default VideoPlayer;