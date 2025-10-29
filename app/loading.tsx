import css from './loading.module.css';

const Loading = () => {
  return (
    <div className={css.container}>
      <div className={css.loader}>
        <div className={css.dot}></div>
        <div className={css.dot}></div>
        <div className={css.dot}></div>
      </div>
      <p className={css.text}>Loading notes...</p>
    </div>
  );
};

export default Loading;
