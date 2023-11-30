import { object, ref, string } from "yup";

export const schemaRegister = object().shape({
  fullName: string()
    .required("full name is required")
    .min(5, "full name minimum 5 character")
    .max(100, "full name maximum 100 character"),
  email: string()
    .email("please enter email")
    .required("email is required")
    .min(5, "email minimum 5 character")
    .max(100, "email maximum 100 character"),
  password: string()
    .required("password is required")
    .min(5, "password minimum 5 character")
    .max(100, "password maximum 100 character"),
  confirmPassword: string()
    .required("confirm password is required")
    .oneOf([ref("password")], "password does not match"),
  // captcha: string().required("captcha is required"),
});

export const schemaLogin = object().shape({
  email: string()
    .email("please enter email")
    .required("email is required")
    .min(5, "password minimum 5 character")
    .max(100, "password maximum 100 character"),
  password: string()
    .required("password is required")
    .min(5, "password minimum 5 character")
    .max(100, "password maximum 100 character"),
  // captcha: string().required("captcha is required"),
});

export const schemaForgetPass = object().shape({
  email: string()
    .email("please enter email")
    .required("email is required")
    .min(5, "password minimum 5 character")
    .max(100, "password maximum 100 character"),
  // captcha: string().required("captcha is required"),
});

export const schemaResetPass = object().shape({
  password: string()
    .required("password is required")
    .min(5, "password minimum 5 character")
    .max(100, "password maximum 100 character"),
  confirmPassword: string()
    .required("confirm password is required")
    .oneOf([ref("password")], "password does not match"),
});

export const schemaContact = object().shape({
  fullName: string()
    .required("full name is required")
    .min(5, "full name minimum 5 character")
    .max(100, "full name maximum 100 character"),
  email: string()
    .email("the email address is not correct")
    .required("email is required")
    .min(5, "password minimum 5 character")
    .max(100, "password maximum 100 character"),
  message: string()
    .required("massage is required")
    .min(5, "message minimum 5 character"),
  // captcha: string().required("captcha is required"),
});
