import * as mongoose from 'mongoose';

export const CartSchemaDefine = new mongoose.Schema(
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
    quantity: {
      type: Number,
    },
  },
  { timestamps: true },
);

export interface CartInfo {
  _id: any;
  buyerUserId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

CartSchemaDefine.pre('save', async function (next) {
  next();
});
