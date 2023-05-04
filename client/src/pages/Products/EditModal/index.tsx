import { useFormContext } from "react-hook-form";
import { Product } from "../../../types";
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { UPDATE_PRODUCT } from "../../../lib/mutation";

interface EditModalProps {
  rowAction: Product;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
  setIsEditOpen: (arg0: boolean) => void;
}

export const EditModal = ({
  rowAction,
  refetch,
  setIsEditOpen,
}: EditModalProps) => {
  const methods = useFormContext();
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      refetch();
    },
  });
  const { handleSubmit, register } = methods;

  const onSubmitEdit = async (data: Product) => {
    delete data.search;

    const currentData = {
      ...data,
      _id: rowAction._id,
    };
    await updateProduct({
      variables: {
        input: currentData,
      },
    });
    setIsEditOpen(false);
  };
  return (
    <div className="modal">
      <div className="modal-box relative">
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          <label
            id="close-modal-edit"
            htmlFor="modal-edit"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Editing {rowAction.name}</h3>
          <div className="flex flex-col gap-y-4 py-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter a name"
                className="input input-bordered"
                required
                {...register("name")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                placeholder="Enter a description"
                className="input input-bordered"
                required
                {...register("description")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Enter a price"
                className="input input-bordered"
                required
                step="any"
                {...register("price")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                placeholder="Enter a quantity"
                className="input input-bordered"
                required
                {...register("quantity")}
              />
            </div>
          </div>
          <div className="modal-action my-0">
            <button className="btn btn-success btn-outline" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
