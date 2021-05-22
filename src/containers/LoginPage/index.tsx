import React, { useEffect, useState } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormInput } from "components/FormComponents";
import { Button } from "@progress/kendo-react-buttons";
import { useHistory } from "react-router";

import Logo from "assets/logo.svg";
import { signInWithEmailAndPassword, isUserLoggedIn } from "util/FirebaseAPI";
import { emailValidator, passwordValidator } from "util/validators";
import DialogComponent from "components/DialogComponent";

import "./loginStyle.scss";

const LoginPage: React.FC = () => {
  const [renderDialog, setRenderDialog] = useState(<></>);
  const history = useHistory();

  useEffect(() => {
    if (isUserLoggedIn()) {
      history.replace("/");
    }
  });

  const handleSubmit = (payload: { [name: string]: any }) => {
    signInWithEmailAndPassword(
      payload.email,
      payload.password,
      (res: any) => {
        console.log(res);
        setRenderDialog(
          <DialogComponent
            title={"Success"}
            body={"redirect to home"}
            handleClose={() => {
              history.push("/");
              setRenderDialog(<></>);
            }}
          />
        );
      },
      (err: any) => {
        console.error("[LOGIN ERROR]", err);
        setRenderDialog(
          <DialogComponent
            title={"Error"}
            body={`${err.message}`}
            handleClose={() => {
              setRenderDialog(<></>);
            }}
          />
        );
      }
    );
  };

  return (
    <div className="login-page-container">
      {renderDialog}
      <div className="icon-wrap">
        <img
          className="white-tent-logo"
          src={Logo}
          alt={`white-tent-logo`}
          onClick={() => history.goBack()}
        />
      </div>
      <h1 className="sign-in-label">Sign In.</h1>
      <div className="form-container">
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps) => (
            <FormElement>
              <Field
                id={`email`}
                name={`email`}
                placeholder={`email`}
                type={"email"}
                validator={emailValidator}
                component={FormInput}
              />
              <Field
                id={`password`}
                name={`password`}
                placeholder={`password`}
                type={"password"}
                validator={passwordValidator}
                component={FormInput}
              />
              <div className="forgot-password">
                <a href="/login">forgot password?</a>
              </div>
              <div className="k-form-buttons login-btn-wrap">
                <Button
                  className={`login-btn-submit`}
                  primary={true}
                  type={"submit"}
                  disabled={!formRenderProps.allowSubmit}
                >
                  Sign in
                </Button>
              </div>
            </FormElement>
          )}
        />
      </div>
      <div className="dont-have-account-text">
        <span>Don't have an account? </span>
        <span>
          <a className="sign-up-link" href="/signup">
            Sign Up Here
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
