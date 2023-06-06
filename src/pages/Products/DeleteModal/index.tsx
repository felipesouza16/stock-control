import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { DELETE_PRODUCT } from "../../../lib/mutation";
import { Product } from "../../../types";

interface DeleteModalProps {
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
  rowAction: Product;
}

export const DeleteModal = ({ refetch, rowAction }: DeleteModalProps) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      refetch();
    },
  });
  return (
    <div className="modal">
      <div className="modal-box relative">
        <label
          htmlFor="modal-delete"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">Are you sure?</h3>
        <p className="py-4">Do you want to delete the {rowAction?.name}?</p>
        <div className="modal-action my-0">
          <label
            htmlFor="modal-delete"
            onClick={async () =>
              await deleteProduct({ variables: { input: rowAction._id } })
            }
            className="btn btn-error btn-outline"
          >
            Delete
          </label>
        </div>
      </div>
    </div>
  );
};
