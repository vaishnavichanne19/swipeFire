import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swipe Fire - Login Page",
  description: "Swipe Fire Login Page",
};

export default function SignIn() {
  return <SignInForm />;
}
