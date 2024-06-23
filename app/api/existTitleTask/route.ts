import { connectMongodb } from "@ext/lib/mongodb";
import Task from "@ext/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectMongodb();
    const searchTask = await Task.findOne({
      title: data.titleInput.trim(),
      email: data.email,
      nameOfProject: data.nameOfProject.trim(),
    });
    if (searchTask) {
      return NextResponse.json({ message: "failure1" }, { status: 500 });
    }
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}
