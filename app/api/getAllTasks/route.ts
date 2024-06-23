import { connectMongodb } from "@ext/lib/mongodb";
import Task from "@ext/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectMongodb();
    const alltasks = await Task.find({
      email: data.email,
      nameOfProject: data.nameOfProject,
    }).sort({ updatedAt: 1 });

    return NextResponse.json(
      { message: "success", finalData: alltasks },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}
