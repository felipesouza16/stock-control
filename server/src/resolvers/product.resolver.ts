import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateProductInput, Product } from "../schema/product.schema";
import ProductService from "../service/product.service";
import Context from "../types/context";

@Resolver()
export default class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Mutation(() => Product)
  createProduct(
    @Arg("input") input: CreateProductInput,
    @Ctx() context: Context
  ) {
    return this.productService.createProduct(input, context);
  }

  @Query(() => [Product])
  readAllProducts(@Ctx() context: Context) {
    return this.productService.readAllProducts(context);
  }

  @Mutation(() => Product)
  deleteProduct(@Arg("input") id: string, @Ctx() context: Context) {
    return this.productService.deleteProduct(id, context);
  }

  @Mutation(() => Product)
  updateProduct(
    @Arg("input") input: CreateProductInput,
    @Ctx() context: Context
  ) {
    return this.productService.updateProduct(input, context);
  }
}
