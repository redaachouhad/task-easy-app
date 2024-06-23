import { connectMongodb } from "@ext/lib/mongodb";
import Task from "@ext/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectMongodb();
    const newTask = new Task({
      email: data.email,
      nameOfProject: data.nameOfProject.trim(),
      title: data.titleInput.trim(),
      dateTimeFrom: data.dateTimeFromInput,
      dateTimeTo: data.dateTimeToInput,
      type: data.typeInput,
      urlImage: data.urlImageInput,
      nameOfImage: data.nameOfImageInput,
    });
    await newTask.save();
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}
