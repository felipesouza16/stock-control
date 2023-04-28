import { getModelForClass, prop } from "@typegoose/typegoose";
import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Product {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  id_user: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => Number)
  @prop({ required: true })
  price: number;

  @Field(() => Number)
  @prop({ required: true })
  quantity: number;
}

export const ProductModel = getModelForClass(Product);

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String)
  name: string;

  @MinLength(10, { message: "Description must be at least 50 characters" })
  @MaxLength(1000, {
    message: "Description must not be more than 1000 characters",
  })
  @Field(() => String)
  description: string;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  quantity: number;

  @prop({ required: true })
  id_user: string;
}
