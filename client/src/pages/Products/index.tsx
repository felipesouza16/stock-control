import { useMutation, useQuery } from "@apollo/client";
import { Header } from "../../components/Header";
import { READ_ALL_PRODUCTS } from "../../lib/query";
import "./style.css";
import { useEffect, useState } from "react";
import { Product as ProductType } from "../../types";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "../../lib/mutation";
import { useForm, FormProvider } from "react-hook-form";

export const Products = () => {
  const [rowAction, setRowAction] = useState<ProductType>({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { data, refetch } = useQuery(READ_ALL_PRODUCTS);
  const methods = useForm();
  const { register, setValue, handleSubmit } = methods;
  const rows = data?.readAllProducts;
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      refetch();
    },
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      refetch();
    },
  });

  const onSubmitEdit = async (data: any) => {
    console.log(data);

    const currentData = {
      ...data,
      _id: rowAction._id,
    };
    await updateProduct({
      variables: {
        input: currentData,
      },
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <input type="checkbox" id="modal-edit" className="modal-toggle" />
      {isEditOpen ? (
        <div className="modal">
          <div className="modal-box relative">
            <FormProvider {...methods}>
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
                <button
                  className="btn btn-success btn-outline"
                  onClick={() => {
                    const close = document.getElementById(
                      "close-modal-edit"
                    ) as HTMLLabelElement;
                    close.htmlFor = "modal-edit";
                    console.log("a");
                  }}
                >
                  Confirm
                </button>
              </div>
            </FormProvider>
          </div>
        </div>
      ) : null}

      <input type="checkbox" id="modal-delete" className="modal-toggle" />
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
      <Header />
      <div className="flex h-[88vh] items-center justify-center">
        <div className="overflow-x-auto overflow-y-auto h-5/6 w-5/6 scrollbar">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-center">Description</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row: ProductType, index: number) => {
                return (
                  <tr key={index}>
                    <th>{row?.name}</th>
                    <td className="text-center text-ellipsis">
                      {row?.description}
                    </td>
                    <td className="text-center">{row?.price}</td>
                    <td className="text-center">{row?.quantity}</td>
                    <td className="flex justify-center gap-x-4">
                      <label
                        htmlFor="modal-edit"
                        className="btn btn-success btn-outline btn-xs cursor-pointer"
                        onClick={() => {
                          setRowAction(row);
                          setIsEditOpen(true);
                          setValue("name", row.name);
                          setValue("description", row.description);
                          setValue("price", row.price);
                          setValue("quantity", row.quantity);
                        }}
                      >
                        Edit
                      </label>
                      <label
                        id="label-trigger-delete"
                        htmlFor="modal-delete"
                        onClick={() => setRowAction(row)}
                        className="btn btn-error btn-outline btn-xs cursor-pointer"
                      >
                        Delete
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
