import styles from '../styles/ControlPanel.module.css';

type ControlPanelProps = {
  onRestart: () => void;
};

function ControlPanel({ onRestart }: ControlPanelProps) {
  return (
    <div className={styles.controlCard}>
      <h2>Controls</h2>
      <p>Reset the board to the standard starting position at any time.</p>
      <button type="button" className={styles.controlButton} onClick={onRestart}>
        Restart
      </button>
    </div>
  );
}

export default ControlPanel;
