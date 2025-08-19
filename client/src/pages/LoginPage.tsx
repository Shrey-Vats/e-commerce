import { RegisterForm } from "@/components/register-form";
function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <div className="flex justify-center items-center w-auto h-auto">
        <RegisterForm className="w-[350px] h-[510px]" />
      </div>
    </div>
  );
}

export default LoginPage;
