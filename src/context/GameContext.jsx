import { createContext, useContext, useReducer } from 'react';

const GameContext = createContext(null);

const initialState = {
  scenarioId: null,
  currentStepId: null,
  history: [],       // [{stepId, choiceId, isCorrect}]
  score: 0,
  outcome: null,     // 'success' | 'failure' | null
  feedback: null,    // feedback text shown after a choice
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'START_SCENARIO':
      return {
        ...initialState,
        scenarioId: action.scenarioId,
        currentStepId: action.firstStepId,
      };

    case 'MAKE_CHOICE':
      return {
        ...state,
        history: [...state.history, {
          stepId: state.currentStepId,
          choiceId: action.choiceId,
          isCorrect: action.isCorrect,
        }],
        score: state.score + (action.isCorrect ? action.points : 0),
        currentStepId: action.nextStepId,
        feedback: action.feedback,
        outcome: action.outcome ?? null,
      };

    case 'CLEAR_FEEDBACK':
      return { ...state, feedback: null };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
