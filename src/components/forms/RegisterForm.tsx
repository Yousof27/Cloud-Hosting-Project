/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonSpinner from "../spinners/ButtonSpinner";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const FormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "" || username == "") return toast.info("Please, fill all the fields !");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/user/register`, { username, email, password });
      router.replace("/");
      router.refresh();
      toast.success(`Welcome ${username}`);
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
        type="text"
        placeholder="Enter Your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
        {loading ? <ButtonSpinner /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
