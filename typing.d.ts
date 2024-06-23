export interface InfoOfProjectState {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TableOfProjectsState {
  value: InfoOfProjectState[];
  loading?: boolean;
  error?: string | null;
}

// type for task:

interface Task {
  id: string;
  title: string;
}

interface AllTasks {
  todo: Task[];
  inprogress: Task[];
  done: Task[];
}

export interface oneItemFromBigListOfTask {
  _id: String;
  email: String;
  nameOfProject: String;
  title: String;
  urlImage: String;
  dateTimeFrom: String;
  dateTimeTo: String;
  type: String;
  nameOfImage: String;
  createdAt: String;
  updatedAt: String;
}

export interface bigListOfTask {
  todo: oneItemFromBigListOfTask[];
  inprogress: oneItemFromBigListOfTask[];
  done: oneItemFromBigListOfTask[];
}

export interface allTasksProps {
  value: bigListOfTask;
}
