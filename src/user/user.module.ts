import { Module } from '@nestjs/common';
import { User, userSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  exports: [MongooseModule],
  providers: [UserService],
})
export class UserModule {}
