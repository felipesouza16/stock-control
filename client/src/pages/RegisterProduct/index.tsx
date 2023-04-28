import { FormProvider, useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { ArrowBack } from "../../assets/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../lib/mutation";
import { toast } from "react-hot-toast";
import { CreateProduct } from "../../types";

export const RegisterProduct = () => {
  const methods = useForm();
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const { handleSubmit, register } = methods;
  const navigate = useNavigate();

  const onSubmitForm = async (data: CreateProduct) => {
    if (
      !data.description?.trim() ||
      !data.name?.trim() ||
      !data.price ||
      !data.quantity
    ) {
      toast.error("Fill all the fields.", { duration: 3000 });
      return;
    }

    await createProduct({
      variables: {
        input: {
          name: data.name,
          description: data.description,
          quantity: Number(data.quantity),
          price: Number(data.price),
        },
      },
    });
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <div className="">
        <FormProvider {...methods}>
          <form
            className="hero lg:min-h-[92vh] bg-transparent"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <div className="hero-content flex-col lg:flex-row">
              <div className="card w-full max-w-md shadow-2xl border-base-300 border-2 bg-transparent">
                <div className="card-body">
                  <div className="flex justify-between items-center gap-x-10">
                    <button
                      className="btn btn-circle"
                      type="button"
                      onClick={() => navigate("/dashboard")}
                    >
                      <ArrowBack />
                    </button>
                    <div className="flex flex-row w-full text-right">
                      <h1 className="text-3xl font-bold inline">
                        Register new product
                      </h1>
                    </div>
                  </div>

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

                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Register</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
