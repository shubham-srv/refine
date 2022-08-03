export type IEmployee = {
  fname: string;
  lname: string;
  age: number;
  designation: string;
  project: string[];
};

export const employeeData: IEmployee[] = [
  {
    fname: "abc",
    lname: "def",
    age: 23,
    designation: "sde",
    project: ["p1", "p2"],
  },
  {
    fname: "abc1",
    lname: "def1",
    age: 24,
    designation: "sde2",
    project: ["p1", "p2", "p3"],
  },
  {
    fname: "abc2",
    lname: "def2",
    age: 25,
    designation: "sde3",
    project: ["p1"],
  },
];
