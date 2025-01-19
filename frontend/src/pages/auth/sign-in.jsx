import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import useStore from "../../store/index.js";
import { useForm } from "react-hook-form";
import { useNavigate,Link} from "react-router-dom";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import Input from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";
import { BiLoader } from "react-icons/bi";

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must have at least 6 characters"),
});

const SignIn = () => {
  const { user } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10 bg-gray-100 dark:bg-gray-900">
      <Card className="w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <CardHeader className="py-0">
            <CardTitle className="mb-8 text-center text-gray-800 dark:text-white">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-6">
                <Input
                  disabled={loading}
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400"
                />
                <Input
                  disabled={loading}
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Your password"
                  error={errors.password?.message}
                  {...register("password")}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400"
                />
              </div>
              <Button
                type="submit"
                className="w-full px-4 py-2 text-white bg-violet-800 rounded-md hover:bg-violet-900 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <BiLoader className="text-2xl text-white animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </div>
        <CardFooter className="justify-center gap-2">
          <p className="text-sm text-gray-600">Don't have an account ? </p>
          <Link 
          to ="/sign-up" 
          className="text-sm font-semibold text-violet-600 hover:underline"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
