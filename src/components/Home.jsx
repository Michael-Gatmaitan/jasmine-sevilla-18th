import React from 'react';
import PageBody from './reusable/PageBody';
import './scss/Home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageAnimationVariant } from '../pageAnimationVariant.js';

const Home = () => {
  
  const pageCardData = [
    {
      pageCardHead: "18th",
      pageCardText: "Happy 18th birthday Jasmine Sevilla! Enjoy the day and always take carer of yourself hon! I wish you more birthday to come&lt;3 Big girl ka na huhuhu I love you!",
      pageCardImage: "./svg/block_display/block_display_1.png",
      pageCardLinkto: "/18th",
      bgColor: "#5666F5"
    },
    {
      pageCardHead: "Gallery",
      pageCardText: "Go and see our kagaguhans and your personal gallery as well. Ang ganda natin sa mga pics natin huhu dagdagan pa natin yan! Paka ganda mo gage pakiss ako ha, kundi wala ka nang poging boypren.",
      pageCardImage: "./svg/block_display/block_display_2.png",
      pageCardLinkto: "/gallery",
      bgColor: "#262626"
    }
  ];

  return (
    <motion.div className="home container"
      variants={pageAnimationVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >

      <PageBody
        header="Jasmine Braga Sevilla @18"
        photoSrc="./svg/display_images/honeybunch_disp1.svg"
      />

      <div className="welcome-section">
        <div className="welcome-head h-2">WAAAAH!</div>
        <div className="welcom-text body-text">
          18 kana ang liit mo parin HAHAHAHAHA enjoy your day hon! I’m so proud of you! Never stop growing ha kase nga ang liit mo. I love you &lt;3 Stay safe always hon! I’m always herer lang for you hehe pakyu.

          Please appreciate this little effort hon!
          Thank you!!!!!!
        </div>

        <div className="welcome-images">

          <div className="image-container">
            <img src="/our_data/special_memories/simple_images/pictures/flower.jpg" alt="flower" />
          </div>

          <div className="image-container">
            <img src="/our_data/special_memories/simple_images/pictures/received_1104838777077504.jpeg" alt="us_stickfigure_version" />
          </div>

        </div>
      </div>

      <div className="card-of-pages">
        <PageCard data={pageCardData[0]} />
        <PageCard data={pageCardData[1]} />

      </div>

    </motion.div>
  );
}

const PageCard = ({data}) => {
  const {
    pageCardHead,
    pageCardText,
    pageCardImage,
    pageCardLinkto,
    bgColor
  } = data;

  return (
    <div className="page-card">

      <div className="page-card-bg" style={{ backgroundColor: bgColor }} />

      <div className="page-card-info">
        <div className="page-card-head h-1">{pageCardHead}</div>

        <div className="page-card-text body-text">
          {pageCardText}
        </div>

        <Link to={pageCardLinkto}>
          <button className="page-card-button">{pageCardHead}</button>
        </Link>
      </div>

      <div className="page-card-image">
        <img src={pageCardImage} alt="page-card" />
      </div>

    </div>
  )
}

export default Home;