import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export const productSchema = yup.object({
  name: yup
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters")
    .required("Product name is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .min(1, "Price must be at least $1")
    .max(999999.9, "Price must be less than $1,000,000")
    .required("Price is required"),
})
