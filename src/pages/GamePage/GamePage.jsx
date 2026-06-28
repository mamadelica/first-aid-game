import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext.jsx';
import { useScenario, useStep } from '../../hooks/useScenario.js';
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx';
import ScenarioCard from '../../components/ScenarioCard/ScenarioCard.jsx';
import ChoiceButton from '../../components/ChoiceButton/ChoiceButton.jsx';
import styles from './GamePage.module.css';

export default function GamePage() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const scenario = useScenario(scenarioId);
  const currentStep = useStep(scenario, state.currentStepId);

  useEffect(() => {
    if (!state.scenarioId) {
      navigate('/');
    }
  }, [state.scenarioId, navigate]);

  useEffect(() => {
    if (state.outcome && !state.feedback) {
      navigate('/result');
    }
  }, [state.outcome, state.feedback, navigate]);

  if (!scenario || !currentStep) return null;

  function handleChoice(choice) {
    const isOutcome = choice.nextStepId.startsWith('outcome-');
    dispatch({
      type: 'MAKE_CHOICE',
      choiceId: choice.id,
      isCorrect: choice.isCorrect,
      points: choice.points,
      feedback: choice.feedback,
      nextStepId: isOutcome ? null : choice.nextStepId,
      outcome: isOutcome
        ? (choice.nextStepId === 'outcome-success' ? 'success' : 'failure')
        : null,
    });
  }

  function handleContinue() {
    if (state.outcome) {
      navigate('/result');
    } else {
      dispatch({ type: 'ADVANCE_STEP' });
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Назад</button>
        <span className={styles.scenarioTitle}>
          {scenario.icon} {scenario.title}
        </span>
        <span className={styles.score}>★ {state.score}</span>
      </header>

      <ProgressBar
        current={currentStep.stepNumber}
        total={currentStep.totalSteps}
      />

      <main className={styles.main}>
        <ScenarioCard
          situation={currentStep.situation}
          feedback={state.feedback}
        />

        <div className={styles.choices}>
          {state.feedback ? (
            <button className={styles.continueBtn} onClick={handleContinue}>
              {state.outcome ? 'Переглянути результат →' : 'Далі →'}
            </button>
          ) : (
            currentStep.choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                onClick={() => handleChoice(choice)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
