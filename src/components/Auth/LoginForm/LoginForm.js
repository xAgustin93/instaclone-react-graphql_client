import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user";
import { setToken, decodeToken } from "../../../utils/token";
import useAuth from "../../../hooks/useAuth";
import "./LoginForm.scss";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El emial es obligatorio"),
      password: Yup.string().required("La contraseña es obligatorio"),
    }),
    onSubmit: async (formData) => {
      setError("");
      try {
        const { data } = await login({
          variables: {
            input: formData,
          },
        });
        const { token } = data.login;
        setToken(token);
        setUser(decodeToken(token));
      } catch (error) {
        setError(error.message);
      }
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2>Entra para ver fotos y vídeos de tus amigos.</h2>
      <Form.Input
        type="text"
        placeholder="Correo electronico"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Form.Input
        type="password"
        placeholder="Contraseña"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password && true}
      />
      <Button type="submit" className="btn-submit">
        Iniciar sesión
      </Button>
      {error && <p className="submit-error">{error}</p>}
    </Form>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
