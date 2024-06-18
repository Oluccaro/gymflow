import { Student } from "./StudentModel";

export type Finance = {
    id: number;
    student: Student;
    dueDate: String;
    amountOwed: number;
    amountPaid: number;
  };
  