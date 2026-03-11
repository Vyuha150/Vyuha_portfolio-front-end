"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Mail, Lock, ArrowRight, CheckCircle, KeyRound } from "lucide-react";
import axios from "axios";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().length(6, "Reset code must be 6 digits"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "reset">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    setIsSubmitting(true);
    setMessage("");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/auth/forgot-password";
      const response = await axios.post(apiUrl, values);

      if (response.status === 200) {
        setUserEmail(values.email);
        resetForm.setValue("email", values.email);
        setStep("reset");
        setMessage("Reset code sent to your email!");
        setIsSuccess(true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to send reset code. Please try again.";
      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetSubmit = async (values: z.infer<typeof resetSchema>) => {
    setIsSubmitting(true);
    setMessage("");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/auth/reset-password";
      const response = await axios.post(apiUrl, {
        email: values.email,
        code: values.code,
        newPassword: values.newPassword,
      });

      if (response.status === 200) {
        setMessage("Password reset successfully! Redirecting to sign in...");
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 2000);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Password reset failed. Please try again.";
      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsSubmitting(true);
    setMessage("");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/auth/forgot-password";
      const response = await axios.post(apiUrl, { email: userEmail });

      if (response.status === 200) {
        setMessage("Reset code sent again! Please check your email.");
        setIsSuccess(true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to resend code. Please try again.";
      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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
                {step === "email" ? (
                  <KeyRound className="w-8 h-8 text-white" />
                ) : (
                  <Lock className="w-8 h-8 text-white" />
                )}
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {step === "email" ? "Forgot Password" : "Reset Password"}
              </h1>
              <p className="text-gray-400 text-sm">
                {step === "email"
                  ? "Enter your email to receive a reset code"
                  : "Enter the code and your new password"}
              </p>
            </div>

            {/* Step 1: Email Form */}
            {step === "email" && (
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                  <FormField
                    control={emailForm.control}
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
                            />
                          </div>
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Send Reset Code
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            )}

            {/* Step 2: Reset Form */}
            {step === "reset" && (
              <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-6">
                  <FormField
                    control={resetForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Reset Code</FormLabel>
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

                  <FormField
                    control={resetForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              {...field}
                              type="password"
                              placeholder="Enter new password"
                              className="pl-10 bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              {...field}
                              type="password"
                              placeholder="Confirm new password"
                              className="pl-10 bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                            />
                          </div>
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Resetting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Reset Password
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleResendCode}
                      disabled={isSubmitting}
                      className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                    >
                      Resend Code
                    </Button>
                  </div>
                </form>
              </Form>
            )}

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
