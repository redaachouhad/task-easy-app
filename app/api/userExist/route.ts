import { connectMongodb } from "@ext/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectMongodb();
    console.log(await req.json());
  } catch (error) {
    console.log(error);
  }
}
