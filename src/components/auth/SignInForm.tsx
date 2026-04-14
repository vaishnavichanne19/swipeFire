"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function SignInForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 try {
      const res = await axios.post("/api/auth/login", { email, password });

      if (res.data.success) {
        document.cookie = `adminToken=${res.data.token}; path=/; max-age=86400`;
        toast.success(res.data.message || "Login Successfull");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div style={{ height: "100vh" }} className="flex items-center justify-center">
      <div className="shadow border p-5 w-full max-w-md mx-auto">
        <div className="flex justify-center">
          <Image src="/img/Logo.svg" alt="Logo" width={200} height={100} />
        </div>

        <div className="m-5 text-center">
          <h2 className="mb-2 font-semibold text-gray-800 text-2xl">
            Sign In
          </h2>
          <p className="text-sm text-gray-500">
            Enter your email and password to sign in!
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-6">
            <div>
              <Label>Email</Label>
              <Input
                placeholder="Enter Email"
                type="email"
                name="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  name="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                </span>
              </div>
            </div>

            <Button className="w-full" size="sm" type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}