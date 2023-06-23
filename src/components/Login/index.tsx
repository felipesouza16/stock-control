import { useForm, FormProvider } from "react-hook-form";
import { HomePage } from "../../utils/enums";
import { useMutation, useQuery } from "@apollo/client";
import { LoginFields } from "../../types";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/mutation";
import { useVerifyLogin } from "../../hooks/useVerifyLogin";

interface LoginProps {
  setHomePage: React.Dispatch<React.SetStateAction<HomePage>>;
}

export const Login = ({ setHomePage }: LoginProps) => {
  const methods = useForm();
  const { isLogged } = useVerifyLogin();
  const { handleSubmit, register } = methods;
  const navigate = useNavigate();
  const [login, { error, loading }] = useMutation(LOGIN, {
    onCompleted: () => {
      navigate("/dashboard");
    },
  });

  const onSubmitLogin = async (data: LoginFields) => {
    await login({
      variables: {
        input: {
          username: data.username,
          password: data.password,
        },
      },
    });
  };

  if (isLogged) {
    navigate("/dashboard");
  }

  if (error?.message) {
    toast.error(error.message);
  }

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <FormProvider {...methods}>
      <form
        className="hero min-h-screen bg-transparent"
        onSubmit={handleSubmit(onSubmitLogin)}
      >
        <div className="hero-content flex-col lg:flex-row ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Stock Control</h1>
            <p className="py-6">
              Our software has the best stock management feature, designed to
              simplify business operations, join us!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-md shadow-2xl border-base-300 border-2 bg-transparent">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered"
                  {...register("username")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  {...register("password")}
                />
                <div className="flex justify-end">
                  <label className="label">
                    <a
                      onClick={() => setHomePage(HomePage.SIGN_UP)}
                      className="label-text-alt link link-hover"
                      tabIndex={0}
                    >
                      Sign up for an account.
                    </a>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
