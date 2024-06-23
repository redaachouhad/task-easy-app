import { InfoOfProjectState } from "@ext/typing";

export async function getTitlesOfProjects(data: { email: string }) {
  try {
    const response = await fetch("../api/getTitlesOfProjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson: InfoOfProjectState[] = await response.json();
    return resJson;
  } catch (error) {
    throw new Error("Error in getting the names of projects");
  }
}
