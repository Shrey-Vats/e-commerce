import { useForm } from "react-hook-form";
import z from "zod";
import { LoginSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Google from "../assets/google-logo.png";
import Github from "../assets/github.png";
const BaseUrl = "http://localhost:3000";
type FormData = z.infer<typeof LoginSchema>;
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const navigation = useNavigate();
  const emailValue = watch("email");

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const result = await axios.post(`${BaseUrl}/auth/login`, data);

    if (!result.data.success) {
      return setError("email", { message: result.data.message });
    }

    if (result.data.message === "Verification link sent to your email") {
      return navigation(`/emailverification-status?id=${result.data.id}`);
    }

    navigation("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto  flex flex-col justify-center gap-3 items-center">
      <h1 className="text-3xl font-medium mb-5">Sign in to ShopSee</h1>
      <input
        type="text"
        {...register("email")}
        className="w-3/6 px-4 py-2 rounded-4xl outline-none border-2 bg-gray-100"
        placeholder="Email"
      />
      {errors.email && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-2 animate-fade-in">
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.662 1.732-3L13.732 4c-.77-1.338-2.694-1.338-3.464 0L4.34 16c-.77 1.338.192 3 1.732 3z"
            />
          </svg>
          <span className="font-medium">{errors.email.message}</span>
        </p>
      )}

      <input
        type="password"
        {...register("password")}
        className="w-3/6 px-4 py-2 rounded-4xl outline-none border-2 bg-gray-100"
        placeholder="Password"
      />
      {errors.password && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-2 animate-fade-in">
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.662 1.732-3L13.732 4c-.77-1.338-2.694-1.338-3.464 0L4.34 16c-.77 1.338.192 3 1.732 3z"
            />
          </svg>
          <span className="font-medium">{errors.password.message}</span>
        </p>
      )}

      <div className="w-3/6 flex justify-between items-center ">
        <div className="flex items-center justify-center">
          <Checkbox className="" />
          <span>Remember me</span>
        </div>
        <span className="text-gray-600 underline font-medium cursor-pointer">
          Forget Password?
        </span>
      </div>
      <button className="w-3/6 py-2 cursor-pointer hover:bg-[#eb5402] bg-[#f25805] text-white rounded-4xl">
        Sign in
      </button>
      <div className="flex items-center py-5 w-3/6" id="divider">
        <div className="flex-grow h-[1px] bg-gray-400"></div>
        <span
          className="flex-shrink mx-4 text-gray-500 text-sm"
          id="divider-text"
        >
          Or login with
        </span>
        <div className="flex-grow h-[1px] bg-gray-400"></div>
      </div>
      <button className="w-3/6 py-2 cursor-pointer hover:bg-gray-50 border-1 flex items-center justify-center gap-2 border-gray-300 rounded-4xl font-medium">
        {" "}
        <img src={Google} alt="" className="w-5 h-5" /> Google
      </button>
      <button className="w-3/6 py-2 cursor-pointer hover:bg-gray-50 border-1 flex items-center justify-center gap-2 border-gray-300 rounded-4xl font-medium">
        {" "}
        <img src={Github} alt="" className="w-5 h-5" /> Github
      </button>
      <p className="w-3/6 text-center text-gray-600 text-sm font-medium">
        Don't have an account?{" "}
        <span className="text-[#f25805] underline cursor-pointer">Sign up</span>
      </p>
    </form>
  );
}
