import styles from "./Discount.module.scss";
import classNames from "classnames";

export function Discount(props) {
  const { children, classNames } = props;
  return (
    <span
    //className={classNames(styles.labelDiscount, { [className]: className })}
    >
      {children}
    </span>
  );
}
