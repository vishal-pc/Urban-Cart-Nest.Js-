import * as mongoose from 'mongoose';

export const ContactUsSchemaDefine = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    reasonForContact: {
      type: String,
    },
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userMobileNumber: {
      type: Number,
    },
    userComment: {
      type: String,
    },
  },
  { timestamps: true },
);

export interface ContactUsInfo {
  _id: any;
  userId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  reasonForContact: string;
  userName: string;
  userMobileNumber: number;
  userEmail: string;
  userComment: string;
  createdAt: Date;
  updatedAt: Date;
}

ContactUsSchemaDefine.pre('save', async function (next) {
  next();
});
