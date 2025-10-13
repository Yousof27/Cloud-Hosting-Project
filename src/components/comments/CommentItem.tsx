import { CommentWithUser } from "@/utils/types";
import CommentButtons from "./CommentButtons";

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}

const CommentItem = ({ comment, userId }: CommentItemProps) => {
  return (
    <div className="!mb-5 rounded-lg !p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between !mb-2">
        <strong className="text-gray-800 uppercase">{comment.user.username}</strong>
        <span className="bg-yellow-700 !px-1 rounded-lg text-white">{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-800 !mb-2">{comment.text}</p>
      <CommentButtons text={comment.text} commentId={comment.id} commentOwnerId={comment.userId} userId={userId} />
    </div>
  );
};

export default CommentItem;
