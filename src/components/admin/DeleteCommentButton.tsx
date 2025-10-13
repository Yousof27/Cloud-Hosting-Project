/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentButtonProps {
  id: number;
}

const DeleteCommentButton = ({ id }: DeleteCommentButtonProps) => {
  const router = useRouter();
  const deleteCommentHandler = async () => {
    try {
      await axios.delete(`${DOMAIN}/api/comments/${id}`);
      router.refresh();
      toast.success("Comment Deleted");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <button
      className="bg-red-600 text-white rounded-lg inline-block !py-1 !px-2 cursor-pointer hover:bg-red-800 transition"
      onClick={deleteCommentHandler}
    >
      Delete
    </button>
  );
};

export default DeleteCommentButton;
