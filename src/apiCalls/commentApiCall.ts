import { Comment } from "@prisma/client";
import { DOMAIN } from "@/utils/constants";

// Get All Comments
export async function getAllComments(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });

  if (!response.ok) throw new Error("Faid To Fetch Comments!");

  const data = await response.json();

  const comments: Comment[] = data.comments;

  return comments;
}
