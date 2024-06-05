import * as mongoose from 'mongoose';

export const UserSchemaDefine = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: Number },
    address: { type: String },
    profileImg: { type: String },
    IsAdmin: { type: Boolean },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    stripeUserId: { type: String },
    userLogin: { type: Boolean },
  },
  { timestamps: true },
);

export interface Role {
  _id: mongoose.Schema.Types.ObjectId;
  role: string;
}

export interface UserInfo {
  fullName: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  profileImg: number;
  IsAdmin: boolean;
  role: Role;
  stripeUserId: string;
  userLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

UserSchemaDefine.pre('save', async function (next) {
  next();
});
