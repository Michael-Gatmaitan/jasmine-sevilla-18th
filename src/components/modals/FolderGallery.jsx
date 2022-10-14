import { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './FolderGallery.css';

// npm module for generating video thumbnail
import VideoThumbnail from 'react-video-thumbnail';

const FolderGallery = props => {

  const {
    showFolderGallery,
    setShowFolderGallery,
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

  return (
    <AnimatePresence>
      {showFolderGallery && (
        <motion.div className="folder-gallery"
          variants={variant}
          initial="initial"
          animate="animate"
          exit="exit"
        >

          <div className="folder-gallery-nav">
            <div className="close" onClick={ () => {
              setShowFolderGallery(false);
              setIsVideoLoaded(false);
            }}>
              <img src="./svg/icons/close_black.svg" alt="close" />
            </div>

            <div className="logo">
              <img src="./svg/icons/jm_black.svg" alt="logo" />
            </div>
            
            <div className="download-folder">
              <Link to={galleryData.paths.pictures} target="_blank" download>
                <img src="./svg/icons/download.svg" alt="download_folder" />
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
                {picturesIsNotEmpty && (<>
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
                </>)}

                {videosIsNotEmpty && (<>
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
                              <img src="./svg/icons/play.svg" alt="play_icon" className="play" />

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
                </>)}
              </div>
            </div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FolderGallery;