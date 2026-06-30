import styles from '../styles/PromotionDialog.module.css';

type PromotionDialogProps = {
  isOpen: boolean;
  color: 'w' | 'b' | null;
  onSelect: (promotion: 'q' | 'r' | 'n' | 'b') => void;
};

function PromotionDialog({ isOpen, color, onSelect }: PromotionDialogProps) {
  if (!isOpen) {
    return null;
  }

  const colorLabel = color === 'w' ? 'white' : color === 'b' ? 'black' : 'the';

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Promotion choice">
      <div className={styles.dialog}>
        <h2>Choose a promotion piece</h2>
        <p>{colorLabel} pawn reached the last rank.</p>
        <div className={styles.options}>
          <button type="button" className={styles.optionButton} onClick={() => onSelect('q')}>
            Queen
          </button>
          <button type="button" className={styles.optionButton} onClick={() => onSelect('r')}>
            Rook
          </button>
          <button type="button" className={styles.optionButton} onClick={() => onSelect('b')}>
            Bishop
          </button>
          <button type="button" className={styles.optionButton} onClick={() => onSelect('n')}>
            Knight
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromotionDialog;
