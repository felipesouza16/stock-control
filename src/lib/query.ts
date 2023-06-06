import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      email
      first_name
      last_name
      username
      _id
    }
  }
`;

export const READ_ALL_PRODUCTS = gql`
  query ReadAllProducts {
    readAllProducts {
      _id
      name
      price
      description
      id_user
      quantity
    }
  }
`;
