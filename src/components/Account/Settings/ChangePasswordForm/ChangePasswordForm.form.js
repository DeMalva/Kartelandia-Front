import * as Yup from "yup";

//Validamos la contraseña con yup
export function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required(true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true), // Queremos que las contraseñas sean iguales
  });
}
