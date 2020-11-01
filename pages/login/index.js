import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FlexboxGrid, Col, Button, Schema } from 'rsuite';

import LoginForm from '../../components/loginForm';

import '../../styles/loginPage.less';

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail('Introduzca un email válido')
    .isRequired('Este campo es requerido'),
  password: StringType().isRequired('Este campo es requerido'),
});

const errorStyles = (errorVisible) => {
  return { visible: errorVisible ? true : false };
};

export default function Login() {
  const [formValue, setFormValue] = useState({ email: null, password: null });
  const [formError, setFormError] = useState('');
  const formValueSet = { formValue, setFormValue };
  const formErrorSet = { formError, setFormError };
  let form = useRef(null);

  const setRef = (ref) => {
    form = ref;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkData(form);
  };

  const checkData = (form) => {
    if (!form.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <FlexboxGrid fluid className="full-container">
        <FlexboxGrid.Item
          className="full-container"
          componentClass={Col}
          colspan={15}>
          <FlexboxGrid fluid className="full-container">
            <FlexboxGrid.Item className="logo-container" colspan={24}>
              <img src="/logo.gif" alt="BLC Vevezuela Logo" />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              className="login-form-container vertical-centered-items"
              colspan={24}>
              <LoginForm
                model={model}
                formValueSet={formValueSet}
                formErrorSet={formErrorSet}
                handleSubmit={handleSubmit}
                setRef={setRef}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          className="full-container container vertical-centered-items"
          componentClass={Col}
          colspan={9}
          smHidden
          mdHidden>
          <FlexboxGrid fluid justify="center">
            <FlexboxGrid.Item
              className="text-centered padding-bottom"
              colspan={24}>
              <h2 className="white-text">¡Hola! Bienvenido</h2>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              className="text-centered padding-bottom"
              colspan={24}>
              <p className="white-text login-text">
                Ingresa tu información y comienza
                <br />
                tu trabajo con nuestra ayuda
              </p>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Link href="/register">
                <Button
                  className="login-text-2 login-ghost-button"
                  appearance="ghost">
                  REGISTRARSE
                </Button>
              </Link>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
