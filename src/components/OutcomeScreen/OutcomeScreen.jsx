import styles from './OutcomeScreen.module.css';

export default function OutcomeScreen({ outcome, outcomeData, score, maxScore, onRetry, onHome }) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const isSuccess = outcome === 'success';

  return (
    <div className={`${styles.page} ${isSuccess ? styles.success : styles.failure}`}>
      <div className={styles.card}>
        <span className={styles.emoji}>{outcomeData.emoji}</span>
        <h1 className={styles.title}>{outcomeData.title}</h1>
        <p className={styles.description}>{outcomeData.description}</p>

        <div className={styles.scoreBlock}>
          <span className={styles.scoreLabel}>Твій результат</span>
          <span className={styles.scoreValue}>{score} / {maxScore}</span>
          <div className={styles.scoreBar}>
            <div
              className={styles.scoreFill}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className={styles.scorePct}>{pct}%</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnRetry} onClick={onRetry}>
            Спробувати ще раз
          </button>
          <button className={styles.btnHome} onClick={onHome}>
            До списку сценаріїв
          </button>
        </div>
      </div>
    </div>
  );
}
