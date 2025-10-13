/* eslint-disable @typescript-eslint/no-unused-vars */
import { clearCookie } from "@/utils/generateToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method  GET
 * @route   ~/api/user/logout
 * @desc    Logout user
 * @access  public
 */

export async function GET(request: NextRequest) {
  try {
    const cookie = clearCookie();
    const response = NextResponse.json({ message: "Logout successful" }, { status: 200, headers: { "Set-Cookie": cookie } });
    return response;
  } catch (error) {
    return NextResponse.json({ message: `Server Error: ${error}` }, { status: 500 });
  }
}
