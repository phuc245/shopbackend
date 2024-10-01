import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaType, SchemaTypes, Types } from "mongoose";
import { Role } from "src/auth/dto/role.enum";

@Schema({versionKey: false})
export class User  {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: true })
  status: boolean;


  @Prop({ type: [String], enum: Role, default: [Role.USER] })
  roles: Role[];
}
export const UserSchema = SchemaFactory.createForClass(User);
