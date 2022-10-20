import { data } from '../imageData.js';
import { motion } from 'framer-motion';
import { pageAnimationVariant } from '../pageAnimationVariant';
import { Link } from 'react-router-dom';

import PageBody from './reusable/PageBody';
// import FolderGallery from './modals/FolderGallery';

import './scss/Gallery.css';

const Gallery = props => {
  //
  const { setGalleryData } = props;
  //

  const { explore, special_memories } = data;
  const folderInfos = [
    {
      folderSectionHeader: "Explore",
      folderSectionClass: " explore",
      folderData: explore,
    }, {
      folderSectionHeader: "Memories",
      folderSectionClass: " memories",
      folderData: special_memories,
    }
  ];

  // const [showFolderGallery, setShowFolderGallery] = useState(false);

  // Boilerplate only
  // const [galleryData, setGalleryData] = useState({
  //   "folderTitle": "",
  //   "paths": {
  //     "pictures": "",
  //     "videos": "",
  //   },

  //   "files": {
  //     "pictures": [],
  //     "videos": [],
  //   }
  // });

  return (
    <>

      {/* <FolderGallery
        showFolderGallery={showFolderGallery}
        setShowFolderGallery={setShowFolderGallery}
        galleryData={galleryData}
      /> */}

      <motion.div className="gallery container"
        variants={pageAnimationVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <PageBody header="Gallery" photoSrc="./svg/display_images/honeybunch_disp4.svg"/>


        <div className="folder-grid">
          {folderInfos.map((folderInfo, i) => (
            <FolderSection
              folderInfo={folderInfo}
              setGalleryData={setGalleryData}
              key={i}
            />
          ))}
        </div>

        <div className="gallery-message">
          <div className="h-1">Message</div>
          <div className="body-text">Cherish every moment na binigay satin ni God and this memories will not be erased to us forever if we buried it inside our heart. Thank you for being a good love provider to me, for being nice to me, for being a listener of my problems, for making memories with me that I will appreciate forever in my entire life. Don’t hesitate to reach me if you need one to talk with about your problems even if we sometine don’t understand each other’s side.

Thank you for everything you’ve done with me and for staying with me kahit na minsan di tayo nagkakaintindihan. Di a dito natatapos ang lahat hon! Madami pa tayong dadaanan at pagdadaanan na magiging memories natin na titignan natin as a lesson soon! I love you.</div>
        </div>
      </motion.div>
    </>
  )
}

const FolderSection = props => {

  const {
    folderInfo,
    setGalleryData
  } = props;

  const {
    folderSectionHeader,
    folderSectionClass,
    folderData
  } = folderInfo;

  return (
    <div className={`folder-section ${folderSectionClass}`}>
      <div className="h-1">{folderSectionHeader}</div>

      <div className="folder-block">
        {folderData.map((folder, i) => (
          <Link to={`/gallery/${folder.folderTitle}`}>
          <FolderContainer
            folder={folder}
            setGalleryData={setGalleryData}
            key={i}
          />
          </Link>
        ))}
      </div>
    </div>
  )
}

const FolderContainer = ({ folder, setGalleryData }) => (
  <div className="folder-container"
    onClick={() => {
      // setShowFolderGallery(true);
      setGalleryData(folder);
    }}
  >
    <div className="folder-info">
      <img src="./svg/icons/folder.svg" className="folder-icon" alt="folder" />
      <div className="folder-label btn-text">{folder.folderTitle}</div>
    </div>
  </div>
);

export default Gallery;