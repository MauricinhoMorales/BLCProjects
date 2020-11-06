import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FlexboxGrid, Col, Schema, Button } from 'rsuite';
import RegisterForm from '../../components/registerForm';

import '../../styles/loginPage.less';

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail('Introduzca un email válido')
    .isRequired('Este campo es requerido'),
  password: StringType().isRequired('Este campo es requerido'),
  verifyPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }

      return true;
    }, 'Las contraseñas no coinciden')
    .isRequired('Este campo es requerido'),
});

const errorStyles = (errorVisible) => {
  return { visible: errorVisible ? true : false };
};

export default function RegisterPage(props) {
  const [formValue, setFormValue] = useState({ email: null, password: null });
  const [formError, setFormError] = useState('');
  const router = useRouter();
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

  useEffect(() => {
    if (props.loggedIn) {
      router.push(`/my-tasks`);
    }
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <FlexboxGrid fluid className="full-container">
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
              <h2 className="white-text">¿Ya tienes cuenta?</h2>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              className="text-centered padding-bottom"
              colspan={24}>
              <p className="white-text login-text">
                Inicia sesión y empieza a ser productivo
              </p>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Link href="/login">
                <Button
                  className="login-text-2 login-ghost-button"
                  appearance="ghost">
                  INICIAR SESIÓN
                </Button>
              </Link>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
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
              <RegisterForm
                model={model}
                formValueSet={formValueSet}
                formErrorSet={formErrorSet}
                handleSubmit={handleSubmit}
                setRef={setRef}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
