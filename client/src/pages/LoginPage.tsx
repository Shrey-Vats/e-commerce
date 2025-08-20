import { LoginForm } from "@/components/login-form";

import Banner from "../assets/b3.png";
function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-screen w-3/6 bg-gray-300">
        <img src={Banner} className="h-full w-full " style={{ objectFit: "cover" }} />
      </div>
      <div className="h-full w-3/6 flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
