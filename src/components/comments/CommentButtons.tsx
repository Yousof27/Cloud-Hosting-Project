/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface CommentButtonsProps {
  text: string;
  commentId: number;
  commentOwnerId: number;
  userId: number | undefined;
}

const CommentButtons = ({ commentId, text, commentOwnerId, userId }: CommentButtonsProps) => {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const removeCommentHandler = async () => {
    try {
      await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
      router.refresh();
      toast.success("Comment Deleted");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error?.response?.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-end items-center">
        {commentOwnerId === userId && userId && (
          <>
            <FaEdit className="text-green-600 text-xl cursor-pointer !me-3" onClick={() => setOpenModal(true)} />
            <FaTrash className="text-red-600 text-xl cursor-pointer" onClick={removeCommentHandler} />
          </>
        )}
      </div>
      {openModal && <UpdateCommentModal setOpenModal={setOpenModal} text={text} commentId={commentId} />}
    </>
  );
};

export default CommentButtons;
