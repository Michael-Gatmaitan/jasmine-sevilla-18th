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

import './mixins.css';

const App = () => {
  const location = useLocation();

  const [showSideBar, setShowSideBar] = useState(false);
  
  return (
    <React.Fragment>

      <SideBar
        showSideBar={ showSideBar }
        setShowSideBar={ setShowSideBar }
      />

      <Nav setShowSideBar={ setShowSideBar } />


      <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/18th" element={<Eighteenth />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </AnimatePresence>

      <QuoteFooter />
    </React.Fragment>
  );
}

export default App;