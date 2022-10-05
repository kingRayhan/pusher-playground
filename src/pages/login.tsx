import { NextPage } from "next";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface IFormInput {
  nickName: string;
  userId: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      userId: Cookies.get("userId") || Date.now().toString(),
    },
  });
  const onSubmit = (data: IFormInput) => {
    if (!data.nickName || !data.userId) {
      toast.error("Please enter nick name and user id");
      return;
    }
    Cookies.set("nickName", data.nickName);
    Cookies.set("userId", data.userId);
    toast.success("Login success");
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="mb-4 text-2xl font-semibold">Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label>
          <p>UserId</p>
          <input type="text" className="w-full" {...register("userId")} />
        </label>
        <label>
          <p>Your Name</p>
          <input type="text" className="w-full" {...register("nickName")} />
        </label>

        <button className="px-4 py-2 text-white bg-indigo-500 rounded-sm w-max">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
