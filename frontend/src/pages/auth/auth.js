import { Route, Routes } from "react-router-dom";
import "./auth.css";
import { Login } from "./login";
import { Register } from "./register";

export const AuthPage = () => {
  return (
    <>
      <div className="flex-auth-box">
        <div className="row auth-card">
          <div className="col-md-12">
            <div className="main-title-auth">
              <h1>Talkly</h1>
            </div>
            <Routes>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
