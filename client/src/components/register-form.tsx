import Google from "../assets/google-logo.png";
import Github from "../assets/github.png";
import { useForm } from "react-hook-form";
import z from "zod";
import { RegisterSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
type FormData = z.infer<typeof RegisterSchema>;
const BaseUrl = "http://localhost:3000";
export function RegisterForm({
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
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const navigation = useNavigate();
  const emailValue = watch("email");
  const usernameValue = watch("username");

  useEffect(() => {
    if (!emailValue || emailValue.length === 0) return;
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const result = await axios.post(`${BaseUrl}/auth/register`, data);

    if (!result.data.success) {
      return setError("email", { message: result.data.message });
    }

    navigation(`/emailverification-status?id=${result.data.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto  flex flex-col justify-center gap-3 items-center">
      <h1 className="text-3xl font-medium mb-5">Sign up to ShopSee</h1>
      <input
        type="text"
        {...register("username")}
        className="w-3/6 px-4 py-2 rounded-4xl outline-none  bg-gray-100"
        placeholder="Username"
      />
      {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      <input
        type="text"
        {...register("email")}
        className="w-3/6 px-4 py-2 rounded-4xl outline-none bg-gray-100"
        placeholder="Email"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input
        type="password"
        {...register("password")}
        className="w-3/6 px-4 py-2 rounded-4xl outline-none bg-gray-100"
        placeholder="Password"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <div className="w-3/6 flex justify-end items-center ">
        <div className="flex items-center justify-end">
          <Checkbox className="" />
          <span>Remember me</span>
        </div>
      </div>
      <button disabled={!isValid} className="w-3/6 py-2 cursor-pointer hover:bg-[#eb5402] bg-[#f25805] text-white rounded-4xl disabled:opacity-50 disabled:cursor-not-allowed">
        Sign up
      </button>
      <div className="flex items-center py-5 w-3/6" id="divider">
        <div className="flex-grow h-[1px] bg-gray-400"></div>
        <span
          className="flex-shrink mx-4 text-gray-500 text-sm"
          id="divider-text"
        >
          Or sign with
        </span>
        <div className="flex-grow h-[1px] bg-gray-400"></div>
      </div>
      <button className="w-3/6 py-2 cursor-pointer hover:bg-gray-50 border-1 flex items-center justify-center gap-2 border-gray-200 rounded-4xl font-medium">
        {" "}
        <img src={Google} alt="" className="w-5 h-5" /> Google
      </button>
      <button className="w-3/6 py-2 cursor-pointer hover:bg-gray-50 border-1 flex items-center justify-center gap-2 border-gray-200 rounded-4xl font-medium">
        {" "}
        <img src={Github} alt="" className="w-5 h-5" /> Github
      </button>
      <p className="w-3/6 text-center text-gray-600 text-sm font-medium">
        Already have an account?{" "}
        <span className="text-[#f25805] underline cursor-pointer">Log in</span>
      </p>
    </form>
  );
}
