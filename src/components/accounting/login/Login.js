import React from "react";

const Login = () => {
  return (
    <React.Fragment>
      <h2 className="accounting-title">ورود</h2>
      <div className="login-container">
        <form>
          <div className="form-control">
            <label htmlFor="email">نام کاربری</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="ایمیل"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">رمز عبور</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="رمز عبور"
            />
          </div>
          <div className="form-button">
            <button type="submit">ورود</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
