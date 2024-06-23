import { connectMongodb } from "@ext/lib/mongodb";
import User from "@ext/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    await connectMongodb();
    const verifyUser = await User.findOne({ email: data.email });
    if (verifyUser) {
      return NextResponse.json({
        message: "failure",
      });
    }

    const newUser = new User({
      email: data.email,
      name: data.name,
      password: data.password,
      googleId: null,
    });

    await newUser.save();
    return NextResponse.json({ message: "success" });
  } catch (error) {}
}
