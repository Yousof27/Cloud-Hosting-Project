import { prisma } from "@/utils/db";
import { UpdateCommentDto, updateCommentSchema, zodErrorFormater } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface UserCommentProps {
  params: Promise<{ id: string }>;
}

/**
 * @method  PUT
 * @route   ~/api/comments
 * @desc    Update Comment
 * @access  private (Only comment Owner)
 */

export async function PUT(request: NextRequest, { params }: UserCommentProps) {
  try {
    const { id: commentId } = await params;

    const comment = await prisma.comment.findUnique({ where: { id: +commentId } });

    if (!comment) {
      return NextResponse.json({ message: "Comment Not Found !" }, { status: 404 });
    }

    const { id: userId } = verifyToken(request);

    if (comment?.userId !== userId) {
      return NextResponse.json({ message: "Only comment owner can edit, Forbidden !" }, { status: 403 });
    }

    const body = (await request.json()) as UpdateCommentDto;

    const validation = updateCommentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: zodErrorFormater(validation.error) }, { status: 400 });
    }

    const newComment = await prisma.comment.update({
      where: { id: +commentId },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json({ message: "Comment Updated Successfully", newComment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}

/**
 * @method  DELETE
 * @route   ~/api/comments
 * @desc    Delete Comment
 * @access  private (comment Owner OR Admin)
 */

export async function DELETE(request: NextRequest, { params }: UserCommentProps) {
  try {
    const { id: commentId } = await params;

    const comment = await prisma.comment.findUnique({ where: { id: +commentId } });

    if (!comment) {
      return NextResponse.json({ message: "Comment Not Found !" }, { status: 404 });
    }

    const { id: userId, isAdmin } = verifyToken(request);

    if (comment?.userId !== userId && !isAdmin) {
      return NextResponse.json({ message: "Only comment owner or admin can delete the comment, Forbidden !" }, { status: 403 });
    }

    await prisma.comment.delete({ where: { id: +commentId } });

    return NextResponse.json({ message: "Comment Deleted Successfully", comment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}
