import { connectMongodb } from "@ext/lib/mongodb";
import Project from "@ext/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectMongodb();
    const searchProject = await Project.findOne({
      email: data.email,
      title: data.title,
    });
    if (!searchProject) {
      return NextResponse.json({ message: "noExist" });
    }
    return NextResponse.json({ message: "exist" });
  } catch (error) {
    return NextResponse.json({ message: "failure" });
  }
}
