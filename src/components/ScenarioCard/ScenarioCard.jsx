import styles from './ScenarioCard.module.css';

export default function ScenarioCard({ stepNumber, situation, feedback }) {
  return (
    <div className={styles.card}>
      <span className={styles.step}>Крок {stepNumber}</span>
      <p className={styles.situation}>{situation}</p>

      {feedback && (
        <div className={styles.feedback}>
          <span className={styles.feedbackIcon}>💡</span>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
