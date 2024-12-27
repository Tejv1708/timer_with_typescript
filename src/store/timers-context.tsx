import { createContext, ReactNode, useContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};
const TimersContext = createContext<TimersContextValue | null>(null);

// ! We can call the hooks inside the hooks or in component only
export function useTimersContext() {
  const timersCtx = useContext(TimersContext);

  if (timersCtx === null) {
    throw new Error("TimerContext  is null - that should not be the case");
  }
  return timersCtx;
}

type TimersContextProviderProps = {
  children: ReactNode;
};

type StartTimersAction = {
  type: "START_TIMER";
};

type StopTimersAction = {
  type: "STOP_TIMERS";
};

type AddTimerAction = {
  type: "ADD_TIMERS";
  payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

function timersReducer(state: TimersState, action: Action): TimersState {
  if (action.type === "START_TIMER") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === "STOP_TIMERS") {
    return {
      ...state,
      isRunning: false,
    };
  }

  if (action.type === "ADD_TIMERS") {
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload.name,
          duration: action.payload.duration,
        },
      ],
    };
  }
  return state;
}

// * Object literal may only specify known properties, and 'addTimer' does not exist in type 'TimersState'!
export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);
  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD_TIMERS", payload: timerData });
    },
    startTimer() {
      dispatch({ type: "START_TIMER" });
    },
    stopTimer() {
      dispatch({ type: "STOP_TIMERS" });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
