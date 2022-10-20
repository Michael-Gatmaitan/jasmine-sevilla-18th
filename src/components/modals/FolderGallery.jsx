import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
// import VideoPlayer from '../modals/VideoPlayer';

import './FolderGallery.css';

// npm module for generating video thumbnail
import VideoThumbnail from 'react-video-thumbnail';

const { PUBLIC_URL } = process.env;

const FolderGallery = props => {
  // const { galleryId } = useParams();

  const {
    galleryData
  } = props;
  
  const {
    pictures,
    videos
  } = galleryData.files;

  const [imagesByColumn, setImagesByColumn] = useState([]);
  const [videosByColumn, setVideosByColumn] = useState([]);

  const [activeSubFolder, setActiveSubFolder] = useState('Pictures');

  useEffect(() => {

    if (pictures) {
      const cols = 3;
      let imagesByColumn = [...Array(cols).keys()].map(c => pictures.filter((_, i) => i % cols === c));
      setImagesByColumn(imagesByColumn);
    }

    if (videos) {
      const cols = 3;
      let videosByColumn = [...Array(cols).keys()].map(c => videos.filter((_, i) => i % cols === c));
      setVideosByColumn(videosByColumn);
    }

    setActiveSubFolder(
      (videos.length <= 0 && pictures.length >= 1) ? 'Pictures' :
    (pictures.length <= 0 && videos.length >= 1) ? 'Videos' :
    'Pictures'
    );
  }, [galleryData, pictures, videos]);

  const picturesIsNotEmpty = pictures.length !== 0;
  const videosIsNotEmpty = videos.length !== 0;

  const [isVideoLoaded, setIsVideoLoaded] = useState(true);
  const variant = {
    initial: {
      opacity: 0,
      y: '-10vh',
      ponterEvents: "none",
    },

    animate: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: { duration: .2 }
    },

    exit: {
      y: '-10vh',
      opacity: 0,
      pointerEvents: "none",
      transition: { duration: .2 }
    }
  }

  const navigate = useNavigate();

  // const [showVideoPlayer, setShowVideoPlayer] = useState(true);

  return (
    <AnimatePresence>

      <motion.div className="folder-gallery"
        variants={variant}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* <VideoPlayer
          showVideoPlayer={showVideoPlayer}
          setShowVideoPlayer={setShowVideoPlayer}
        /> */}

        <div className="folder-gallery-nav">
          <div className="close" onClick={ () => {
            // Set BACK FUNCTION
            navigate('/gallery', { replace: true });
            setIsVideoLoaded(false);
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
                />
              }

              {videosIsNotEmpty &&
                <VideosGalleryBody
                  activeSubFolder={activeSubFolder}
                  videosByColumn={videosByColumn}
                  isVideoLoaded={isVideoLoaded}
                  setIsVideoLoaded={setIsVideoLoaded}
                  galleryData={galleryData}
                />
              }
            </div>
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  )
}

const PicturesGalleryBody = props => {
  const {
    activeSubFolder,
    imagesByColumn,
    galleryData
  } = props;

  return (
    <>
      <div className="h-2" style={{ display: activeSubFolder === "Pictures" ? "block" : "none" }}>Pictures</div>
      <div className="data-grids" style={{ display: activeSubFolder === "Pictures" ? "grid" : "none" }}>
        {imagesByColumn.map((imageColumn, i) => (
          <div className="data-grid" key={i}>
            {imageColumn.map((image, j) =>(
              <div className="data-container" key={j}>
                <LazyLoadImage
                  src={`${galleryData.paths.pictures}${image}`}
                  className="gallery-images"
                  alt={image}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

const VideosGalleryBody = props => {

  const {
    activeSubFolder,
    videosByColumn,
    isVideoLoaded,
    setIsVideoLoaded,
    galleryData
  } = props;

  return (
    <>
      <div className="h-2" style={{ display: activeSubFolder === "Videos" ? "block" : "none" }}>Videos</div>
      <div className="data-grids" style={{ display: activeSubFolder === "Videos" ? "grid" : "none" }}>
        {videosByColumn.map((videoColumn, i) => (
          <div className="data-grid" key={i}>
            {videoColumn.map((video, j) => (
              <div className="data-container" key={j}>
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

export default FolderGallery;