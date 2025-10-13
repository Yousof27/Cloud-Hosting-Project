import { prisma } from "@/utils/db";
import { setCookie } from "@/utils/generateToken";
import { RegisterDto, registerSchema, zodErrorFormater } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

/**
 * @method  POST
 * @route   ~/api/user/register
 * @desc    Register a user
 * @access  public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterDto;

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: zodErrorFormater(validation.error) }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json({ message: "Can not use this email, Use Another one" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });

    const cookie = setCookie({
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    });

    return NextResponse.json({ message: "Registered Successfully", user: { ...newUser } }, { status: 201, headers: { "Set-Cookie": cookie } });
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}
