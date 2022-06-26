import { useState } from "react";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import "./styles.css";

export function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <Page>
      <HeaderImage imageUrl="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80" />
      <div className="login-container">
        <div className="login-register-links">
          <a href="/login" className="btn">
            Login
          </a>
          <a href="" className="btn secondary">
            Register
          </a>
        </div>

        <h1>Login</h1>
        <p className="already-registered">
          Are you a Registered charity? <a>Register for an account</a>
        </p>
        <form action="">
          <label className="input-label" htmlFor="email">
            EMAIL
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input type="password" name="password" />
          <div className="form-row">
            <label>
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              Remember me
            </label>
            <a href="/reset-password">Forgot Password?</a>
          </div>
          <button className="btn">LOGIN</button>
        </form>
      </div>
    </Page>
  );
}
