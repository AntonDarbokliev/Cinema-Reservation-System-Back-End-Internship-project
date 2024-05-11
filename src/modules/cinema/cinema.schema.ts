import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateProjection, CreateHallPlan, CreateMenuItem } from './dto/index';
import { HydratedDocument } from 'mongoose';

export type CinemaDocument = HydratedDocument<Cinema>;

@Schema()
export class Cinema {
  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  numberOfHalls: string;

  @Prop({ required: true, type: Array })
  hallPlans: CreateHallPlan[];

  @Prop({ required: true, type: Array })
  menu: CreateMenuItem[];

  @Prop({ required: true, type: Array })
  projections: CreateProjection[];
}

export const cinemaSchema = SchemaFactory.createForClass(Cinema);
