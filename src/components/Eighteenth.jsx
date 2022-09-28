import React, { useState } from 'react';
import PageBody from './reusable/PageBody';
import Message18th from './modals/Message18th';

import './scss/Eighteenth.css';
import { motion } from 'framer-motion';
import { pageAnimationVariant } from '../pageAnimationVariant.js';

const Eighteenth = () => {

  const messageCardsData = [
    { title: "HAPPY 18TH BIRTHDAY", color: "blue", message: `You are now celebrating your 18th birthday hon! And im happy for you for what you got! Always remember lang na anjan fam mo and also me para suportahan at kausapin ka kahit kelan mo kailangan o gusto. You’ve been a great fighter and I am one of the person na naka saksi non, this is it! this is it what you’ve been waiting, the moment na maging 18 HAHAHA being at legal age is a serious thing, you now have to take sa risks or lose it. Being at legal age is not only about having fun outside and having a boyfriend/girlfriend legally, it is about your life that you need to develop for yourself. I know and I saw na you are trying your best to be the best version of yourself, I’ve been there before and now, nakita ko naman mga improvements ko na for me is not enough parin even tho mag 20 na ko. I know that you can perform your best when you are in the situation of being serious in life by yourself na malakas ka at di ka kaagad sumusuko sa problema. So ayun! Just keep developing yourself to the best!` },
    { title: "THIS IS IT LIIT!!!", color: "white", message: `THIS IS IT PANSIT LIIT AKO TO SI BOY TUSOK HAHAHAHA this is eeeet! 18th na bebi kuuu, you grow so fast ha dahan dahan lang T_T Sa edad mo ngayon dapat di ka na nagtatampo ng sobra sobra HAHA jokeee, ako nga tong mukang immatured ako palagi pinapangaralan dito pakshet. De eto na, eto na ang araw na mag 18 ka na, pinaka hinihintay natin to e, kahit may handa hon o wala, appreciate mo binigay ni Lord na mga pangyayari para sa birthday mo. Wala man si papa mo sa tabi mo ngayon, hon masaya syang nag debut ka! Masaya syang big gurl ka na, di ka na daw kailangan pang paluin pagalitan HAHA. Big gurl ka na anu na jasmen jusko lab mo lang ako ha, lalab din kita todo unli pa:*. This is it. This is the time to be serious na sa career natin, take na nating yung risks na availabe pero worth it and mga results. Keep livin!` },
    { title: "BETTER THAN YOU BELIEVE", color: "black", message: `ETO MAGANDA TO! OO IKAW MAGANDA KA, I MEAN MAGANDA TONG TOPIC NA TO HAHAHA. You are the better than what you think, than what you seem, than what you expect, and than what you believe! HAHAHA I never thought na ganon ka ka-better at the same time bitter ka joke, de paka better mo kumpara kanino para sakin kase you always keep choosing to be stronger sa mga problemana nadadaanan mo or natin. Better ka kase you always give your best para kanino kahit na di nila nababalik yung effort na binigay mo. Better ka kase napaka lawak ng imahinasyon mo para magka pangarap ng pinapangarap mo ngayon. Tipong ikaw na mismo ang may gustong tumayong pundasyon sa pamilya nyo, ang laki ng pangarap mo para kila tita mo at natutuwa ako dun. Pag nakapag tapos ka hon wag mo muna iwan si tita okay? Tulungan muna natin mga parents natin. Di ko masabing may pagkukulang ka sakin hon kase di ka naman talaga nag kulang tsaka almost perfect ka sating dalawa na tipong ako yung palaging parang tanga kase di ko alam nasasaktan na kita:( I’m sorry. Pero you always forgive me and that makes you better in my eyes than you believe. Di ako aabuso sa palagi mong pag foforgive hon, salamat, you’re the most beautiful woman came in my life next to my mother<3.` },
    { title: "I WISH YOU BEST LUCK", color: "white", message: `I know you know that in this life, di pwedeng wala kang problema na haharapin or barriers na madadaanan kahit sa family or circle of friends mo kaya always be strong para sa mga pag subok mong dadaanan kaya goodluck! Goodluck kase alam kong mahirap magiging dadaanan mong path para sa career mo at para din sa mga magulang at kapatid mo, kaya have the luck! Wag susuko, keep grinding, alam ko at naniniwala tayong ikaw mismo ang may pinaka gustong makaahon mama mo/kayo sa hirap. Meron ka nang sipag kailangan mo nalang now hon is to have luck;) Goodluck sa path mo bilang isang nurse or ano man magin gusto mong maging, di ka pa kase fully decided e HAHAHA basta dapat decided ka nang ako kasama mo tumanda okay na ko don HAHAH mawps.` },
    { title: "WELCOME TO ADULTHOOD", color: "blue", message: `Hon kahit di natin tanggapin tumatanda na talaga tayo T_T kaiyaq HAHAHHA welcome sa adulthood hon! where humans take this event as a change of their lives, change of how they are interacting, change of their behaviors, change of their choices of friends. Hon adulthood is not just knowing if your parents is agree or disagree of you getting a boyfriend lol, it is about your life as an beginner of being adult. You will learn a lot of things if you want to. Pero hon wag mong taggalin yung mga tawa tawa mo ha feeling ko nagiging 16 yrs old ako pag nababaliw tayo kakatawa sa public places HAHA di na tayo nahihiya pakshet lab ko yorn! Ayun nga! Mag bago ka kung ano para sayo at wag ka nang dedepende ng desisyon mo sa iba hon, give yourself a chance to have a decision by yourself.That is it! Welcome hon! ANG CUTE MO TANGINA NAIIMAGINE KITA HUHU I LOVE YOU!` },
  ]

  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({ title: "Title", message: "Message"});

  return (
    <React.Fragment>

      <Message18th
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        messageData={messageData}
      />

      <motion.div className="eighteenth container"
        variants={pageAnimationVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <PageBody header="18th" photoSrc="./svg/display_images/honeybunch_disp2.svg"/>

        <div className="message-card-container">
          {messageCardsData.map((data, i) =>
            <MessageCard
              title={data.title}
              color={data.color}
              message={data.message}
              setMessageData={setMessageData}
              setShowMessage={setShowMessage}
              key={i} 
            />
          )}
        </div>
      </motion.div>
    </React.Fragment>
  )
}

const MessageCard = props => {
  const { title, color, message, setMessageData, setShowMessage } = props;

  const messageData = { title, message };

  return (
    <div className={`message-card ${color}`}>
      <div className="message-head h-1">{title}</div>

      {/* <Link to="/" onClick={ () => setMessageData(messageData)}> */}
      <button className="message-button btn-text"
        onClick={ () => {
          setMessageData(messageData);
          setShowMessage(true);
        }}
      >READ</button>
      {/* </Link> */}
    </div>
  )
}

export default Eighteenth;