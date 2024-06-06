import * as mongoose from 'mongoose';

export const CategorySchemaDefine = new mongoose.Schema(
  {
    buyerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  { timestamps: true },
);

export interface CategoryInfo {
  _id: any;
  buyerUserId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

CategorySchemaDefine.pre('save', async function (next) {
  next();
});
