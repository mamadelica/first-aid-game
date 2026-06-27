import styles from './ChoiceButton.module.css';

export default function ChoiceButton({ choice, onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {choice.text}
    </button>
  );
}
