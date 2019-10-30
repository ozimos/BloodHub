import request from "supertest";
import faker from "faker";
import {app} from "../app";
import db from "../models";

const { User } = db;
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", 'AB-', 'O+', 'O-'];
const email = faker.internet.email();
const password = faker.random.word();

describe("Donor SignUp Endpoints", () => {
  const donorSignUpInput = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    password,
    verifyPassword: password,
    street: faker.address.streetAddress(),
    lg: faker.address.county(),
    state: faker.address.state(),
    email,
    bloodGroup: faker.random.arrayElement(bloodGroups),
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
    expect(user).toStrictEqual({ firstName, lastName, email: email.toLowerCase() });
  });
});
