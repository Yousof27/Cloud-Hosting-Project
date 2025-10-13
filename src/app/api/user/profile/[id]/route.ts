/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { clearCookie } from "@/utils/generateToken";
import { NextRequest, NextResponse } from "next/server";
import { UpdateProfileDto, updateProfileSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";

interface UserAccountProps {
  params: Promise<{ id: string }>;
}

/**
 * @method  DELETE
 * @route   ~/api/user/profile/:id
 * @desc    Delete user account
 * @access  private
 */

export async function DELETE(request: NextRequest, { params }: UserAccountProps) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({ where: { id: +id }, include: { comments: true } });

    if (!user) {
      return NextResponse.json({ message: "This user is not exists" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken.id !== user.id) {
      return NextResponse.json({ message: "Only Account Owner Can Delete It, Forbidden !" }, { status: 403 }); // Forbidden
    }

    await prisma.user.delete({ where: { id: +id } });

    const commentsIds: number[] = user?.comments.map((comment) => comment.id);

    await prisma.comment.deleteMany({ where: { id: { in: commentsIds } } });

    const cookie = clearCookie();

    return NextResponse.json({ message: "Deleted Successfully", user }, { status: 200, headers: { "Set-Cookie": cookie } });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}

/**
 * @method  GET
 * @route   ~/api/user/profile/:id
 * @desc    Get user account
 * @access  private
 */

export async function GET(request: NextRequest, { params }: UserAccountProps) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id: +id },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found !" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken.id !== +id) {
      return NextResponse.json({ message: "Forbidden !" }, { status: 403 });
    }

    return NextResponse.json({ message: "Get User Successfully", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}

/**
 * @method  PUT
 * @route   ~/api/user/profile/:id
 * @desc    Update user account
 * @access  private
 */

export async function PUT(request: NextRequest, { params }: UserAccountProps) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({ where: { id: +id } });

    if (!user) {
      return NextResponse.json({ message: "User Not Found !" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken.id !== +id) {
      return NextResponse.json({ message: "Forbidden !" }, { status: 403 });
    }

    const body = (await request.json()) as UpdateProfileDto;

    const validation = updateProfileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.message }, { status: 400 });
    }

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: +id },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const { password, ...userData } = updatedUser;

    return NextResponse.json({ message: "Data Updated Successfully", userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}
