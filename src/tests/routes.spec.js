import request from "supertest";
import app from "../app";
import db from "../models";

const { User } = db;
describe("Donor SignUp Endpoints", () => {
  const donorSignUpInput = {
    firstName: "assad",
    lastName: "hakeem",
    phone: "0812345",
    password: "asd",
    verifyPassword: "asd",
    street: "asd",
    lg: "asd",
    state: "adf",
    email: "asd",
    bloodGroup: "A+",
    document: "asd"
  };

  beforeAll(() => {
    return User.truncate({ cascade: true });
  });
  it("should signup a new donor", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send(donorSignUpInput);
    expect(res.statusCode).toEqual(201);
    const { message, user } = res.body;
    const { firstName, lastName, email } = donorSignUpInput;
    expect(message).toBe("Your account has been created!, Your details");
    expect(user).toStrictEqual({ firstName, lastName, email });
  });
});
