import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext.jsx';
import { useScenario } from '../../hooks/useScenario.js';
import OutcomeScreen from '../../components/OutcomeScreen/OutcomeScreen.jsx';

export default function ResultPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const scenario = useScenario(state.scenarioId);

  if (!scenario || !state.outcome) {
    navigate('/');
    return null;
  }

  const outcomeData = scenario.outcomes[state.outcome];
  const maxScore = scenario.steps.reduce((acc, step) => {
    const best = Math.max(...step.choices.map((c) => c.points));
    return acc + best;
  }, 0);

  function handleRestart() {
    dispatch({ type: 'RESET' });
    navigate('/');
  }

  function handleRetry() {
    dispatch({
      type: 'START_SCENARIO',
      scenarioId: scenario.id,
      firstStepId: scenario.firstStepId,
    });
    navigate(`/game/${scenario.id}`);
  }

  return (
    <OutcomeScreen
      outcome={state.outcome}
      outcomeData={outcomeData}
      score={state.score}
      maxScore={maxScore}
      history={state.history}
      onRetry={handleRetry}
      onHome={handleRestart}
    />
  );
}
