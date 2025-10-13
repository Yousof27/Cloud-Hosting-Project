/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteArticleButtonProps {
  articleId: number;
}

const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
  const router = useRouter();

  const deleteArticleHandler = async () => {
    try {
      await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
      router.refresh();
      toast.success("Article Deleted");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <div
      onClick={deleteArticleHandler}
      className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center !py-1 !px-2 hover:bg-red-800 transition"
    >
      Delete
    </div>
  );
};

export default DeleteArticleButton;
