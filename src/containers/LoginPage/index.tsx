import React from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormInput } from "components/FormComponents";
import { Button } from "@progress/kendo-react-buttons";

import "./loginStyle.scss";

const LoginPage: React.FC = () => {
  const handleSubmit = () => {};
  return (
    <div className="login-page-container">
      <div className="icon-wrap"></div>
      <h1 className="sign-in-label">Sign in.</h1>
      <div className="form-container">
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps) => (
            <FormElement>
              <Field
                id={`email`}
                name={`email`}
                placeholder={`email`}
                component={FormInput}
              />
              <Field
                id={`password`}
                name={`password`}
                placeholder={`password`}
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
                  disabled={formRenderProps.allowSubmit}
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
