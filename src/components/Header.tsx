import Button from "./UI/Button";
import { useTimersContext } from "../store/timers-context";

const Header = () => {
  const timersCtx = useTimersContext();

  //   if (timersCtx === null) {
  //     throw new Error("Something went wrong ");
  //   }

  return (
    <div>
      <h1>ReactTimer</h1>
      <Button
        onClick={
          timersCtx.isRunning ? timersCtx.stopTimer : timersCtx.startTimer
        }
      >
        {timersCtx.isRunning ? "Stop" : "Start"} Timers
      </Button>
    </div>
  );
};

export default Header;
