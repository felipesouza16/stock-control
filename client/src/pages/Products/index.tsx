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
import { Pagination } from "../../components/Pagination";
import { RowsPagination } from "../../components/RowsPagination";

export const Products = () => {
  const [rowAction, setRowAction] = useState<ProductType>({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState<ProductType[]>([]);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(rows.length / itemsPerPage);
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
      <div className="flex h-[88vh] flex-col mt-2 gap-y-4 items-center">
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
        <div className="overflow-x-auto overflow-y-auto h-4/6 w-5/6 scrollbar">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th className="w-1/6">Name</th>
                <th className="text-center w-2/6">Description</th>
                <th className="text-center w-1/6">Price</th>
                <th className="text-center w-1/6">Quantity</th>
                <th className="w-1/6"></th>
              </tr>
            </thead>
            <tbody>
              <RowsPagination
                items={rows}
                setIsEditOpen={setIsEditOpen}
                setRowAction={setRowAction}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </tbody>
          </table>
        </div>
        <div className="flex w-5/6 justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </FormProvider>
  );
};
