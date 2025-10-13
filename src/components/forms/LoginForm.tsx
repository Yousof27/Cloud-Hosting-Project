/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ButtonSpinner from "../spinners/ButtonSpinner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const FormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "") return toast.info("Please, fill all the fields !");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/user/login`, { email, password });
      router.replace("/");
      router.refresh();
      toast.success("Welcome Back !");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={FormSubmitHandler}>
      <input
        className="!mb-4 border rounded !p-2 text-xl"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="!mb-4 border rounded !p-2 text-xl"
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="text-2xl text-white bg-blue-800 !p-2 rounded font-bold cursor-pointer" disabled={loading}>
        {loading ? <ButtonSpinner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
