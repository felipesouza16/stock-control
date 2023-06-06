import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      email
      first_name
      last_name
      username
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      name
      quantity
      description
      price
      _id
      id_user
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($input: String!) {
    deleteProduct(input: $input) {
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: CreateProductInput!) {
    updateProduct(input: $input) {
      _id
      id_user
      name
      description
      price
      quantity
    }
  }
`;
