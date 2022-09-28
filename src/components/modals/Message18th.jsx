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
      ponterEvents: "none"
    },

    animate: {
      opacity: 1,
      pointerEvents: "auto",
      transition: { duration: .5 }
    },

    exit: {
      opacity: 0,
      pointerEvents: "none"
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