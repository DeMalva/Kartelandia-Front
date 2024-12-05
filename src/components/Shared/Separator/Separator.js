//Creamos un componente para separar que como lo utilizaremos
//en mas sitios lo convertimos en un componente

export function Separator(props) {
  const { height } = props;

  return <div style={{ height }} />;
}
