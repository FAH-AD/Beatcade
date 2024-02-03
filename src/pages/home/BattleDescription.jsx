import { useSnapshot } from "valtio";
import state from "../../store";

export const BattleDescription = () => {
  const snap = useSnapshot(state);
  return (
    <div className="absolute w-[22vw] top-[50%] translate-y-[-50%] left-[14vw] flex flex-col ">
      <div className="flex flex-row w-[80%] justify-between text-cyan-200 text-[1.2vw] font-normal font-['Atyp Display'] leading-snug drop-shadow-[0_0_8.2px_#26FFE5]">
        <p>CREATOR</p>
        <p>#182</p>
      </div>

      <div className="text-[4.1vw] text-cyan-200 font-bold font-['Atyp Display'] leading-snug drop-shadow-[0_0_8.2px_#26FFE5]">
        DA GENIE
      </div>

      <div className="text-white text-[1.2vw] font-bold font-['Inter'] leading-2 pt-[5%]">
        Explore a galaxy of royalty-free sonics meticulously crafted by
        award-winning composers and sample makers
      </div>

      <div className="flex flex-row justify-between w-[80%] pt-[5%]">
        <div className="flex flex-col">
          <div className="text-white text-[1.2vw] font-normal font-['Inter'] leading-snug">
            Beat Score
          </div>
          <div className="h-6 text-orange-200 text-[2.3vw] font-normal font-['Atyp Display'] leading-snug drop-shadow-[0_0_8.2px_#FF6726]">
            76%
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-white text-[1.2vw] font-normal font-['Inter'] leading-snug">
            A&R Score
          </div>
          <div className="text-cyan-200 text-[2.3vw] font-normal font-['Atyp Display'] leading-snug drop-shadow-[0_0_8.2px_#26FFE5]">
            37%
          </div>
        </div>
      </div>
    </div>
  );
};
