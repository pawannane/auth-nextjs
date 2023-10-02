import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    const user = await User.findOne({ forgotPasswordToken: token, fogotPasswordTokenExpiry: { $gt: Date.now() } });

    if(!user){
      return NextResponse.json({error: "Invalid token"}, {status: 400});
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.fogotPasswordTokenExpiry = undefined;

    return NextResponse.json({ 
      message: "Password updated successfully", 
      success: true 
    });

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}