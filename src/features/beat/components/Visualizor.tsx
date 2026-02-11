import { css } from "../../../../styled-system/css";
import { TimeSignatureSelector } from "./TimeSignatureSelector";
import DivisionControl from "./DivisionControl";
import { TouchPad } from "./TouchPad";
import { VolumeSlider } from "../../metronome/components/VolumeSlider";
import { BpmSlider } from "../../metronome/components/BpmSlider";
import { PlayButton } from "../../metronome/components/PlayButton";
import { BpmDisplay } from "../../metronome/components/BpmDisplay";

export const Visualizor = () => {
  // --- 拍の管理 ---


  return (
    <div
      className={css({
        display: "grid",
        gridTemplateRows:
          "auto auto auto 1fr auto auto",
        gap: 4,
        h: "full",
        maxW: "400px",
        w: "full",
        justifySelf: "center",
      })}
    >
      {/* Row 1: BPM Display */}
      <BpmDisplay />

      {/* Row 2: Beat Circles */}
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          justifyItems: "center",
          w: "full",
        })}
      >
      </div>

      {/* Row 3: Selectors (4/4 | ♪) */}
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          color: "lamp",
        })}
      >
        <TimeSignatureSelector />
        <span
          className={css({
            fontSize: "3xl",
            color: "lamp-dim",
          })}
        >
          |
        </span>
        <DivisionControl />
      </div>

      {/* Row 4: TouchPad + VolumeSlider */}
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 3,
          alignItems: "stretch",
        })}
      >
        <TouchPad />
        <VolumeSlider />
      </div>

      {/* Row 5: BPM Slider */}
      <BpmSlider />

      {/* Row 6: Play Button */}
      <PlayButton />
    </div>
  );
};
