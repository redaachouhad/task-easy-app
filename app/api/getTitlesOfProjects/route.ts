import { connectMongodb } from "@ext/lib/mongodb";
import Project from "@ext/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectMongodb();
    const foundProjects = await Project.find(
      { email: data?.email },
      { title: true, _id: false, createdAt: true, updatedAt: true }
    ).sort({ createdAt: 1 });
    return NextResponse.json(foundProjects);
  } catch (error) {
    console.log(error);
  }
}
