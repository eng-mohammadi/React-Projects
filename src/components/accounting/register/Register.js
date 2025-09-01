import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registrationValidation } from "../../../utils/validation";
import { useAddAccountingMutation } from "../../../redux/services/accountingApi";

const Register = () => {
  const [addAccounting] = useAddAccountingMutation();
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
            terms: false,
          }}
          validate={registrationValidation}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setSubmitting(false);
              addAccounting(values);
              resetForm();
              window.alert("ثبت نام با موفقیت انجام شد");
            }, 3000);
          }}
        >
          {({ isSubmitting }) => (
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
                <ErrorMessage name="name" component="span" />
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
                <ErrorMessage name="family" component="span" />
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
                <ErrorMessage name="email" component="span" />
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
                <ErrorMessage name="password" component="span" />
              </div>
              <div className="form-control">
                <label htmlFor="confirm-password">تأیید رمز عبور</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  autoComplete="off"
                  placeholder="تأیید رمز عبور"
                />
                <ErrorMessage name="confirmPassword" component="span" />
              </div>
              <div className="form-checkbox-control">
                <Field type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">موافقت با شرایط و ضوابط</label>
                <ErrorMessage name="terms" component="span" />
              </div>
              <div className="form-button">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "در حال ارسال اطلاعات..." : "ثبت نام"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Register;
