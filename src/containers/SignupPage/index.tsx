import React, { useState } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormInput } from "components/FormComponents";
import { Button } from "@progress/kendo-react-buttons";

import Logo from "assets/logo.svg";
import BackImg from "assets/left-chevron.png";
import { signUpWithEmailAndPassword } from "util/FirebaseAPI";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  phoneValidator,
} from "util/validators";
import DialogComponent from "components/DialogComponent";

import "./signupStyle.scss";
import { useHistory } from "react-router";

const SignupPage: React.FC = () => {
  const [renderDialog, setRenderDialog] = useState(<></>);

  const history = useHistory();
  const handleSubmit = (payload: { [name: string]: any }) => {
    signUpWithEmailAndPassword(
      payload.email,
      payload.password,
      {
        name: payload.name,
        phone_number: payload.phoneNumber,
        address: payload.address,
      },
      (res: any) => {
        console.log(res);
        setRenderDialog(
          <DialogComponent
            title={"Success"}
            body={"Redirecting to home..."}
            handleClose={() => {
              history.push("/");
              setRenderDialog(<></>);
            }}
          />
        );
      },
      (err: any) => {
        console.log("[SIGNUP ERROR]", err);
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
    <div className="signup-page-container">
      {renderDialog}
      <div className="icon-wrap">
        <div className="back-btn">
          <img
            className="left-chevron"
            src={BackImg}
            alt="left-chevron"
            onClick={() => history.goBack()}
          />
        </div>
        <div className="logo-wrap">
          <img
            className="white-tent-logo"
            src={Logo}
            alt={`white-tent-logo`}
            onClick={() => history.push("/")}
          />
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
                  validator={nameValidator}
                  component={FormInput}
                />
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
                <Field
                  id={`phoneNumber`}
                  name={`phoneNumber`}
                  placeholder={`phone number`}
                  validator={phoneValidator}
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
                    disabled={!formRenderProps.allowSubmit}
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
