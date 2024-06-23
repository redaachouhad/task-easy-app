import { connectMongodb } from "@ext/lib/mongodb";
import Project from "@ext/models/Project";
import Task from "@ext/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectMongodb();
    await Project.deleteOne({
      email: data.email,
      title: data.nameOfProjectInput,
    });
    await Task.deleteMany({
      email: data.email,
      nameOfProject: data.nameOfProjectInput,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}
