import * as mongoose from 'mongoose';

export const AddressSchemaDefine = new mongoose.Schema(
  {
    loggedInUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    mobileNumber: { type: Number },
    country: { type: String },
    stateId: { type: Number },
    stateName: { type: String },
    cityId: { type: Number },
    cityName: { type: String },
    streetAddress: { type: String },
    nearByAddress: { type: String },
    areaPincode: { type: Number },
  },
  { timestamps: true },
);

export interface AddressInfo {
  loggedInUserId: mongoose.Schema.Types.ObjectId;
  mobileNumber: number;
  country: string;
  stateId: number;
  stateName: string;
  cityId: number;
  cityName: string;
  streetAddress: string;
  nearByAddress: string;
  areaPincode: number;
  createdAt: Date;
  updatedAt: Date;
}

AddressSchemaDefine.pre('save', async function (next) {
  next();
});
