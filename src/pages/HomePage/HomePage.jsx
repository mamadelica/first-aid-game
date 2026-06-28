import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext.jsx';
import { useAllScenarios } from '../../hooks/useScenario.js';
import styles from './HomePage.module.css';

const DIFFICULTY_LABEL = {
  easy: 'Легкий',
  medium: 'Середній',
  hard: 'Складний',
};

export default function HomePage() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const scenarios = useAllScenarios();

  function handleStart(scenario) {
    dispatch({
      type: 'START_SCENARIO',
      scenarioId: scenario.id,
      firstStepId: scenario.firstStepId,
    });
    navigate(`/game/${scenario.id}`);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Політравма</h1>
        <p className={styles.subtitle}>
          Навчальна гра з першої допомоги: чи зможеш ти врятувати людину?
        </p>
      </header>

      <main className={styles.scenarios}>
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            className={styles.card}
            onClick={() => handleStart(scenario)}
          >
            <span className={styles.cardIcon}>{scenario.icon}</span>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>{scenario.title}</h2>
              <p className={styles.cardDesc}>{scenario.description}</p>
              <span className={`${styles.badge} ${styles[`badge--${scenario.difficulty}`]}`}>
                {DIFFICULTY_LABEL[scenario.difficulty]}
              </span>
            </div>
            <span className={styles.cardArrow}>→</span>
          </button>
        ))}
      </main>

      <footer className={styles.footer}>
        <p>Гра створена в освітніх цілях. Не замінює курси з першої допомоги.</p>
        <a
          className={styles.credit}
          href="https://github.com/mamadelica"
          target="_blank"
          rel="noopener noreferrer"
        >
          developed by mamadelica
        </a>
      </footer>
    </div>
  );
}
