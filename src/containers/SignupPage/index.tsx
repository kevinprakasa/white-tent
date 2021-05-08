import React from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormInput } from "components/FormComponents";
import { Button } from "@progress/kendo-react-buttons";

import Logo from "assets/logo.png";
import BackImg from "assets/left-chevron.png";

import "./signupStyle.scss";

const SignupPage: React.FC = () => {
  const handleSubmit = () => {};

  return (
    <div className="signup-page-container">
      <div className="icon-wrap">
        <div className="back-btn">
          <img className="left-chevron" src={BackImg} alt="left-chevron" />
        </div>
        <div className="logo-wrap">
          <img className="white-tent-logo" src={Logo} alt={`white-tent-logo`} />
        </div>
        <div className="spacer"> </div>
      </div>
      <div className="signup-content">
        <h1 className="sign-up-label">Sign Up.</h1>
        <div className="form-container">
          <Form
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
              <FormElement>
                <Field
                  id={`name`}
                  name={`name`}
                  placeholder={`name`}
                  component={FormInput}
                />
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
                <Field
                  id={`phoneNumber`}
                  name={`phoneNumber`}
                  placeholder={`phone number`}
                  component={FormInput}
                />
                <Field
                  id={`address`}
                  name={`address`}
                  placeholder={`address`}
                  component={FormInput}
                />

                <div className="k-form-buttons signup-btn-wrap">
                  <Button
                    className={`signup-btn-submit`}
                    primary={true}
                    type={"submit"}
                    disabled={formRenderProps.allowSubmit}
                  >
                    Sign up
                  </Button>
                </div>
              </FormElement>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
