import { Student } from "./StudentModel";

export type StudentWithDebt = {
    student: Student;
    haveOpenDebt: boolean;
  };
  