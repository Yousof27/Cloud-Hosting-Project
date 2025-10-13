import { getAllComments } from "@/apiCalls/commentApiCall";
import DeleteCommentButton from "@/components/admin/DeleteCommentButton";
import { cookies } from "next/headers";
import React from "react";

const AdminCommentsPage = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwtToken")?.value;

  const comments = await getAllComments(token || "");

  return (
    <section className="!p-5">
      <h1 className="!mb-7 text-2xl font-semibold text-gray-700">Comments</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 text-xl">
          <tr>
            <th className="!p-2">Comment</th>
            <th className="hidden lg:inline-block !p-3">Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id} className="border-b border-t border-gray-300">
              <td className="!p-3 text-gray-700">{comment.text}</td>
              <td className="text-gray-700 !p-3 font-normal hidden lg:inline-block">{new Date(comment.createdAt).toDateString()}</td>
              <td>
                <DeleteCommentButton id={comment.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminCommentsPage;
