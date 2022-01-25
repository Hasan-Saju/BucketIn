import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Dihan Ahmed",
    email: "dihan@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Rahat Ahmed",
    email: "rahat@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
