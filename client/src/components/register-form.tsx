import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import z from "zod";
import { RegisterSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof RegisterSchema>;

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

  const emailValue = watch("email");
  const usernameValue = watch("username");


  const onSubmit = (data: FormData) => {
    console.log(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your email below to Register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  placeholder="Shreyvats"
                  required
                />
                {errors.username  && (
                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                 {errors.email  && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" {...register("password")} required />
                 {errors.password  && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={!isValid} className="w-full disabled:opacity-[50%] disabled:cursor-not-allowed">
                  Register
                </Button>
                <Button variant="outline" className="w-full">
                  Register with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              already have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
