import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";
import SiteWebForm from "../SiteWebForm";
import "./SettignsForm.scss";

export default function SettignsForm(props) {
  const {
    setShowModal,
    setTitleModal,
    setChildrenModal,
    getUser,
    refetch,
  } = props;
  const history = useHistory();
  const client = useApolloClient();
  const { logout } = useAuth();

  const onChangePassoword = () => {
    setTitleModal("Cambiar tu contraseña");
    setChildrenModal(<PasswordForm logout={onLogout} />);
  };

  const onChangeEmail = () => {
    setTitleModal("Cambiar email");
    setChildrenModal(
      <EmailForm
        setShowModal={setShowModal}
        currentEmail={getUser.email}
        refetch={refetch}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Actualizar tu biografía");
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={getUser.description}
        refetch={refetch}
      />
    );
  };

  const onChangeSiteWeb = () => {
    setTitleModal("Actualizar sitio web");
    setChildrenModal(
      <SiteWebForm
        setShowModal={setShowModal}
        currentSiteWeb={getUser.siteWeb}
        refetch={refetch}
      />
    );
  };

  const onLogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  return (
    <div className="settigns-form">
      <Button onClick={onChangePassoword}>Cambiar contraseña</Button>
      <Button onClick={onChangeEmail}>Cambiar email</Button>
      <Button onClick={onChangeDescription}>Descripción</Button>
      <Button onClick={onChangeSiteWeb}>Sitio web</Button>
      <Button onClick={onLogout}>Cerrar sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
