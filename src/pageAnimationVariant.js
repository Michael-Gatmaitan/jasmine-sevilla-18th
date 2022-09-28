const pageAnimationVariant = {
  hidden: {
    opacity: 0,
    y: '-10vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.6, duration: 0.5, ease: "easeOut" }
  },

  exit: {
    y: '-10vh',
    opacity: 0,
    transition: { ease: "easeIn" }
  }
};

export { pageAnimationVariant };