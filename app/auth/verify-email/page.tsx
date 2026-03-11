"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, Shield, ArrowRight, CheckCircle } from "lucide-react";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().length(6, "Verification code must be 6 digits"),
});

function VerifyEmailContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get("email") || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailFromParams,
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setMessage("");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/auth/verify-email";
      const response = await axios.post(apiUrl, values);

      if (response.status === 200) {
        setIsSuccess(true);
        setMessage("Email verified successfully! Redirecting to dashboard...");
        
        // If token is provided, save it and redirect
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setTimeout(() => {
            router.push("/auth/sign-in");
          }, 2000);
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Verification failed. Please try again.";
      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!form.getValues("email")) {
      setMessage("Please enter your email address first");
      return;
    }

    setIsResending(true);
    setMessage("");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/auth/resend-verification";
      const response = await axios.post(apiUrl, { email: form.getValues("email") });

      if (response.status === 200) {
        setMessage("Verification code sent! Please check your email.");
        setIsSuccess(true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to resend code. Please try again.";
      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a1a] to-[#0c0c0c] flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-[#1a1a1a]/90 border border-orange-500/20 backdrop-blur-lg shadow-2xl">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
              <p className="text-gray-400 text-sm">
                Enter the 6-digit code sent to your email address
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                            disabled={!!emailFromParams}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter 6-digit code"
                          className="text-center text-2xl font-mono tracking-widest bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                          maxLength={6}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Message Display */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                      isSuccess
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {isSuccess && <CheckCircle className="w-4 h-4" />}
                    {message}
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Verify Email
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                {/* Resend Code */}
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                  >
                    {isResending ? "Sending..." : "Resend Code"}
                  </Button>
                </div>
              </form>
            </Form>

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <Link
                href="/auth/sign-in"
                className="text-orange-400 hover:text-orange-300 text-sm transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
