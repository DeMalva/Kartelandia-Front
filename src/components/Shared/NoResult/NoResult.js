import styles from "./NoResult.module.scss";

// Este componente sirve para mostrar un mensaje si no hay resultado en
// las busquedas
export function NoResult(props) {
  const { text } = props;

  return (
    <div className={styles.noResult}>
      <p>{text}</p>
    </div>
  );
}
