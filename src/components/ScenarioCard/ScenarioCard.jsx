import styles from './ScenarioCard.module.css';

export default function ScenarioCard({ situation, feedback, isCorrect }) {
  return (
    <div className={styles.card}>
      <p className={styles.situation}>{situation}</p>

      {feedback && (
        <div
          className={`${styles.feedback} ${
            isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
          }`}
        >
          <span className={styles.feedbackIcon}>{isCorrect ? '✅' : '⚠️'}</span>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
