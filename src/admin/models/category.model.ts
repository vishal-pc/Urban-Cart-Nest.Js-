import * as mongoose from 'mongoose';

export const CategorySchemaDefine = new mongoose.Schema(
  {
    categoryName: {
      type: String,
    },
    categoryDescription: {
      type: String,
    },
    categoryImg: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export interface CategoryInfo {
  _id: any;
  categoryName: string;
  categoryDescription: string;
  categoryImg: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

CategorySchemaDefine.pre('save', async function (next) {
  next();
});
