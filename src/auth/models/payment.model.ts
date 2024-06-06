import * as mongoose from 'mongoose';

export const PaymentSchemaDefine = new mongoose.Schema(
  {
    buyerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    totalProduct: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: false,
        },
        productName: {
          type: String,
        },
        productPrice: {
          type: Number,
        },
        productQuantity: {
          type: Number,
        },
        productDescription: {
          type: String,
        },
        itemPrice: {
          type: Number,
        },
        cartId: {
          type: String,
        },
        productImageUrl: {
          type: String,
        },
      },
    ],
    totalCartAmount: {
      type: Number,
    },
    stripeUserId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Canceled'],
      default: 'Pending',
    },
    orderNumber: {
      type: String,
    },
    stripePayment: {
      type: mongoose.Schema.Types.Mixed,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: false,
    },
  },
  { timestamps: true },
);

export interface PaymentInfo {
  _id: any;
  buyerUserId: mongoose.Schema.Types.ObjectId;
  totalProduct: Array<{
    _id: any;
    productId: mongoose.Schema.Types.ObjectId;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productDescription: string;
    itemPrice: number;
    cartId: string;
    productImageUrl: string;
  }>;
  stripeUserId: string;
  totalCartAmount: number;
  paymentStatus: 'Pending' | 'Completed' | 'Canceled';
  orderNumber: string;
  stripePayment: string;
  addressId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

PaymentSchemaDefine.pre('save', async function (next) {
  next();
});
