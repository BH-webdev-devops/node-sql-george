interface User {
    id: number;
    name: string;
    email: string;  
}

let users: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

export default users;