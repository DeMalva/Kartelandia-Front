import { Container } from "semantic-ui-react";
import styles from "./Info.module.scss";

export function Info(props) {
  const { poster } = props;

  return (
    <Container className={styles.info}>
      <div className={styles.description}>
        <p>{poster.description}</p>
      </div>

      <div className={styles.more}>
        <ul>
          <li>
            <span>Pelicula estrenada en </span> {poster.release}
          </li>
        </ul>
      </div>
    </Container>
  );
}
