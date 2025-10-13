/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/utils/db";
import { setCookie } from "@/utils/generateToken";
import { LoginDto, loginSchema, zodErrorFormater } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method  POST
 * @route   ~/api/user/login
 * @desc    Login a user
 * @access  public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginDto;

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: zodErrorFormater(validation.error) }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user) {
      return NextResponse.json({ message: "Email or Password is wrong !" }, { status: 400 });
    }

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Email or Password is wrong !" }, { status: 400 });
    }

    const cookie = setCookie({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    });

    const { password, ...userData } = user;

    return NextResponse.json({ message: "Welcome Back :)", user: { ...userData } }, { status: 201, headers: { "Set-Cookie": cookie } });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}
