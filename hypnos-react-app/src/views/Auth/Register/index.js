import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "@Services/Auth";
import SuccessAnimation from "actually-accessible-react-success-animation";

import {
  name,
  password,
  required,
  email,
  passwordConfirm,
  formStyle
} from "@Utils/form";

import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";

import Alert from "@Display/Alert";
import Separator from "@Display/Separator";
import ButtonPrimary from "@Controls/Buttons/Primary";
import ButtonSecondary from "@Controls/Buttons/Secondary";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirmation =
      this.onChangePasswordConfirmation.bind(this);

    this.state = {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      message: "",
      successful: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      this.props.navigate("/dashboard");
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePasswordConfirmation(e) {
    this.setState({
      passwordConfirmation: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <>
        <div className="min-h-full flex flex-col justify-center py-8 sm:px-6 lg:px-8">
          <ArrowNarrowLeftIcon
            className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer"
            onClick={() => this.props.navigate("/")}
          />
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl text-gray-900">
              {i18next.t("create_account")}
            </h2>
            <img
              className="mx-auto mt-6 h-12 w-auto"
              src={`${process.env.REACT_APP_UPLOAD_URL}/b6471688d20f493e9b8ba4d1ca6575fb.png`}
              alt="Workflow"
            />
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10 border border-gray-200">
              <Form onSubmit={this.handleRegister} ref={c => (this.form = c)}>
                <div className="space-y-6">
                  {!this.state.successful && (
                    <React.Fragment>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {i18next.t("username")}
                        </label>
                        <div className="mt-1">
                          <Input
                            type="email"
                            className={formStyle.input}
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            validations={[required, email]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {i18next.t("name")}
                        </label>
                        <div className="mt-1">
                          <Input
                            type="name"
                            className={formStyle.input}
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required, name]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {i18next.t("password")}
                        </label>
                        <div className="mt-1">
                          <Input
                            type="password"
                            className={formStyle.input}
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required, password]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="password_confirmation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {i18next.t("password_confirmation")}
                        </label>
                        <div className="mt-1">
                          <Input
                            type="password"
                            className={formStyle.input}
                            name="password_confirmation"
                            value={this.state.passwordConfirmation}
                            base={this.state.password}
                            onChange={this.onChangePasswordConfirmation}
                            validations={[required, passwordConfirm]}
                          />
                        </div>
                      </div>
                      <div>
                        <ButtonPrimary
                          loading={this.state.loading}
                          disabled={this.state.loading}
                        >
                          <span>{i18next.t("register")}</span>
                        </ButtonPrimary>
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
              {this.state.message && !this.state.successful && (
                <Alert
                  type={"error"}
                  text={this.state.message}
                  className="mt-2"
                />
              )}
              {!this.state.successful ? (
                <div className="mt-6">
                  <Separator text={i18next.t("have_account")} />
                  <div className="mt-6">
                    <ButtonSecondary
                      onClick={() => this.props.navigate("/signin")}
                    >
                      <span>{i18next.t("signin")}</span>
                    </ButtonSecondary>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <SuccessAnimation
                    duration={1000}
                    size={120}
                    text={i18next.t("account_created")}
                    color="#5cb85c"
                  />
                  <ButtonSecondary
                    className="-mt-6"
                    onClick={() => this.props.navigate("/dashboard")}
                  >
                    <span>{i18next.t("go_to_dashboard")}</span>
                  </ButtonSecondary>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

Register.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default Register;
