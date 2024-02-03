import { useSnapshot } from "valtio";
import state from "../../store";
import { Card } from "./Card";

import MyData from "../../config/data.json";

export const Menu = () => {
  const snap = useSnapshot(state);
  return (
    <div
      // className='absolute right-0 h-full border-[#ffffff13] border z-10 transition-all duration-1000'
      className="absolute right-0 h-full border-[#ffffff13] border z-20 overflow-y-scroll"
      style={{
        width: snap.enableMenu ? "40vw" : "0px",
        background:
          "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,1) 100%)",
        display: snap.fullscreen ? "none" : "flex",
      }}
    >
      <div
        className="relative w-full pt-[130px] pr-[107px] pb-[205px] pl-[40px] flex flex-col gap-[34px]"
        style={{ visibility: snap.enableMenu ? "visible" : "hidden" }}
      >
        <div className="w-full h-[30px] flex flex-row items-center gap-[29px] text-white font-[Inter] text-[23px] font-bold tracking-[-0.46px]">
          <p>All</p>
          <p>VOYAGER</p>
          {/* <p className='font-[Whangarei] font-normal tracking-[-0.56px] text-[28px] text-[#B0FFFF] drop-shadow-lg'>TANIWHA</p> */}
          <p
            className="font-[Whangarei] font-normal h-fit tracking-[-0.56px] text-[35px] text-[#B0FFFF]"
            style={{ textShadow: "0px 0px 10px #B0FFFF" }}
          >
            TANIWHA
          </p>
        </div>
        <div className="w-full grid grid-cols-3 gap-x-[70px] gap-y-10">
          {snap.model &&
            MyData.products[snap.model].map((product, index) => {
              return (
                <Card
                  name={product.name}
                  colorName={product.colorName}
                  imgUrl={product.imgUrl}
                  key={index}
                  isSelected={product.id === snap.modelId}
                  onClickProps={() => {
                    state.modelId = product.id;
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};