import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  InputGroup,
  Icon,
  FlexboxGrid,
} from 'rsuite';

import '../styles/loginForm.less';

export default function LoginForm(props) {
  const [visible, setVisible] = useState(false);
  const [repeatVisible, setRepeatVisible] = useState(false);

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
          <h3 className="primary-text">Registrate en BLCProjects</h3>
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
                <FormControl size="lg" name="email" placeholder="Email" />
                <InputGroup.Addon style={{ backgroundColor: '#ededef' }}>
                  <Icon icon="envelope" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <FormGroup className="padding-bottom">
              <InputGroup inside size="lg" style={{ width: '100%' }}>
                <FormControl
                  size="lg"
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
              <InputGroup inside size="lg" style={{ width: '100%' }}>
                <FormControl
                  size="lg"
                  name="verifyPassword"
                  placeholder="Repeat Password"
                  type={repeatVisible ? 'text' : 'password'}
                />
                <InputGroup.Button
                  onClick={() => setRepeatVisible(!repeatVisible)}>
                  <Icon icon={repeatVisible ? 'eye' : 'eye-slash'} />
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
            <Button
              className="login-button login-text-2"
              appearance="ghost"
              onClick={props.handleSubmit}>
              REGISTRARSE
            </Button>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
