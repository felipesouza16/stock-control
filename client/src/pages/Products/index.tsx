import { useMutation, useQuery } from "@apollo/client";
import { Header } from "../../components/Header";
import { READ_ALL_PRODUCTS } from "../../lib/query";
import "./style.css";
import { useEffect, useState } from "react";
import { Product as ProductType } from "../../types";
import { useForm, FormProvider } from "react-hook-form";
import { EditModal } from "./EditModal";
import { DeleteModal } from "./DeleteModal";
import { Search } from "../../assets/Search";

export const Products = () => {
  const [rowAction, setRowAction] = useState<ProductType>({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [rows, setRows] = useState<ProductType[]>();
  const methods = useForm();
  const { register, setValue, getValues } = methods;
  const { refetch } = useQuery(READ_ALL_PRODUCTS, {
    onCompleted: (data) => {
      setRows(data?.readAllProducts);
    },
  });

  const searchProduct = (data: string) => {
    setRows((previous) =>
      previous?.filter((row: ProductType) =>
        row.name ? row.name.toLowerCase().includes(data.toLowerCase()) : []
      )
    );
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <FormProvider {...methods}>
      <input type="checkbox" id="modal-edit" className="modal-toggle" />
      {isEditOpen && (
        <EditModal
          refetch={refetch}
          rowAction={rowAction}
          setIsEditOpen={setIsEditOpen}
        />
      )}

      <input type="checkbox" id="modal-delete" className="modal-toggle" />
      <DeleteModal refetch={refetch} rowAction={rowAction} />

      <Header />
      <div className="flex h-[88vh] flex-col gap-y-4 items-center justify-center">
        <div className="form-control">
          <div className="input-group">
            <button
              className="btn btn-square"
              onClick={async () => {
                if (getValues("search").length > 0) {
                  setValue("search", "");
                  const response = await refetch();
                  setRows(response?.data?.readAllProducts);
                }
              }}
              type="button"
            >
              X
            </button>
            <input
              type="text"
              placeholder="Search for a name"
              className="input input-bordered"
              {...register("search")}
            />
            <button
              className="btn btn-square"
              onClick={() => {
                searchProduct(getValues("search"));
              }}
              type="button"
            >
              <Search />
            </button>
          </div>
        </div>
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
    </FormProvider>
  );
};
