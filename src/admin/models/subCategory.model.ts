import * as mongoose from 'mongoose';

export const CategorySchemaDefine = new mongoose.Schema(
  {
    subCategoryName: {
      type: String,
    },
    subCategoryDescription: {
      type: String,
    },
    subCategoryImg: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true },
);

export interface CategoryInfo {
  _id: any;
  subCategoryName: string;
  subCategoryDescription: string;
  subCategoryImg: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  categoryId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

CategorySchemaDefine.pre('save', async function (next) {
  next();
});
