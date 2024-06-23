import { Product } from '../db/Product.js';

export const getAllProducts = (userId) => Product.find({ userId });
export const addProduct = (product, userId) =>
  Product.create({ ...product, userId });

export const deleteProduct = (productId, userId) =>
  Product.findOneAndDelete({ _id: productId, userId });

export const patchProduct = (productId, payload, userId) =>
  Product.findOneAndUpdate({ _id: productId, userId }, payload, { new: true });
