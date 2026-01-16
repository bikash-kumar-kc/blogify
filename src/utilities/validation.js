import { object, string } from "yup";
import * as Yup from "yup";

export const validationForSignin = object({
  email: string().email("email is not valid").required("Email is required"),
  password: string().required("Password is required"),
});

export const validationForSignup = object({
  email: string().email("email is not valid").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^a-zA-Z0-9]/, "Password requires a symbol"),
  name: string().required("name is required"),
});

export const validationForBlogPost = object ({
  title:string().required("Title for post is required"),
  excerpt:string().required("Excerpt for the post is required"),
  status:string().required("Status for the post is required"),
  coverImage: Yup.mixed().required("this is required field"),
  tags:string().required("Tags for the post are required"),
})

