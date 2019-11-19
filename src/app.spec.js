import { Photon } from "@generated/photon";
import { createTestClient } from "apollo-server-testing";
import schema from "./schema";
import { initialDonor, password } from "./seeds/seedData";
import { ApolloServer, gql } from "apollo-server";

const photon = new Photon();

const server = new ApolloServer({
  schema,
  context: { photon }
});

const testUser = {
  firstName: "Jane",
  lastName: "Doe",
  email: "test@email.com",
  phone: "08134567899",
  password: "password"
};

describe("Auth Tests", () => {
  beforeAll(async () => {
    const { email } = testUser;
    try {
      await photon.users.delete({ where: { email } });
    } catch (err) {
      console.log("DB already migrated! Hurrah!!!");
    }
  });

  afterAll(async () => {
    await photon.disconnect();
  });

  it("registers a new user", async () => {
    const REGISTER_USER = gql`
      mutation userRegister($data: UserCreateInput!) {
        userRegister(data: $data) {
          user {
            firstName
            lastName
            isDonor
          }
          token
        }
      }
    `;
    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: REGISTER_USER,
      variables: { data: { ...testUser, password } }
    });
    const { user, token } = res.data.userRegister;
    expect({ ...testUser, isDonor: false }).toMatchObject(user);
    expect(token).toBeString();
  });

  it("logs in an existing user", async () => {
    const { email, donor, ...rest } = initialDonor;

    const LOGIN_USER = gql`
      mutation userLogin($data: UserLoginInput!) {
        userLogin(data: $data) {
          user {
            firstName
            lastName
            isDonor
          }
          token
        }
      }
    `;
    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: LOGIN_USER,
      variables: { data: { email, password } }
    });
    const { user, token } = res.data.userLogin;
    expect({ ...rest, email, isDonor: true }).toMatchObject(user);
    expect(token).toBeString();
  });
});