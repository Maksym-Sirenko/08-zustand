'use client';

import css from './error.module.css';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorMessage = ({ error, reset }: Props) => {
  return (
    <div className={css.container}>
      <p className={css.text} role="alert">
        Could not fetch note details. {error.message}
      </p>
      <button className={css.button} onClick={reset}>
        <b>Try again</b>
      </button>
    </div>
  );
};

export default ErrorMessage;
