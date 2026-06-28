import styles from './ScenarioCard.module.css';

export default function ScenarioCard({ situation, feedback }) {
  return (
    <div className={styles.card}>
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
