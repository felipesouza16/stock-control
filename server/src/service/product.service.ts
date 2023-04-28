import { ApolloError } from "apollo-server-core";
import {
  CreateProductInput,
  Product,
  ProductModel,
} from "../schema/product.schema";
import Context from "../types/context";

class ProductService {
  async createProduct(input: CreateProductInput, context: Context) {
    if (!context.user) {
      throw new ApolloError("You must be logged.");
    }
    return ProductModel.create({ ...input, id_user: context.user?._id });
  }

  async readAllProducts(context: Context) {
    if (context.user) {
      return ProductModel.find({ id_user: context.user._id });
    } else {
      throw new ApolloError("You must be logged.");
    }
  }

  async deleteProduct(id: string, context: Context) {
    if (context.user) {
      return ProductModel.findOneAndDelete({ _id: id });
    } else {
      throw new ApolloError("You must be logged.");
    }
  }

  async updateProduct(newObject: Product, context: Context) {
    if (context.user) {
      return ProductModel.findOneAndUpdate({ _id: newObject._id }, newObject);
    } else {
      throw new ApolloError("You must be logged.");
    }
  }
}

export default ProductService;
