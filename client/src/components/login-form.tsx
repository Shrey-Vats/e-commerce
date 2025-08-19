import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { LoginSchema } from "@/lib/Schema"
import { zodResolver } from "@hookform/resolvers/zod"

type FormData = z.infer< typeof LoginSchema>
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
    mode: "onChange"
  })

  const emailValue = watch("email");
  
  const onSubmit = (data: FormData) => {
    console.log(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  required
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
                <Input id="password" {...register("password")} type="password" required />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={!isValid} className="w-full disabled:opacity-[50%] disabled:cursor-not-allowed">
                  Login
                </Button>
                <Button disabled={!isValid} variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
