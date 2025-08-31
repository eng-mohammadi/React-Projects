import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registrationValidation } from "../../../utils/validation";
import { useAddAccountingMutation } from "../../../redux/services/accountingApi";

const Register = () => {
  const [addAccounting, { isLoading: isAddingAccounting }] =
    useAddAccountingMutation();
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
            }, 4000);
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

// // import React from 'react';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';

// // // // تابع اعتبارسنجی ساده
// // // const validate = values => {
// // //   const errors = {};
// // //   if (!values.fullName) {
// // //     errors.fullName = 'این فیلد الزامی است';
// // //   }
// // //   if (!values.email) {
// // //     errors.email = 'این فیلد الزامی است';
// // //   } else if (
// // //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
// // //   ) {
// // //     errors.email = 'ایمیل صحیح نیست';
// // //   }
// // //   if (!values.checkIn) {
// // //     errors.checkIn = 'تاریخ ورود را انتخاب کنید';
// // //   }
// // //   if (!values.checkOut) {
// // //     errors.checkOut = 'تاریخ خروج را انتخاب کنید';
// // //   }
// // //   if (values.guests < 1) {
// // //     errors.guests = 'حداقل یک نفر باید انتخاب شود';
// // //   }
// // //   return errors;
// // // };

// // // function HotelReservationForm() {
// // //   return (
// // //     <Formik
// // //       initialValues={{
// // //         fullName: '',
// // //         email: '',
// // //         phone: '',
// // //         checkIn: '',
// // //         checkOut: '',
// // //         guests: 1,
// // //         roomType: 'standard',
// // //         specialRequests: '',
// // //       }}
// // //       validate={validate}
// // //       onSubmit={(values, { setSubmitting, resetForm }) => {
// // //         // شبیه‌سازی ارسال داده
// // //         setTimeout(() => {
// // //           console.log('Reservation data:', values);
// // //           setSubmitting(false);
// // //           resetForm();
// // //           alert('رزرو شما ثبت شد!');
// // //         }, 1000);
// // //       }}
// // //     >
// // //       {({ isSubmitting }) => (
// // //         <Form>
// // //           <div>
// // //             <label>نام و نام خانوادگی</label>
// // //             <Field name="fullName" placeholder="مثلا: علی رضایی" />
// // //             <ErrorMessage name="fullName" component="div" />
// // //           </div>

// // //           <div>
// // //             <label>ایمیل</label>
// // //             <Field name="email" type="email" placeholder="example@mail.com" />
// // //             <ErrorMessage name="email" component="div" />
// // //           </div>

// <div className="form-control">
//                 <label htmlFor="phone">تلفن</label>
//                 <Field name="phone" id="phone" placeholder="با پیش شماره 09" />
//               </div>
//               <div className="form-control">
//                 <label htmlFor="checkIn">تاریخ ورود</label>
//                 <Field name="checkIn" id="checkIn" type="date" />
//                 <ErrorMessage name="checkIn" component="div" />
//               </div>
//               <div className="form-control">
//                 <label htmlFor="checkOut">تاریخ خروج</label>
//                 <Field name="checkOut" id="checkOut" type="date" />
//                 <ErrorMessage name="checkOut" component="div" />
//               </div>
//               <div className="form-control">
//                 <label htmlFor="guests">تعداد میهمان</label>
//                 <Field name="guests" id="guests" type="number" min="1" />
//                 <ErrorMessage name="guests" component="div" />
//               </div>
//               <div className="form-control">
//                 <label htmlFor="roomType">نوع اتاق</label>
//                 <Field name="roomType" id="roomType" as="select">
//                   <option value="standard">استاندارد</option>
//                   <option value="deluxe">دلوکس</option>
//                   <option value="suite">سوئیت</option>
//                 </Field>
//               </div>
//               <div className="form-control">
//                 <label htmlFor="specialRequests">درخواست ویژه (اختیاری)</label>
//                 <Field
//                   name="specialRequests"
//                   id="specialRequests"
//                   as="textarea"
//                   placeholder="درخواست‌های خود را وارد کنید"
//                 />
//               </div>

// // //           <button type="submit" disabled={isSubmitting}>
// // //             {isSubmitting ? 'در حال ثبت...' : 'ثبت رزرواسیون'}
// // //           </button>
// // //         </Form>
// // //       )}
// // //     </Formik>
// // //   );
// // // }

// // // export default HotelReservationForm;
