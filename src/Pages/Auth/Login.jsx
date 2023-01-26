import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/user-atom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Navbar from "../../Components/navbar";

export default function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [user, setUser] = useRecoilState(userAtom);
  const [data, setData] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    return axios
      .post("login", data)
      .then(async (respon) => {
        let user = jwt_decode(respon.data.result.token);
        setCookie("token", respon.data.result.token, { path: "/" });
        setUser(user);
        navigate("/users", { replace: true });
      })
      .catch((err) => {
        alert("error login");
      });
  };
  return (
    <Navbar>
      <div className="global-container">
        <div className="card login-form">
          <div className="card-body">
            <h3 className="card-title text-center">Log in</h3>
            <div className="card-text">
              <form id="formLogin" onSubmit={handleSubmit}>
                {/* to error: add class "has-danger" */}
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    className="form-control form-control-sm"
                    id="email"
                    type="email"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    value={data.email}
                    placeholder="johndoe@mail.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control form-control-sm"
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    placeholder="*******"
                  />
                </div>
                <button type="submit" className="btn btn-login btn-primary btn-block">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
