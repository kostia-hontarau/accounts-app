import { Document, Model, Schema } from "mongoose";

export const accountSchema = new Schema(
  {
    name: String,
    surname: String,
    email: String,
    passwordHash: String,
    city: String,
    phone: String,
    postalCode: String,
  },
  {
    timestamps: true,
  }
);

accountSchema.index(
  {
    email: 1,
  },
  {
    unique: true,
  }
);

export interface IAccountSchema extends Document {
  name: string;
  surname: string;
  email: string;
  passwordHash: string;
  city: string;
  phone: string;
  postalCode: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type AccountDataModel = Model<IAccountSchema>;
