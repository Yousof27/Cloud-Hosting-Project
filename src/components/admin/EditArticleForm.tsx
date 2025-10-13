/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Article } from "@prisma/client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFormProps {
  article: Article;
}

const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);

  const router = useRouter();

  const FormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "" || description === "") return toast.info("Please, fill all the fields !");
    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, { title, description });
      router.refresh();
      toast.success("Article Updated");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error?.response?.data.message);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={FormSubmitHandler}>
      <input
        id="title"
        className="!mb-4 border rounded !p-2 text-xl bg-white border-none"
        type="text"
        placeholder="Enter Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        id="description"
        className="!mb-4 !p-2 lg:text-xl rounded resize-none bg-white"
        rows={5}
        placeholder="Enter Article Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit" className="text-2xl text-white bg-green-700 hover:bg-green-900 !p-2 rounded font-bold cursor-pointer">
        Edit
      </button>
    </form>
  );
};

export default EditArticleForm;
