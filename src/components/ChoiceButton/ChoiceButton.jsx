import styles from './ChoiceButton.module.css';

export default function ChoiceButton({ choice, onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      <span className={styles.text}>{choice.text}</span>
      <span className={styles.arrow}>→</span>
    </button>
  );
}
