"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  registerSchema,
  type RegisterInput,
} from "@/validations/auth";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setServerError("");

    try {
      const response = await api.post("/auth/register", data);

      console.log(response.data);
      
      router.push("/login");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ?? "Something went wrong",
        );
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>

        <input
          id="name"
          {...register("name")}
          placeholder="Your name"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />

        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />

        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>

        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />

        {errors.password && (
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-500">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-black px-4 py-2 text-white transition cursor-pointer hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}