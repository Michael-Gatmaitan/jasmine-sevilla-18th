import { useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Link } from 'react-router-dom';
import './VideoPlayer.css';

const { PUBLIC_URL } = process.env;

const VideoPlayer = props => {

  const {
    showVideoPlayer,
    setShowVideoPlayer,
    videoSrc,
    setVideoSrc
  } = props;

  const videoDownloadedElement = useRef(null);

  const videoDownloadedAction = () => {
    console.log(videoDownloadedElement);
    const { current: el } = videoDownloadedElement;
    el.classList.add("video-downloaded-action");

    setTimeout(() => {
      el.classList.remove("video-downloaded-action");
    }, 1000);
  }

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

        <Link to={videoSrc} target="_blank" download>
          <button className="download-video" onClick={ videoDownloadedAction }>Download video</button>
        </Link>

      </div>

      <div className="video-downloaded" ref={videoDownloadedElement}>Video Downloaded Successfully</div>
    </div>

  )
}

export default VideoPlayer;