import React, { useEffect, useState, lazy, Suspense } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from 'react-router-dom';

import './FolderGallery.css';

// npm module for generating video thumbnail
import VideoThumbnail from 'react-video-thumbnail';

//image placeholder image
import PlaceHolderImage from '../../img/image-placeholder.png';

// image viewer and video player
// import ImageViewer from './ImageViewer.jsx';
// import VideoPlayer from './VideoPlayer.jsx';
const ImageViewer = lazy(() => import('./ImageViewer.jsx'));
const VideoPlayer = lazy(() => import('./VideoPlayer.jsx'));

const { PUBLIC_URL } = process.env;

const FolderGallery = props => {
  // const { galleryId } = useParams();
  const { galleryData } = props;
  const { pictures, videos } = galleryData.files;

  const [imagesByColumn, setImagesByColumn] = useState([]);
  const [videosByColumn, setVideosByColumn] = useState([]);

  const [activeSubFolder, setActiveSubFolder] = useState('Pictures');

  // const picturesIsNotEmpty = pictures.length !== 0;
  // const videosIsNotEmpty = videos.length !== 0;
  const [picturesIsNotEmpty, setPicturesIsNotEmpty] = useState(false);
  const [videosIsNotEmpty, setVideosIsNotEmpty] = useState(false);

  useEffect(() => {
    const cols = 3;
    if (pictures) {
      let imagesByColumn = [...Array(cols).keys()].map(c => pictures.filter((_, i) => i % cols === c));
      setImagesByColumn(imagesByColumn);
    }

    if (videos) {
      let videosByColumn = [...Array(cols).keys()].map(c => videos.filter((_, i) => i % cols === c));
      setVideosByColumn(videosByColumn);
    }

    setActiveSubFolder(
      (videos.length <= 0 && pictures.length >= 1) ? 'Pictures' :
    (pictures.length <= 0 && videos.length >= 1) ? 'Videos' :
    'Pictures'
    );
    setPicturesIsNotEmpty(pictures.length !== 0);
    setVideosIsNotEmpty(videos.length !== 0);
  }, [galleryData, pictures, videos]);


  const [isVideoLoaded, setIsVideoLoaded] = useState(true);

  const navigate = useNavigate();

  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoSrc, setVideoSrc] = useState(".");

  const [showImageViewer, setShowImageViewer] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const [showGuide, setShowGuide] = useState(false);

  // Know if user need guide or not
  useEffect(() => {
  const guideNeeded = localStorage.getItem("galleryGuide");

  if (guideNeeded !== 'false') {
    localStorage.setItem("galleryGuide", "false");
    setShowGuide(true);
  }
}, []);

  return (
    <div className="folder-gallery">

      {/* Ui for showing guide of gallery */}
      {showGuide && <Guide setShowGuide={setShowGuide} />}

      <div className="folder-gallery-nav">
        <div className="close" onClick={ () => {
          // Set BACK FUNCTION
          navigate('/gallery', { replace: true });
          // setIsVideoLoaded(false);
        }}>
          <img src={`${PUBLIC_URL}/svg/icons/close_black.svg`} alt="close" />
        </div>

        <div className="logo">
          <img src={`${PUBLIC_URL}/svg/icons/jm_black.svg`} alt="logo" />
        </div>
        
        <div className="download-folder">
          <Link to={galleryData.paths.pictures} target="_blank" download>
            <img src={`${PUBLIC_URL}/svg/icons/download.svg`} alt="download_folder" />
          </Link>
        </div>

      </div>

      {galleryData && (
        <div className="gallery-container">
          <div className="folder-label">Folder</div>

          <div className="h-1">{galleryData.folderTitle}</div>

          <div className="selection">

          {picturesIsNotEmpty &&
            <button className={`selection-button ${activeSubFolder === "Pictures" ? 'active-selection' : ""}`} onClick={() => setActiveSubFolder("Pictures") }>Pictures</button>
          }
          {videosIsNotEmpty &&
            <button className={`selection-button ${activeSubFolder === "Videos" ? 'active-selection' : ""}`} onClick={() => setActiveSubFolder("Videos") }>Videos</button>
          }

          </div>

          <div className="gallery-data">
            {picturesIsNotEmpty &&
              <PicturesGalleryBody
                activeSubFolder={activeSubFolder}
                imagesByColumn={imagesByColumn}
                galleryData={galleryData}
                setShowImageViewer={setShowImageViewer}
                setImageSrc={setImageSrc}
              />
            }

            {videosIsNotEmpty &&
              <VideosGalleryBody
                activeSubFolder={activeSubFolder}
                videosByColumn={videosByColumn}
                isVideoLoaded={isVideoLoaded}
                setIsVideoLoaded={setIsVideoLoaded}
                setShowVideoPlayer={setShowVideoPlayer}
                setVideoSrc={setVideoSrc}
                galleryData={galleryData}
              />
            }
          </div>
        </div>
      )}

      {showImageViewer &&
        <Suspense fallback={<div>Image viewer loading</div>}>
          <ImageViewer
            showImageViewer={showImageViewer}
            setShowImageViewer={setShowImageViewer}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
        </Suspense>
      }

      {showVideoPlayer &&
        <Suspense fallback={<div>Video Player loading</div>}>
          <VideoPlayer
            showVideoPlayer={showVideoPlayer}
            setShowVideoPlayer={setShowVideoPlayer}
            videoSrc={videoSrc}
            setVideoSrc={setVideoSrc}
          />
        </Suspense>
      }

    </div>
  )
}

const PicturesGalleryBody = props => {
  const {
    activeSubFolder,
    imagesByColumn,
    galleryData,
    setShowImageViewer,
    setImageSrc
  } = props;

  const styles = {
    header: { display: activeSubFolder === "Pictures" ? "block" : "none" },
    dataGrid: { display: activeSubFolder === "Pictures" ? "grid" : "none" }
  };

  const handleImageViewer = (imgPath) => {
    setShowImageViewer(true);
    setImageSrc(imgPath);
  }

  return (
    <>
      <div className="h-2" style={styles.header}>Pictures</div>
      <div className="data-grids" style={styles.dataGrid}>
        {imagesByColumn.map((imageColumn, i) => (
          <div className="data-grid" key={i}>
            {imageColumn.map((image, j) =>(
              <div className="data-container"
                onClick={ () => handleImageViewer(`${galleryData.paths.pictures}${image}`)}
                key={j}>
                <LazyLoadImage
                  src={`${galleryData.paths.pictures}${image}`}
                  className="gallery-image"
                  alt={image}
                  placeholderSrc={PlaceHolderImage}
                  effect="blur"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

// Video Gallery Body
const VideosGalleryBody = props => {

  const {
    activeSubFolder,
    videosByColumn,
    isVideoLoaded,
    setIsVideoLoaded,
    setShowVideoPlayer,
    setVideoSrc,
    galleryData
  } = props;

  const styles = {
    header: { display: activeSubFolder === "Videos" ? "block" : "none" },
    dataGrid: { display: activeSubFolder === "Videos" ? "grid" : "none" }
  };

  return (
    <>
      <div className="h-2" style={styles.header}>Videos</div>
      <div className="data-grids" style={styles.dataGrid}>
        {videosByColumn.map((videoColumn, i) => (
          <div className="data-grid" key={i}>
            {videoColumn.map((video, j) => (
              <div className="data-container"
                key={j}
                onClick={() => {
                  setShowVideoPlayer(true);
                  setVideoSrc(`${galleryData.paths.videos}${video}`);
                }}
              >
                <div className="video-thumbnail"
                  style={{
                    display: isVideoLoaded ? "block" : "none"
                  }}
                >
                  <div className="thumbnail-darker" />
                  <img src={`${PUBLIC_URL}/svg/icons/play.svg`} alt="play_icon" className="play" />

                  <VideoThumbnail
                    videoUrl={`${galleryData.paths.videos}${video}`}
                    thumbnailHandler={ () => setIsVideoLoaded(true) }
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

const Guide = ({ setShowGuide }) => (
  <div className="guide-container">
    <div className="guide">
      <div className="text-guide">
        Tap to images or video to view them, and you can laso download them by clicking the download button.
      </div>

      <button className="close-guide" onClick={() => setShowGuide(false)}>
        Close
      </button>
    </div>

  </div>
)

export default FolderGallery;