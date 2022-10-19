import './VideoPlayer.css';

const VideoPlayer = props => {

  const {
    showVideoPlayer,
    setShowVideoPlayer
  } = props;

  return (
    <div className="video-player"
      style={{
        display: showVideoPlayer ? "block" : "none"
      }}
    >
      <div
        onClick={ () => setShowVideoPlayer(false) }
        className="close-video-player"
      >

      </div>

      <div className="player"></div>
    </div>

  )
}

export default VideoPlayer;