import * as yup from 'yup';

//schema for creating a product
export const productSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  description: yup.string().optional()
});

//Schema for updating a product
export const updateProductSchema = yup.object({
  name: yup.string().min(2, 'Nome muito curto').optional(),
  price: yup.number().positive('Preço deve ser positivo').optional(),
  description: yup.string().optional()
});