import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import AuthApis from "../../core/network/apis/auth";

const authService = new AuthApis();

const updateUser = (data) => {
  return authService.patch(data, "user");
};

export const TabSettingsProfile = ({ user }) => {
  const mutation = useMutation(updateUser);
  const [errorMessage, setErrorMessage] = useState("");

  const [inputsData, setInputsData] = useState({ ...user });

  const [isLoading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState({ email: false, username: false });

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
    console.log(user, inputsData);
    // if (!checkValidation()) {
    //   return;
    // }

    setLoading(true);
    const preparedData = {
      email: inputsData.email,
      job_title: inputsData?.job_title ? inputsData?.job_title : "",
      city: inputsData?.city ? inputsData?.city : "",
      country: inputsData?.country ? inputsData?.country : "",
      user_name: inputsData.username,
      linkedin: inputsData.linkedin ? inputsData.linkedin : "",
      github: inputsData.github ? inputsData.github : ""
    };

    console.log(preparedData);

    mutation.mutate(preparedData, {
      onError: (err) => {
        setErrorMessage(err.response?.data?.error);
      },
      onSuccess: (value) => {
        setLoading(false);
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
            <label>Country</label>
            <input
              type="text"
              onChange={(ev) => handleChanges(ev, "country")}
              value={inputsData.country}
            ></input>
          </div>
          <div className="form-box-custom">
            <label>City</label>
            <input
              type="text"
              onChange={(ev) => handleChanges(ev, "city")}
              value={inputsData.city}
            ></input>
          </div>

          <div className="form-box-custom">
            <label>Job Title</label>
            <input
              type="text"
              onChange={(ev) => handleChanges(ev, "job_title")}
              value={inputsData.job_title}
            ></input>
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

          <div className="form-box-custom">
            <label>LinkedIn Profile</label>
            <input
              type="text"
              onChange={(ev) => handleChanges(ev, "linkedin")}
              value={inputsData.linkedin}
            ></input>
          </div>

          <div className="form-box-custom">
            <label>GitHub Profile</label>
            <input
              type="text"
              onChange={(ev) => handleChanges(ev, "github")}
              value={inputsData.github}
            ></input>
          </div>

          <div className="mt-3 mb-3">
            <button
              disabled={isLoading}
              className="stand-btn"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              {isLoading ? (
                <>
                  {" "}
                  <CircularProgress />
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
