import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import './scss/SideBar.css';

const SideBar = props => {

  const {
    showSideBar,
    setShowSideBar
  } = props;

  const buttons = [{
    label: "Home",
    path: "/",
    id: 1
  }, {
    label: "18th",
    path: "/18th",
    id: 2
  }, {
    label: "Gallery",
    path: "/gallery",
    id: 3
  }, {
    label: "About",
    path: "/about",
    id: 4
  }];
  
  const { pathname } = useLocation();

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.2,
        delay: 0.2
      }
    },

    exit: {
      opacity: 0
    }
  };

  const item = {
    hidden: { y: '20px', opacity: 0 },
    show: { y: 0, opacity: 1, default: { ease: "linear" }}
  };

  return (
    <AnimatePresence>
      {showSideBar && (
        <motion.div className="sidebar"
          variants={variant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
        
          <div className="sidebar-nav">
            <div className="close" onClick={ () => setShowSideBar(false) }>
              <img src="./svg/icons/close_black.svg" alt="close" />
            </div>

            <div className="logo">
              <img src="./svg/icons/jm_black.svg" alt="logo" />
            </div>

            <div>
            </div>
          </div>

          <motion.div className="sidebar-buttons"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {buttons.map(btn => {
              const { label, path, id } = btn;
              let activeButton;
              if (pathname.includes('/18th')) activeButton = "18th";
              else if (pathname.includes('/gallery')) activeButton = "Gallery";
              else if (pathname.includes('/about')) activeButton = "About";
              else activeButton = "Home";

              return (
                <Link to={`${path}`} key={id}>
                  <motion.button
                    className={`sidebar-button h-1${activeButton === label ? " active-button" : ""}`}
                    onClick={ () => setShowSideBar(false) }
                    variants={item}
                  >
                    {label}
                  </motion.button> 
                </Link>
              )
            })}
          </motion.div>

          <div className="profile-container">
            <div className="profile-border">
              <div className="profile">
                <img src="./svg/profile_picture.png" alt="profile" />
              </div>
            </div>

            <div className="profile-info">
              <div className="profile-label">Designed & Developed by</div>
              <div className="profile-name">Michael Gatmaitan</div>
            </div>
          </div>

        </motion.div>
      )}



    </AnimatePresence>
  )
}

export default SideBar;