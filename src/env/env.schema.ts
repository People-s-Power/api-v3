import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnvDocument = Env &
  Document & {
    id: any;
    _doc: any;
  };

@Schema()
export class Env {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  value: string;
  @Prop({ type: Boolean, default: false })
  isPrivate: boolean;
}

export const EnvSchema = SchemaFactory.createForClass(Env);
