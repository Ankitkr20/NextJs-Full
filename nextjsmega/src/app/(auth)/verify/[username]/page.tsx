"use client"
import { useParams, useRouter } from "next/navigation";
import { useAppToast } from "@/hooks/useAppToast";
import React from "react";
import { useForm } from "react-hook-form";
import { verifySchema } from "@/schema/verifySchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
    Form,
    FormItem,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VerifyAccountName = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const { toastShow } = useAppToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: param.username,
        code: data.code,
      });
      toastShow("success", response.data.message);
      router.replace("sign-in");
    } catch (error) {
      console.error("Error in getting verificaation code", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message || "";
      toastShow("error", errorMessage);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Verify Your Account
            </h1>
            <p className="mb-4">
              Enter the Verification code sent to your email
            </p>
          </div>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>
      </div>
    </>
  );
};

export default VerifyAccountName;