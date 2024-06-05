import * as mongoose from 'mongoose';

export const RoleSchemaDefine = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      require: true,
    },
  },
  { timestamps: true },
);

export interface RoleInfo {
  _id: any;
  role: string;
}

RoleSchemaDefine.pre('save', async function (next) {
  next();
});
