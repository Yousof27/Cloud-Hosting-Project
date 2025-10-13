/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface UpdateCommentModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  commentId: number;
}

const UpdateCommentModal = ({ setOpenModal, commentId, text }: UpdateCommentModalProps) => {
  const [newText, setNewText] = useState(text);
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, { text: newText });
      setOpenModal(false);
      router.refresh();
      toast.success("Comment Updated");
      setNewText("");
    } catch (error: any) {
      const message = error?.response?.data.message;
      toast.error(message);
      console.log(message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/40 flex justify-center items-center">
      <div className="w-11/12 lg:w-2/4 bg-white rounded-lg !p-3">
        <div className="flex justify-end items-start !mb-5">
          <IoMdCloseCircleOutline className="text-red-500 text-3xl cursor-pointer" onClick={() => setOpenModal(false)} />
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Edit Comment..."
            className="text-xl rounded-lg !p-2 w-full bg-white !mb-2"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button type="submit" className="bg-green-700 w-full text-white !mt-2 !p-1 text-xl rounded-lg hover:bg-green-900 transition">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
