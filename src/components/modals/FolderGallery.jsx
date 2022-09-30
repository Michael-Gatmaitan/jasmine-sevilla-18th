import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './FolderGallery.css';

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

  useEffect(() => {

    if (pictures) {
      const cols = 3;
      let imagesByColumn = [...Array(cols).keys()].map(c => pictures.filter((_, i) => i % cols === c));
      setImagesByColumn(imagesByColumn);
    }
  }, [galleryData, pictures]);

  const picturesIsNotEmpty = pictures.length !== 0;
  const videosIsNotEmpty = videos.length !== 0;

  const picturesContainer = useRef(null);

  const scrollToTop_pictures = () => {
    picturesContainer.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

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

  //======== =   _= =======   =====   |   =======  ====
  //=        = =       =     =        |      =     =   =
  //====     ==        =      ====_   |      =     ===
  //=        = =       =          =   |   =  =     =  =
  //======== =  =__ =======  =====    |    ==      =   =

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
            <div className="close" onClick={ () => setShowFolderGallery(false) }>
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

              {picturesIsNotEmpty && <button className="selection-button" onClick={() => scrollToTop_pictures() }>Pictures</button>}
              {videosIsNotEmpty && <button className="selection-button">Videos</button>}

              </div>

              <div className="gallery-data">
                {picturesIsNotEmpty && (
                  <>
                    <div className="h-2" ref={picturesContainer}>Pictures</div>
                    <div className="pictures-grids">
                      {imagesByColumn.map((imageColumn, i) => (
                        <div className="picture-grid" key={i}>
                          {imageColumn.map((image, j) =>(
                            <div className="picture-container" key={j}>
                              <img src={`${galleryData.paths.pictures}${image}`} alt="gallery-column" />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FolderGallery;