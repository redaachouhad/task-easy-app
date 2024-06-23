import { connectMongodb } from "@ext/lib/mongodb";
import Task from "@ext/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectMongodb();
    await Task.updateOne(
      {
        _id: data.cible._id,
        email: data.cible.email,
        nameOfProject: data.cible.nameOfProject,
        title: data.cible.title,
        type: data.cible.type,
      },
      { $set: { type: data.type } }
    );
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}
