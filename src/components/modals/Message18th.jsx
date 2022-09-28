import React from 'react';
import ModalNav from './ModalNav';
import { motion, AnimatePresence } from 'framer-motion';
import './Message18th.css';

const Message18th = (props) => {

  const {
    showMessage,
    setShowMessage,
    messageData
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
      {showMessage && (
        <motion.div className="message-18th"
          variants={variant}
          initial="initial"
          animate="animate"
          exit="exit"
        >

          <ModalNav setShowMessage={setShowMessage} />
          
          <div className="message-container">
            <div className="message-header h-1">{messageData.title}</div>
            <div className="message-body body-text">{messageData.message}</div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Message18th;