import { css } from "../styled-system/css";
import { Visualizor } from "./features/beat/components/Visualizor";
import { BpmDisplay } from "./features/metronome/components/BpmDisplay";

const App = () => {
  return (
    <div
      className={css({
        display: "grid",
        alignItems: "start",
      })}
    >
      <BpmDisplay />
      <Visualizor />
    </div>
  );
};

export default App;
