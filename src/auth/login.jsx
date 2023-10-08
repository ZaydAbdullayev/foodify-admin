import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { ClearForm } from "../service/form.service";
import { useLoginUserMutation } from "../service/user.service";
import { useCheckDepMutation } from "../service/user.service";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const [show, setShow] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData.entries());
    loginData.username = loginData?.username?.split(" ").join("_");

    const { data, error } = await loginUser(loginData);
    if (error) {
      setErr(true);
      ClearForm("#form");
      return;
    }
    const user = data.innerData.user;
    localStorage.setItem("user", JSON.stringify(user));
    if (loginData.role === "restaurant") return navigate("/cheack");
    navigate("/");
    setErr(false);
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form">
        <h1>Hisobga kirish</h1>

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
            <input type="radio" name="role" value="restaurant" required />
            <p>Restaurant</p>
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

export const CheackDepartment = () => {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [checkDep] = useCheckDepMutation();

  const loginD = async () => {
    try {
      const { data } = await checkDep(pass);
      const dep = data.innerData;
      localStorage.setItem("department", JSON.stringify(dep));
      window.location.href = "/";
    } catch (error) {
      setErr(true);
      setPass("");
    }
  };

  const removeLastDigit = () => {
    if (pass.length > 0) {
      setPass(pass.slice(0, -1));
    }
  };

  return (
    <div className="login">
      <label className="cheack_d">
        <p>Bo'limingiz parolini kiriting</p>
        <label>
          <span
            style={
              pass.length <= 2 && !err
                ? {}
                : { border: "1px solid tomato", color: "tomato" }
            }
          >
            {pass}
          </span>
          <button onClick={() => setPass(`${pass}1`)}>1</button>
          <button onClick={() => setPass(`${pass}2`)}>2</button>
          <button onClick={() => setPass(`${pass}3`)}>3</button>
          <button onClick={() => setPass(`${pass}4`)}>4</button>
          <button onClick={() => setPass(`${pass}5`)}>5</button>
          <button onClick={() => setPass(`${pass}6`)}>6</button>
          <button onClick={() => setPass(`${pass}7`)}>7</button>
          <button onClick={() => setPass(`${pass}8`)}>8</button>
          <button onClick={() => setPass(`${pass}9`)}>9</button>
          <button onClick={() => setPass(`${pass}0`)}>0</button>
          <button onClick={() => setPass("")}>AC</button>
          <button onClick={removeLastDigit}>⨉</button>
        </label>
        <button onClick={loginD}>Kirish</button>
      </label>
    </div>
  );
};
