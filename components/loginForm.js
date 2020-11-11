import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  InputGroup,
  Icon,
  FlexboxGrid,
  Checkbox,
  Loader,
} from 'rsuite';

import '../styles/loginForm.less';

export default function LoginForm(props) {
  const [visible, setVisible] = useState(false);

  const handleFormValue = (formValue) => {
    props.formValueSet.setFormValue(formValue);
  };

  const handleFormError = (formError) => {
    props.formErrorSet.setFormError(formError);
  };

  return (
    <>
      <FlexboxGrid fluid>
        <FlexboxGrid.Item
          colspan={24}
          className="padding-bottom"
          style={{ textAlign: 'center' }}>
          <h3 className="primary-text">Iniciar Sesión en BLCProjects</h3>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <Form
            fluid
            layout="vertical"
            model={props.model}
            formValue={props.formValueSet.formValue}
            formError={props.formErrorSet.formError}
            onChange={handleFormValue}
            onCheck={handleFormError}
            ref={(ref) => props.setRef(ref)}
            style={{ textAlign: 'center' }}>
            <FormGroup className="padding-bottom">
              <InputGroup style={{ width: '100%' }} size="lg">
                <FormControl
                  className="textfield"
                  size="lg"
                  name="email"
                  placeholder="Email"
                />
                <InputGroup.Addon style={{ backgroundColor: '#ededef' }}>
                  <Icon icon="envelope" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup inside size="lg" style={{ width: '100%' }}>
                <FormControl
                  size="lg"
                  className="textfield"
                  name="password"
                  placeholder="Password"
                  type={visible ? 'text' : 'password'}
                />
                <InputGroup.Button onClick={() => setVisible(!visible)}>
                  <Icon icon={visible ? 'eye' : 'eye-slash'} />
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <FlexboxGrid fluid justify="space-between">
                <FlexboxGrid.Item colspan={6}>
                  <Checkbox
                    className="login-text-2 black-text"
                    style={{ padding: 0, margin: 0 }}>
                    Recuérdame
                  </Checkbox>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11}>
                  <Button
                    appearance="link"
                    className="login-text-2"
                    style={{ fontWeight: 'bold', color: 'black' }}>
                    ¿Olvidaste tu contraseña?
                  </Button>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </FormGroup>
            <Button
              block
              className="login-button login-text-2"
              appearance="ghost"
              onClick={props.handleSubmit}>
              {props.loading ? (
                <Loader speed="fast" size="small" />
              ) : (
                'INICIAR SESIÓN'
              )}
            </Button>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
