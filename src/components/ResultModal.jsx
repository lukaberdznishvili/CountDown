import { forwardRef, useImperativeHandle, useRef } from 'react';
const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
  const dialog = useRef();

  const userLost = targetTime <= 0;
  const formatedRemainingTime = (remainingTime / 1000).toFixed(2);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost</h2>}
      <p>The target time was {targetTime} seconds.</p>
      <p>
        You stoped timer with <strong>{formatedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});
export default ResultModal;
