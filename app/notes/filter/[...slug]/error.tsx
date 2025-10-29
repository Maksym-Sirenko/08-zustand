'use client';

import css from './error.module.css';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  return (
    <>
      <div className={css.container}>
        <p className={css.text} role="alert">
          Could not fetch the list of notes. {error.message}
        </p>
        <button className={css.button} onClick={reset}>
          <b>Try again</b>
        </button>
      </div>
    </>
  );
};

export default Error;
