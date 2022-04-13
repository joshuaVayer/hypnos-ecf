import React from "react";
import i18next from "i18next";
import PropTypes from "prop-types";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";

import { required, email, formStyle } from "@Utils/form";

import AuthService from "@Services/Auth";

import Link from "@Controls/Link";
import Alert from "@Display/Alert";
import Separator from "@Display/Separator";
import ButtonPrimary from "@Controls/Buttons/Primary";
import ButtonSecondary from "@Controls/Buttons/Secondary";

class AuthLogin extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
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

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.setState({
            loading: false
          });
          this.props.navigate("/dashboard");
        },
        () => {
          this.setState({
            loading: false,
            message: i18next.t("invalid_credentials")
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <ArrowNarrowLeftIcon
            className="h-8 w-8 text-gray-800 hover:text-gray-500 hover:cursor-pointer"
            onClick={() => this.props.navigate("/")}
          />
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl text-gray-900">
              {i18next.t("signin_to_your_account")}
            </h2>
            <img
              className="mx-auto mt-6 h-12 w-auto"
              src={`${process.env.REACT_APP_UPLOAD_URL}/b6471688d20f493e9b8ba4d1ca6575fb.png`}
              alt="Workflow"
            />
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10 border border-gray-200">
              <Form onSubmit={this.handleLogin} ref={c => (this.form = c)}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {i18next.t("username")}
                    </label>
                    <div className="mt-1">
                      <Input
                        type="email"
                        className={formStyle.input}
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required, email]}
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
                        validations={[required]}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <Link to="/forgot-password">
                      {i18next.t("forgot_password")}
                    </Link>
                  </div>

                  <div>
                    <ButtonPrimary
                      loading={this.state.loading}
                      disabled={this.state.loading}
                    >
                      <span>{i18next.t("signin")}</span>
                    </ButtonPrimary>
                  </div>
                </div>
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
              {this.state.message && (
                <Alert
                  type={"error"}
                  text={this.state.message}
                  className="mt-2"
                />
              )}
              <div className="mt-6">
                <Separator text={i18next.t("no_account")} />
                <div className="mt-6">
                  <ButtonSecondary
                    onClick={() => this.props.navigate("/signup")}
                  >
                    <span>{i18next.t("register")}</span>
                  </ButtonSecondary>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

AuthLogin.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default AuthLogin;
