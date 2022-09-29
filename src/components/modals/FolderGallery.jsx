import './FolderGallery.css';
import { AnimatePresence, motion } from 'framer-motion';

const FolderGallery = props => {

  const {
    showFolderGallery,
    setShowFolderGallery,
    galleryData
  } = props;

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
            <div className="close" onClick={ () => setShowFolderGallery(false) }>
              <img src="./svg/icons/close_black.svg" alt="close" />
            </div>

            <div className="logo">
              <img src="./svg/icons/jm_black.svg" alt="logo" />
            </div>

            <div className="download-folder">
              <img src="./svg/icons/jm_black.svg" alt="logo" />
            </div>

            <div className="download-folder">
            <img src="./svg/icons/download.svg" alt="download_folder" />
            </div>

          </div>

          {galleryData && (
            <div className="gallery-container">
              <div className="folder-label">Folder</div>

              <div className="h-1">{galleryData.folderTitle}</div>

              <div className="selection">
                <button className="selection-button active-selection">Pictures</button>
                <button className="selection-button">Videos</button>
              </div>
            </div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FolderGallery;