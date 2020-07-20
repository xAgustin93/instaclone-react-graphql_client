import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./PasswordForm.scss";

export default function PasswordForm(props) {
  const { logout } = props;
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatNewPassoword")]),
      repeatNewPassoword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: async (formValues) => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              currentPassword: formValues.currentPassword,
              newPassword: formValues.newPassword,
            },
          },
        });

        if (!result.data.updateUser) {
          toast.error("Error al cambiar la contraseña");
        } else {
          logout();
        }
      } catch (error) {
        toast.error("Error al cambiar la contraseña");
      }
    },
  });

  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        placeholder="Contraseña actual"
        name="currentPassword"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Nueva contraseña"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Repetir nueva contraseña"
        name="repeatNewPassoword"
        value={formik.values.repeatNewPassoword}
        onChange={formik.handleChange}
        error={formik.errors.repeatNewPassoword && true}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}

function initialValues() {
  return {
    currentPassword: "",
    newPassword: "",
    repeatNewPassoword: "",
  };
}
