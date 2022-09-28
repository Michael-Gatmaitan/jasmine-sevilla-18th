import React from 'react';
import PageBody from './reusable/PageBody';
import { Link } from 'react-router-dom';
import { data } from '../imageData.js';
import { motion } from 'framer-motion';
import { pageAnimationVariant } from '../pageAnimationVariant';

import './scss/Gallery.css';

const Gallery = () => {
  return (
    <motion.div className="gallery container"
      variants={pageAnimationVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PageBody header="Gallery" photoSrc="./svg/display_images/honeybunch_disp4.svg"/>

      <div className="folder-grid">
        <div className="folder-section explore">
          <div className="h-1">Explore</div>

          <div className="folder-block">
            <Link to="/*"></Link>
          </div>

        </div>

        <div className="folder-section memories">
          <div className="h-1">Memories</div>
          
        </div>
      </div>
    </motion.div>
  )
}

export default Gallery;