import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import AuthApis from "../../core/network/apis/auth";

const authApis = new AuthApis();

const loginNewUser = (data) => {
  return authApis.login(data);
};

export const Login = () => {
  const navigate = useNavigate();

  const mutation = useMutation(loginNewUser);
  const [errorMessage, setErrorMessage] = useState("");

  const [inputsData, setInputsData] = useState({ email: "", password: "" });

  const [errorData, setErrorData] = useState({ email: false, password: false });

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
      password: inputsData.password
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
            <h6> Log in to your account</h6>
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

          <div className="mt-3 mb-3">
            <button
              className="stand-btn"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              Sign In
            </button>
          </div>

          <div className="p-3">
            You don't have account ?{" "}
            <Link to="/auth/register" style={{ color: "crimson" }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
