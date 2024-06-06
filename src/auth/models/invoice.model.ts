import * as mongoose from 'mongoose';

export const InvoiceSchemaDefine = new mongoose.Schema(
  {
    buyerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: false,
    },
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    pdfUrl: {
      type: String,
    },
    invoiceNumber: {
      type: String,
    },
    orderNumber: {
      type: String,
    },
    totalCartAmount: {
      type: Number,
    },
  },
  { timestamps: true },
);

export interface InvoiceInfo {
  _id: any;
  buyerUserId: mongoose.Schema.Types.ObjectId;
  paymentId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId[];
  pdfUrl: string;
  invoiceNumber: string;
  orderNumber: string;
  totalCartAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

InvoiceSchemaDefine.pre('save', async function (next) {
  next();
});
