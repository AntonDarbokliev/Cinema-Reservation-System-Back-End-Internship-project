import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FoodAndBeverage {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, type: String })
  cinemaId: string;
}

export const foodAndBeverageSchema =
  SchemaFactory.createForClass(FoodAndBeverage);
