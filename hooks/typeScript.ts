let x: number | string = 4;
x = "dinesh";

let name2: String = "dinesh";
let isFresher: boolean = true;

type Student = {
  name: string;
  age: number | string;
  isPassed: boolean;
};

let student: Student = {
  name: "dinesh",
  age: 26,
  isPassed: true,
};

let student2: Student = {
  name: "dinesh",
  age: 23,
  isPassed: true,
};

function add(x: number, y: number): number {
  let sum = x + y;
  return sum;
}

let result = add(3, 4);
type resType = {
  name: "diensh";
  age: 43;
};
function fetchData(): Promise<resType> {
  return fetch("")
    .then((res) => res.json())
    .then((data) => data);
}

fetchData().then();

enum messageType {
  SUCCESS = "success",
  ERROR = "error",
}
let message: messageType = messageType.SUCCESS;

enum Status {
  Pending,
  InProgress,
  Completed,
}

function getStatusMessage(status: Status): string {
  switch (status) {
    case Status.Pending:
      return "Your request is pending.";
    case Status.InProgress:
      return "Your request is being processed.";
    case Status.Completed:
      return "Your request is completed.";
    default:
      return "Unknown status.";
  }
}

console.log(getStatusMessage(Status.InProgress)); // Output: "Your request is being processed."

enum Direction {
  Up = 1,
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

console.log(Direction.Up); // Output: 1
console.log(Direction[1]); // Output: "Up"

enum MixedEnum {
  Yes = "YES",
  No = "NO",
}

console.log(MixedEnum.Yes); // Output: "YES"
console.log(MixedEnum.No); // Output: 0


enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

const userRole : Role = Role.Admin
console.log(Role.Admin); // Output: "ADMIN"
