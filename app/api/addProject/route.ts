import { connectMongodb } from "@ext/lib/mongodb";
import Project from "@ext/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectMongodb();
    const newProject = new Project({
      email: data.email,
      title: data.title,
    });
    await newProject.save();
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "failure" });
  }
}
