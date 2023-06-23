import { gql, useMutation } from "@apollo/client";
import { ArrowBack } from "../../assets/ArrowBack";
import { SignUpFields } from "../../types";
import { HomePage } from "../../utils/enums";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { isSamePassword, verifyFieldsEmpty } from "./SignUp.helpers";
import { Hide } from "../../assets/Hide";
import { View } from "../../assets/View";
import { CREATE_USER } from "../../lib/mutation";

interface SignUpProps {
  setHomePage: React.Dispatch<React.SetStateAction<HomePage>>;
}

export const SignUp = ({ setHomePage }: SignUpProps) => {
  const methods = useForm();
  const [progressPassword, setProgressPassword] = useState(30);
  const [colorProgress, setColorProgress] = useState("");
  const [textProgressPassword, setTextProgressPassword] = useState<string>("");
  const { handleSubmit, register, watch, getValues } = methods;
  const [createUser, { error, loading }] = useMutation(CREATE_USER);

  const onSubmitForm = async (data: SignUpFields) => {
    if (!isSamePassword(getValues) || !verifyFieldsEmpty(data)) {
      return;
    }

    if (progressPassword <= 50) {
      toast.error("Password is too weak, let's better.", { duration: 4000 });
      return;
    }

    // check .com in email
    if (!data.email?.includes(".com")) {
      toast.error("Enter a valid email.", { duration: 3000 });
      return;
    }

    await createUser({
      variables: {
        input: {
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          email: data.email,
          password: data.password,
        },
      },
    });

    setHomePage(HomePage.LOGIN);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  //check strength password
  useEffect(() => {
    // check if has a special character
    if (/\W/.test(watch("password"))) {
      setProgressPassword(watch("password").length * 6);
    } else {
      setProgressPassword(watch("password").length * 4);
    }
    if (progressPassword <= 33 && watch("password")) {
      setTextProgressPassword("Too weak.");
      setColorProgress("progress-error");
      return;
    } else if (progressPassword >= 33 && progressPassword < 66) {
      setTextProgressPassword("Can be better.");
      setColorProgress("progress-warning");
      return;
    } else if (progressPassword >= 66 && watch("password").length > 0) {
      setTextProgressPassword("Great.");
      setColorProgress("progress-success");
      return;
    } else if (watch("password").length <= 0) {
      setTextProgressPassword("");
      setColorProgress("");
      return;
    }
  }, [watch("password")]);

  if (error?.message) {
    toast.error(error.message);
  }

  return (
    <FormProvider {...methods}>
      <form
        className="hero min-h-screen bg-transparent"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className="hero-content flex-col lg:flex-row">
          <div className="card w-full max-w-md shadow-2xl border-base-300 border-2 bg-transparent">
            <div className="card-body">
              <div className="flex justify-between items-center gap-x-[8.62rem] lg:gap-x-[14.057rem]">
                <button
                  className="btn btn-circle"
                  onClick={() => setHomePage(HomePage.LOGIN)}
                >
                  <ArrowBack />
                </button>
                <div className="flex flex-row">
                  <h1 className="text-3xl font-bold inline">Sign up</h1>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">First name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="input input-bordered"
                  required
                  {...register("first_name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="input input-bordered"
                  required
                  {...register("last_name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered"
                  required
                  {...register("username")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                  {...register("email")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex h-full">
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    className="input input-bordered w-full"
                    required
                    {...register("password")}
                  />
                  <label className="swap swap-rotate h-8 absolute right-0 mt-2 mr-10">
                    <input type="checkbox" />
                    <View
                      onClick={() => {
                        if (document.getElementById("password") != null) {
                          const passwordInput = document.getElementById(
                            "password"
                          ) as HTMLInputElement;
                          passwordInput.type = "text";
                        }
                      }}
                    />
                    <Hide
                      onClick={() => {
                        if (document.getElementById("password") != null) {
                          const passwordInput = document.getElementById(
                            "password"
                          ) as HTMLInputElement;
                          passwordInput.type = "password";
                        }
                      }}
                    />
                  </label>
                </div>
                <progress
                  className={`progress ${colorProgress} w-full mt-3`}
                  value={progressPassword}
                  max="100"
                ></progress>
                <p className="">{textProgressPassword}</p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  className="input input-bordered"
                  required
                  {...register("confirm_password")}
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
  );
};
