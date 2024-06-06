import * as mongoose from 'mongoose';

export const ReviewSchemaDefine = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
    productImg: [{ type: String, required: false }],
    productShortDescription: {
      type: String,
    },
  },
  { timestamps: true },
);

export interface ReviewInfo {
  _id: any;
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  productImg?: string[];
  createdAt: Date;
  updatedAt: Date;
}

ReviewSchemaDefine.pre('save', async function (next) {
  next();
});
