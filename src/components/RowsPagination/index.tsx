import { useFormContext } from "react-hook-form";
import { Product } from "../../types";

interface RowsPaginationProps {
  items: Product[];
  currentPage: number;
  itemsPerPage: number;
  setRowAction: (arg: Product) => void;
  setIsEditOpen: (arg: boolean) => void;
}

export const RowsPagination = ({
  items,
  currentPage,
  itemsPerPage,
  setIsEditOpen,
  setRowAction,
}: RowsPaginationProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const { setValue } = useFormContext();
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <>
      {currentItems.map((row: Product, index: number) => {
        const caracterLimit = 23;
        const currentName =
          String(row.name).length > caracterLimit
            ? String(row.name).slice(0, caracterLimit) + "..."
            : row.name;
        const currentDescription =
          String(row.description).length > caracterLimit
            ? String(row.description).slice(0, caracterLimit) + "..."
            : row.description;

        return (
          <tr key={index}>
            <th>{currentName}</th>
            <td className="text-center">{row.description}</td>
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
    </>
  );
};
