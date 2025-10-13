/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const [text, setText] = useState("");

  const router = useRouter();

  const FormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) return toast.info("Please write something");
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      setText("");
      toast.success("Comment Created");
    } catch (error: any) {
      if (error.status === 401) {
        toast.info("Please, Login First");
        router.replace("/login");
      } else {
        toast.error(error?.response?.data.message);
      }
    }
  };

  return (
    <form onSubmit={FormSubmitHandler}>
      <input
        id="comment"
        className="rounded-lg text-xl !p-2 w-full bg-white focus:shadow-md"
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="bg-green-700 text-white !mt-2 !p-1 w-min text-xl rounded-lg hover:bg-green-900 cursor-pointer transition">
        Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
