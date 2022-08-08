const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Mike",
  email: "mike@example.com",
  password: "56what!!",
};

beforeEach(async () => {
  await User.deleteMany();
  const user = new User(userOne);
  await user.save();
});

afterEach(() => {
  console.log("afterEach");
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Zaid",
      email: "zaid@gmail.com",
      password: "zaid1234",
    })
    .expect(201);
});

test("Should logged in exciting user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      passsword: "thisisnotmypass",
    })
    .expect(400);
});
