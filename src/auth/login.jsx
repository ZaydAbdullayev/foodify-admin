import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { acLogin, acLogout } from "../redux/auth";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ClearForm } from "../service/form.service";
import { ApiService } from "../service/api.service";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData.entries());

    ApiService.fetching("login/user", loginData)
      .then((res) => {
        console.log(res);
        const user = res.data.innerData.user;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(acLogin());
        navigate("/");
        setErr(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch(acLogout());
        setErr(true);
        ClearForm("#form");
      });
  };

  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  const sig_in = () => {
    navigate("/signin");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form">
        <h1>
          Hisobga kirish <span onClick={sig_in}>/ Ro'yxatdan o'tish</span>
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Ism kiritng"
          required
          autoComplete="off"
          autoCapitalize="off"
          className="input"
          style={err ? { border: "1px solid tomato", padding: "4.5% 3%" } : {}}
        />
        <label>
          <input
            type={show ? "password" : "text"}
            name="password"
            placeholder="Parol kiriting"
            required
            autoComplete="off"
            className="input"
            style={err ? { border: "1px solid tomato" } : {}}
          />
          <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
            {show ? <BsEyeSlash /> : <BsEye />}
          </span>
          <p style={err ? { display: "flex" } : {}} className="failed">
            Foydalanuvchi yoki parol xaroligi...!
          </p>
        </label>
        <div className="role">
          <p style={err ? { color: "tomato" } : {}}>Boshqaruvchi:</p>
          <label>
            <input type="radio" name="role" value="customer" required />
            <p>Sotuvchi</p>
          </label>
          <label>
            <input type="radio" name="role" value="owner" required />
            <p>Owner</p>
          </label>
        </div>
        <button className="log_btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export const Signin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData.entries());

    ApiService.fetching("register", loginData)
      .then((res) => {
        console.log(res);
        const user = res.data.innerData.user;
        localStorage.setItem("user", JSON.stringify(user));
        ClearForm("#form");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  };

  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  const log_in = () => {
    navigate("/login");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form">
        <h1>
          Ro'yxatdan o'tish <span onClick={log_in}>/ Hisobga kirish</span>
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Ism kiritng"
          required
          autoComplete="off"
          autoCapitalize="off"
          className="input"
        />
        <label>
          <input
            type={show ? "password" : "text"}
            name="password"
            placeholder="Parol kiriting"
            required
            autoComplete="off"
            className="input"
          />
          <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
            {show ? <BsEyeSlash /> : <BsEye />}
          </span>
        </label>
        <div className="role">
          <p>Boshqaruvchi:</p>
          <label>
            <input type="radio" name="role" value="customer" required />
            <p>Sotuvchi</p>
          </label>
          <label>
            <input type="radio" name="role" value="owner" required />
            <p>Owner</p>
          </label>
        </div>
        <button className="log_btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};
