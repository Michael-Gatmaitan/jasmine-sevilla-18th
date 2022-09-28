const pageAnimationVariant = {
  hidden: {
    opacity: 0,
    y: '-10vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.7, duration: 0.6, ease: "easeOut" }
  },

  exit: {
    y: '-10vh',
    opacity: 0,
    transition: { ease: "easeIn" }
  }
};

export { pageAnimationVariant };