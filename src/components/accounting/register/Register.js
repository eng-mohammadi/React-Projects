import React from "react";
import { Formik, Form, Field } from "formik";
import { validation } from "../../../utils/validation";

const Register = () => {
  return (
    <React.Fragment>
      <h2 className="accounting-title">ثبت نام</h2>
      <div className="register-container">
        <Formik
          initialValues={{
            name: "",
            family: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validate={validation}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-control">
                <label htmlFor="name">نام</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  placeholder="نام"
                />
                {errors.name && touched.name && <span>{errors.name}</span>}
              </div>
              <div className="form-control">
                <label htmlFor="family">نام خانوادگی</label>
                <Field
                  type="text"
                  name="family"
                  id="family"
                  autoComplete="off"
                  placeholder="نام خانوادگی"
                />
                {errors.family && touched.family && (
                  <span>{errors.family}</span>
                )}
              </div>
              <div className="form-control">
                <label htmlFor="email">ایمیل</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="ایمیل"
                />
                {errors.email && touched.email && <span>{errors.email}</span>}
              </div>
              <div className="form-control">
                <label htmlFor="password">رمز عبور</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="رمز عبور"
                />
                {errors.password && touched.password && (
                  <span>{errors.password}</span>
                )}
              </div>
              <div className="form-control">
                <label htmlFor="confirm-password">تأیید رمز عبور</label>
                <Field
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  autoComplete="off"
                  placeholder="تأیید رمز عبور"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <span>{errors.confirmPassword}</span>
                )}
              </div>
              <div className="form-checkbox-control">
                <Field type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">موافقت با شرایط و ضوابط</label>
                {errors.terms && touched.terms && <span>{errors.terms}</span>}
              </div>
              <div className="form-button">
                <button type="button">ثبت نام</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Register;
