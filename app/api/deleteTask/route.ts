import { connectMongodb } from "@ext/lib/mongodb";
import Task from "@ext/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectMongodb();
    await Task.deleteOne(data);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}
