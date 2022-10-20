// Module imports
import React, { useState } from 'react';
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// UI imports
import SideBar from './components/SideBar';
import Nav from './components/Nav';
import Home from './components/Home';
import Eighteenth from './components/Eighteenth';
import Gallery from './components/Gallery';
import QuoteFooter from './components/QuoteFooter';
import FolderGallery from './components/modals/FolderGallery';
import './mixins.css';

const App = () => {
  const location = useLocation();

  const [showSideBar, setShowSideBar] = useState(false);

  const [galleryData, setGalleryData] = useState({
    "folderTitle": "",
    "paths": {
      "pictures": "",
      "videos": "",
    },

    "files": {
      "pictures": [],
      "videos": [],
    }
  });
  
  return (
    <React.Fragment>

      <SideBar
        showSideBar={ showSideBar }
        setShowSideBar={ setShowSideBar }
      />

      <Nav setShowSideBar={ setShowSideBar } />


      <AnimatePresence>
        <Routes location={location} key={location.key}>

          <Route path="/gallery">
            <Route
              index
              element={ <Gallery setGalleryData={setGalleryData}/> }
            />
            
            <Route path=":galleryId" element={<FolderGallery galleryData={galleryData} />} />
          </Route>

          <Route path="/18th" element={<Eighteenth />} />
          <Route exact path="/" element={<Home />} />

          {/* Use react-router's v5 intead of v6 */}
          {/* Nested Routing *Experimental* */}
        </Routes>
      </AnimatePresence>

      <QuoteFooter />
    </React.Fragment>
  );
}

// const GalleryFolderExample = ({ galleryData }) => {
//   // const { galleryId } = useParams();
//   const { folderTitle } = galleryData;

//   return (
//     <div>ASD{folderTitle}</div>
//   )
// }

export default App;