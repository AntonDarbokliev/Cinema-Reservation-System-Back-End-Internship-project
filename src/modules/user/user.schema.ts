import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, now } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: { virtuals: true },
})
export class User {
  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: Date, default: now() })
  createdAt: Date;

  @Prop({ required: true, type: String, unique: true, index: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: Array, default: Role.ADMIN })
  roles: Role[];
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre('save', async function (next) {
  const hashedPass = await bcrypt.hash(this.password, 10);
  this.password = hashedPass;
  next();
});

userSchema.virtual('reservations', {
  ref: 'Reservation',
  localField: '_id',
  foreignField: 'userId',
});
