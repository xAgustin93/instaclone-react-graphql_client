import React from "react";
import { Form, TextArea, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./DescriptionForm.scss";

export default function DescriptionForm(props) {
  const { setShowModal, currentDescription, refetch } = props;
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      description: currentDescription || "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualziar tu biografía");
      }
    },
  });

  return (
    <Form className="description-form" onSubmit={formik.handleSubmit}>
      <TextArea
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        className={formik.errors.description && "error"}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
