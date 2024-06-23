"use client";

import Board from "@ext/components/Board";
import WindowAddTask from "@ext/components/WindowAddTask";
import WindowDeleteProject from "@ext/components/WindowDeleteProject";
import WindowDeleteTask from "@ext/components/WindowDeleteTask";
import WindowUpdateTask from "@ext/components/WindowUpdateTask";

function BoardPage() {
  return (
    <>
      <Board />
      <WindowAddTask />
      <WindowDeleteProject />
      <WindowDeleteTask />
      <WindowUpdateTask />
    </>
  );
}

export default BoardPage;
