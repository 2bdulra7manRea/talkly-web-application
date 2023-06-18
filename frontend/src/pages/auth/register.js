import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import AuthApis from "../../core/network/apis/auth";

const authApis = new AuthApis();

const registerNewUser = (data) => {
  return authApis.register(data);
};

export const Register = () => {
  const navigate = useNavigate();

  const mutation = useMutation(registerNewUser);
  const [errorMessage, setErrorMessage] = useState("");

  const [inputsData, setInputsData] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [errorData, setErrorData] = useState({
    email: false,
    password: false,
    username: false
  });

  const checkValidation = () => {
    let status = true;
    let temp = {};
    for (const key in inputsData) {
      console.log(!inputsData[key]);
      if (!inputsData[key]) {
        status = false;
        temp = { ...temp, [key]: true };
      }
    }
    setErrorData({ ...errorData, ...temp });
    return status;
  };

  const handleSubmit = () => {
    if (!checkValidation()) {
      return;
    }

    const preparedData = {
      email: inputsData.email,
      password: inputsData.password,
      user_name: inputsData.username
    };

    mutation.mutate(preparedData, {
      onError: (err) => {
        setErrorMessage(err.response?.data?.error);
      },
      onSuccess: (value) => {
        localStorage.setItem("access_token", value.data?.data.token);
        localStorage.setItem("security_id", value.data?.data?.securityId);
        navigate("/home");
      }
    });
  };

  const handleChanges = (ev, type) => {
    setInputsData({ ...inputsData, [type]: ev.target.value });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="title-auth">
            <h6> Create a new Account</h6>
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="form-box-custom">
            <label>Email</label>
            <input
              type="text"
              className={
                !inputsData.email && errorData.email ? "error-input" : ""
              }
              onChange={(ev) => handleChanges(ev, "email")}
              value={inputsData.email}
            ></input>
            {!inputsData.email && errorData.email && (
              <span>email is required</span>
            )}
          </div>
          <div className="form-box-custom">
            <label>Password</label>
            <input
              type="text"
              className={
                !inputsData.password && errorData.password ? "error-input" : ""
              }
              onChange={(ev) => handleChanges(ev, "password")}
              value={inputsData.password}
            ></input>
            {!inputsData.password && errorData.password && (
              <span>password is required</span>
            )}
          </div>

          <div className="form-box-custom">
            <label>Username</label>
            <input
              type="text"
              className={
                !inputsData.username && errorData.username ? "error-input" : ""
              }
              onChange={(ev) => handleChanges(ev, "username")}
              value={inputsData.username}
            ></input>
            {!inputsData.username && errorData.username && (
              <span>username is required</span>
            )}
          </div>

          <div className="mt-3 mb-3">
            <button
              className="stand-btn"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              Create account
            </button>
          </div>

          <div className="p-3">
            Do you already account{" "}
            <Link to="/auth/login" style={{ color: "crimson" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
