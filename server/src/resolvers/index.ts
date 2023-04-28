import ProductResolver from "./product.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [ProductResolver, UserResolver] as const;
