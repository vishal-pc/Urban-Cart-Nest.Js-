import * as mongoose from 'mongoose';

export const ProductSchemaDefine = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: false,
    },
    productName: {
      type: String,
    },
    productBrand: {
      type: String,
    },
    productPrice: {
      type: Number,
    },
    productImg: [{ type: String, required: false }],
    productShortDescription: {
      type: String,
    },
    productDescription: {
      type: String,
    },
    productStockQuantity: {
      type: Number,
    },
    productFeature: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true },
);

export interface ProductInfo {
  _id: any;
  categoryId: mongoose.Schema.Types.ObjectId;
  subCategoryId: mongoose.Schema.Types.ObjectId;
  productName: string;
  productBrand: string;
  productPrice: number;
  productImg?: string[];
  productShortDescription: string;
  productDescription: string;
  productFeature: string;
  productStockQuantity: number;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

ProductSchemaDefine.pre('save', async function (next) {
  next();
});
