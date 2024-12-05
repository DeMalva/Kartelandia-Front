import { Basket } from "./Basket";
import { Resume } from "./Resume";
import styles from "./StepOne.module.scss";

export function StepOne(props) {
  const { posters } = props;

  return (
    <div className={styles.stepOne}>
      <div className={styles.center}>
        <Basket posters={posters} />
      </div>
      <div className={styles.right}>
        <Resume posters={posters} />
      </div>
    </div>
  );
}
