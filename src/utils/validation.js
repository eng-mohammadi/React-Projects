export const registrationValidation = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "فیلد نام الزامی است";
  } else if (data.name.length < 3) {
    errors.name = "فیلد نام باید بیشتر از 3 کاراکتر باشد";
  } else {
    delete errors.name;
  }

  if (!data.family.trim()) {
    errors.family = "فیلد نام خانوادگی الزامی است";
  } else if (data.family.length < 5) {
    errors.family = "فیلد نام خانوادگی باید بیشتر از 5 کاراکتر باشد";
  } else {
    delete errors.family;
  }

  if (!data.email.trim()) {
    errors.email = "فیلد ایمیل الزامی است";
  } else if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "ایمیل نامعتبر است";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "فیلد رمز عبور الزامی است";
  } else if (data.password.length < 8) {
    errors.password =
      "فیلد رمز عبور باید بیشتر از 8 کاراکتر و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر ویژه باشد";
  } else if (
    !data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
  ) {
    errors.password =
      "فیلد رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد";
  } else {
    delete errors.password;
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "فیلد تأیید رمز عبور الزامی است";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "رمز عبور و تأیید آن مطابقت ندارند";
  } else {
    delete errors.confirmPassword;
  }

  if (!data.terms) {
    errors.terms = "فیلد پذیرش شرایط الزامی است";
  } else {
    delete errors.terms;
  }

  return errors;
};

export const loginValidation = (data) => {
  const errors = {};

  if (!data.email.trim()) {
    errors.email = "فیلد ایمیل الزامی است";
  } else if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "ایمیل نامعتبر است";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "فیلد رمز عبور الزامی است";
  } else if (data.password.length < 8) {
    errors.password =
      "فیلد رمز عبور باید بیشتر از 8 کاراکتر و شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر ویژه باشد";
  } else if (
    !data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
  ) {
    errors.password =
      "فیلد رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد";
  } else {
    delete errors.password;
  }

  return errors;
};
