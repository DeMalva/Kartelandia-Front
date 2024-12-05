import { Confirm as ConfirmSU } from "semantic-ui-react";

// ...rest son todos los props no controlados
export function Confirm(props) {
  const { ...rest } = props;

  return <ConfirmSU className="confirm" size="mini" {...rest} />;
}
