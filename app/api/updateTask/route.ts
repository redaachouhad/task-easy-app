import { connectMongodb } from "@ext/lib/mongodb";
import Task from "@ext/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let { cibleData, updateData } = await req.json();
    await connectMongodb();
    if (!updateData.nameOfProject) {
      updateData.nameOfProject = cibleData.nameOfProject;
    }

    if (!updateData.titleInput) {
      updateData.titleInput = cibleData.title;
    }

    if (!updateData.urlImageInput) {
      updateData.urlImageInput = cibleData.urlImage;
    }

    if (!updateData.dateTimeFromInput) {
      updateData.dateTimeFromInput = cibleData.dateTimeFrom;
    }

    if (!updateData.dateTimeToInput) {
      updateData.dateTimeToInput = cibleData.dateTimeTo;
    }

    if (!updateData.typeInput) {
      updateData.typeInput = cibleData.type;
    }

    await Task.updateOne(cibleData, {
      $set: {
        nameOfProject: updateData.nameOfProject,
        title: updateData.titleInput,
        urlImage: updateData.urlImageInput,
        dateTimeFrom: updateData.dateTimeFromInput,
        dateTimeTo: updateData.dateTimeToInput,
        type: updateData.typeInput,
      },
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}
