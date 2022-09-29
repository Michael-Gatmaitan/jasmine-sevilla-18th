import React, { useState } from 'react';
import { data } from '../imageData.js';
import { motion } from 'framer-motion';
import { pageAnimationVariant } from '../pageAnimationVariant';

import PageBody from './reusable/PageBody';
import FolderGallery from './modals/FolderGallery';

import './scss/Gallery.css';

const Gallery = () => {

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

  const [showFolderGallery, setShowFolderGallery] = useState(true);
  const [galleryData, setGalleryData] = useState(special_memories[4]);

  return (
    <React.Fragment>

      <FolderGallery
        showFolderGallery={showFolderGallery}
        setShowFolderGallery={setShowFolderGallery}
        galleryData={galleryData}
      />

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
              setShowFolderGallery={setShowFolderGallery}
              key={i}
            />
          ))}
        </div>

        <div className="gallery-message">
          <div className="h-1">Message</div>
          <div className="body-text"></div>
        </div>
      </motion.div>
    </React.Fragment>
  )
}

const FolderSection = props => {
  const {
    folderInfo,
    setGalleryData,
    setShowFolderGallery
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
          <FolderContainer
            folder={folder}
            setGalleryData={setGalleryData}
            setShowFolderGallery={setShowFolderGallery}
            key={i}
          />
        ))}
      </div>
    </div>
  )
}

const FolderContainer = ({ folder, setGalleryData, setShowFolderGallery }) => (
  <div className="folder-container"
    onClick={() => {
      setShowFolderGallery(true);
      console.log("Gallery Clicked.");
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