import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import * as Tone from "tone";
import state, { PAGES } from "../../store";
import { CustomButton } from "../../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../../config/motion";
import { Menu } from "./Menu";
import { Card } from "./Card";
import MyData from "../../config/data.json";
import { useEffect, useState } from "react";
import { BattleDescription } from "./BattleDescription";

const Home = () => {
  const [dropTime, setDropTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  const [currentPlayer, setCurrentPlayer] = useState(null);

  const [isPlaying, setIsPlaying] = useState({
    gold: false,
    blue: false,
    purple: false,
    green: false,
    white: false,
  });

  const imageToAudio = {
    "Gold Play": "IO.wav",
    "Purple Play": "Kerberos.wav",
    "Blue Play": "Luna.wav",
    "Green Play": "Lapetus.wav",
    "White Play": "Deimos.wav",
  };

  useEffect(() => {
    setInterval(() => {
      const tempDropTime = { day: 0, hour: 0, minute: 0, second: 0 };
      const now = new Date();

      tempDropTime.day = 6 - now.getDay();
      if (tempDropTime.day < 0) tempDropTime.day = 0;

      tempDropTime.hour = 23 - now.getHours();
      if (tempDropTime.hour < 0) tempDropTime.hour = 0;

      tempDropTime.minute = 59 - now.getMinutes();
      if (tempDropTime.minute < 0) tempDropTime.minute = 0;

      tempDropTime.second = 59 - now.getSeconds();
      if (tempDropTime.second < 0) tempDropTime.second = 0;

      setDropTime(tempDropTime);
    }, 1000);
  }, []);
  const snap = useSnapshot(state);
  const [modelState, setModelState] = useState(null, null);

  const switchMenu = () => {
    state.enableMenu = !snap.enableMenu;
  };
  const switchDisappear = () => {
    state.disappear = !snap.disappear;
  };
  const switchFullscreen = () => {
    state.fullscreen = !snap.fullscreen;
  };
  const goHomePage = () => {
    window.location = "/";
  };

  const setModelData = () => {
    console.log("kky", "setdata", snap);
    if (!snap.model || !snap.modelId) return;
    const array = MyData.products[snap.model];
    const model = array.find((el) => el.id === snap.modelId);
    if (!model) return;
    const color = MyData.colors[model.colorName];
    setModelState({
      type: snap.model,
      title: model.title,
      name: model.name,
      description: model.description,
      subDescription: model.subDescription,
      color: color,
      imgUrl: model.imgUrl,
      colorName: model.colorName,
    });
  };

  useEffect(() => {
    setModelData();
  }, [snap.modelId, snap.model]);

  // useEffect(() => {
  //   console.log("kky", modelState);
  // }, [modelState])

  const playAudio = (imageName) => {
    const audioPath = imageToAudio[imageName];

    if (audioPath) {
      if (currentPlayer) {
        currentPlayer.stop();
      }

      let player;

      player = new Tone.Player(`/sampler/MP3s/${audioPath}`).toDestination();
      player.autostart = true;
      setCurrentPlayer(player);
    } else {
      console.error("No audio mapping found for image:", imageName);
    }
  };

  const handleClick = (imageName) => {
    playAudio(imageName);
  };

  return (
    <AnimatePresence>
      <div className="absolute w-full h-full pl-[2.2vw] pr-[5.2vw] pt-[4.6vh] pb-[4.8vh] z-20 pointer-events-none">
        <div className="relative h-full ">
          <motion.div {...slideAnimation("left")}>
            <div className="absolute flex flex-row gap-[8px] items-center ">
              {/* <p className='text-white text-[60px] font-medium tracking-[20px] cursor-pointer pointer-events-auto'
                onClick={goHomePage}
              >BEATCADE™</p> */}
              <img
                className="w-[30vw] object-contain cursor-pointer pointer-events-auto"
                style={snap.fullscreen ? { opacity: 0.3 } : { opacity: 1 }}
                src="/images/logo.svg"
                alt="logo"
                onClick={goHomePage}
              />
            </div>
          </motion.div>

          <motion.div
            {...slideAnimation("up")}
            className="absolute bottom-0 flex flex-col gap-[0.5vw]"
            style={{ display: snap.fullscreen ? "none" : "flex" }}
          >
            <motion.div {...headTextAnimation}>
              <p className="text-white font-[G7 Silkworm TTF] text-[1.2vw] font-normal  tracking-[-0.36px]">
                BHaruMusic Presents
              </p>
              <p className="text-[#ADDFFF] font-[Whangarei] text-[5vw] font-normal  tracking-[-1.52px]">
                VOYAGER
              </p>
            </motion.div>

            <motion.div
              {...headContentAnimation}
              className="flex flex-row gap-[1.5vw]"
            >
              <CustomButton
                type="outline"
                title="JOIN NOW"
                // handleClick={() => state.subscribing = true}
                customStyles="outl font-bold"
                icon="trophy"
                iconPos="start"
              ></CustomButton>

              <CustomButton
                type="filled"
                title="START TOUR"
                // handleClick={() => state.page = PAGES.customize}
                customStyles="fill font-bold"
                icon="play"
                iconPos="end"
              />
            </motion.div>
          </motion.div>

          <motion.div
            {...slideAnimation("down")}
            className="absolute right-0 top-0 flex flex-row gap-[23px] items-center"
            style={{ visibility: snap.fullscreen ? "hidden" : "visible" }}
          >
            {MyData.models.map((name, index) => (
              <p
                className="text-white font-[Inter] text-[1.2vw] font-bold tracking-[-0.46px] cursor-pointer pointer-events-auto"
                style={
                  snap.model === name
                    ? { textShadow: "0px 0px 10px #B0FFFF" }
                    : {}
                }
                key={index}
                onClick={() => {
                  state.model = name;
                }}
              >
                {name}
              </p>
            ))}
            <p className="text-white font-[Inter] text-[1.2vw] font-bold tracking-[-0.46px] cursor-pointer pointer-events-auto px-[0.8vw] py-[0.3vw] border border-white rounded-[0.8vw]">
              BUILDER
            </p>
          </motion.div>

          <motion.div
            {...slideAnimation("right")}
            className="absolute right-0 bottom-0 flex flex-col gap-[1.5vw] items-end"
            style={{ display: snap.fullscreen ? "none" : "flex" }}
          >
            <div style={{ display: snap.enableMenu ? "none" : "flex" }}>
              <img
                src="/images/Xbox Controller Outline 2.png"
                alt="xbox"
                className="object-contain w-[7.4vw]"
              />
            </div>

            <p className="text-white font-[Inter] font-bold tracking-[-0.32px] text-[1.2vw]">
              Welcome to <span className="text-[#8BC5FA]">Season 1</span>
            </p>
            <p className="text-[#525252] drop-shadow-[0_3px_4px_rgba(0,0,0,0.69)] font-[Inter] text-[1vw] font-bold tracking-[-0.32px]">
              Beatcade Studios © 2023. Pre-alpha V 0.3.27
            </p>
          </motion.div>
        </div>
      </div>

      <Menu />

      <div
        className="fixed right-0 w-[3.7vw] h-full bg-black border-[#ffffff13] border z-20  pt-[5vh] pb-[12vh] px-[0.8vw] flex flex-col items-center justify-between"
        style={{
          right: snap.disappear ? "-3.7vw" : "0px",
          visibility: snap.fullscreen ? "hidden" : "visible",
        }}
      >
        <div className="flex flex-col h-[30vh] justify-between">
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/menu-01.png"
            onClick={switchMenu}
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/flash.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer w-[32px] h-[33.907px]"
            src="/images/menu-icons/bell-03.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/user-01.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/heart.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain cursor-pointer"
            src="/images/menu-icons/search-md.png"
            alt="menu"
          />
        </div>

        <div className="h-[12vh]"></div>

        <div className="flex flex-col h-[6vh] items-center justify-between">
          <img
            className="w-[4vw] max-w-none"
            src="/images/menu-icons/chevron-right.png"
            alt="menu"
          />
          <p className="text-white font-[Inter] text-[1vw] font-bold tracking-[-0.7px]">
            1/3
          </p>
        </div>

        <div className="h-[11vh]"></div>

        <div className="flex flex-col h-[7vh] justify-between">
          <img
            className="w-[30px] object-contain"
            src="/images/menu-icons/recording-03.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain"
            src="/images/menu-icons/camera-01.png"
            alt="menu"
          />
        </div>

        <div className="h-[9vh]"></div>

        <div className="flex flex-col h-[13vh] justify-between">
          <img
            className="w-[30px] object-contain"
            src="/images/menu-icons/Discord Icon SVG 1.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain"
            src="/images/menu-icons/message-chat-circle.png"
            alt="menu"
          />
          <img
            className="w-[30px] object-contain w-[32px] h-[33.907px]"
            src="/images/menu-icons/settings-01.png"
            alt="menu"
          />
        </div>
      </div>

      <div
        className="absolute flex flex-col right-0 bottom-0 z-30 w-[3.7vw] h-[8vh] items-center justify-between px-[0.8vw] pb-[1vh]"
        style={snap.fullscreen ? { opacity: 0.5 } : { opacity: 1 }}
      >
        <img
          className="w-[30px] object-contain aspect-square cursor-pointer"
          // src={snap.fullscreen ? '/images/menu-icons/fullscreen-close.png' : '/images/menu-icons/fullscreen-open.png'}
          src="/images/menu-icons/maximize-01.png"
          alt="fullscreen"
          onClick={switchFullscreen}
        />
        <img
          className="w-[30px] object-contain cursor-pointer aspect-square"
          src={
            snap.disappear
              ? "/images/menu-icons/collapse-left.png"
              : "/images/menu-icons/collapse-right.png"
          }
          alt="disappear"
          onClick={switchDisappear}
        />
      </div>

      <div className="absolute flex flex-col left-[50%] translate-x-[-50%] bottom-[64px] items-center">
        <p className="text-[#ADDFFF] text-[36px] font-[Whangarei] font-normal tracking-[-0.72px] leading-[22px] uppercase">
          Next Drop
        </p>
        \
        <p className="text-[#fff] text-[23px] font-normal tracking-[-0.46px] leading-[22px] ==">
          {dropTime.day}d {dropTime.hour}h {dropTime.minute}m {dropTime.second}s
        </p>
      </div>

      {(snap.model === "Packs" || snap.model === "Machines") && (
        <div className="absolute flex flex-col left-[12px] top-[43%] translate-y-[-50%] items-center z-40">
          <img
            className="w-[6vh] cursor-pointer"
            src="/images/icon/Gold Play.png"
            alt="Gold Play"
            onClick={() => handleClick("Gold Play")}
          />
          <img
            className="w-[6vh] cursor-pointer"
            src="/images/icon/Purple Play.png"
            alt="Purple Play"
            onClick={() => handleClick("Purple Play")}
          />
          <img
            className="w-[6vh] cursor-pointer"
            src="/images/icon/Blue Play.png"
            alt="Blue Play"
            onClick={() => handleClick("Blue Play")}
          />
          <img
            className="w-[6vh] cursor-pointer"
            src="/images/icon/Green Play.png"
            alt="Green Play"
            onClick={() => handleClick("Green Play")}
          />
          <img
            className="w-[6vh] cursor-pointer"
            src="/images/icon/White Play.png"
            alt="White Play"
            onClick={() => handleClick("White Play")}
          />

          {modelState && (
            <Card
              name={modelState.name}
              colorName={modelState.colorName}
              imgUrl={modelState.imgUrl}
              customClass={"scale-[0.5]"}
            />
          )}
        </div>
      )}

      {snap.model === "Packs" && snap.enableMenu === false && modelState && (
        <div className="absolute flex flex-col left-[55vw] top-[25vh] xl:top-[30vh] w-[34vw] xl:w-[27vw] gap-[10px]">
          <p
            className={`font-[Whangarei] text-[36px] font-normal tracking-[-0.72px] leading-[22px]`}
            style={{ color: modelState.color }}
          >
            {modelState.title}
          </p>
          <p
            className={`font-[Whangarei] text-[77px] lg:text-[80px] xl:text-[96px] font-normal tracking-[-1.92px] leading-[70px] uppercase`}
            style={{ color: modelState.color }}
          >
            {modelState.name}{" "}
          </p>
          <p className="text-white font-[Inter] text-[12px] lg:text-[14px] xl:text-[23px] font-bold tracking-[-0.46px] leading-[28px]">
            {modelState.description}
          </p>
          <p className="text-white font-[Inter] text-[12px] xl:text-[17px] font-bold tracking-[-0.34px] leading-[28px]">
            {modelState.subDescription}
          </p>
        </div>
      )}

      {snap.model === "Battles" && <BattleDescription />}
    </AnimatePresence>
  );
};

export default Home;
