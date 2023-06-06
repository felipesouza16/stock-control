import toast from "react-hot-toast";
import { SignUpFields } from "../../types";
import { FieldValues, UseFormGetValues } from "react-hook-form";

export const verifyFieldsEmpty = (data: SignUpFields) => {
  if (
    data?.first_name?.trim() &&
    data?.last_name?.trim() &&
    data?.username?.trim() &&
    data?.email?.trim() &&
    data?.password?.trim() &&
    data?.confirm_password?.trim()
  ) {
    return true;
  }
  toast.error("Fill all the fields.", { duration: 3000 });
  return false;
};

export const isSamePassword = (
  getValues: UseFormGetValues<FieldValues>
): boolean => {
  const password = getValues("password");
  const confirmPassword = getValues("confirm_password");
  if (password !== confirmPassword) {
    toast.error("Passwords are different.", { duration: 3000 });
    return false;
  }
  return true;
};
