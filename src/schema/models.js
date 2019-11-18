import { objectType, interfaceType, inputObjectType } from "nexus";

const userBasic = [
  {name: "firstName", value: { description: "First Name" }},
  {name: "lastName", value: { description: "Last Name" }}
];

const userExtra = [
  {name: "phone", value: { description: "First Name", required: false, }},
  {name: "street", value: { description: "Last Name" }},
  {name: "lg", value: { description: "Local Government" }},
  {name: "state", value: { description: "State" }},
]

const userLogin = [
  {name: "password", value: { description: "Password" }},
  {name: "email", value: { description: "Email" }}
];

const UserRegisterInput = inputObjectType({
  name: "UserRegisterInput",
  definition(t) {
    userBasic.forEach(field => t.string(field.name, field.value))
    userLogin.forEach(field => t.string(field.name, {required: true, ...field.value}))
    userExtra.forEach(field => t.string(field.name, field.value))
  }
});

const UserBasic = interfaceType({
  name: "UserBasic",
  definition(t) {
    t.int("id", { description: "ID" });
    userBasic.forEach(field => t.string(field.name, field.value))
    t.resolveType(field => t.model("User")[field]());
  }
});

const UserLoginInput = inputObjectType({
  name: "UserLoginInput",
  definition(t) {
    userLogin.forEach(field => t.string(field.name, {required: true, ...field.value}))
  }
});

const UserExtra = interfaceType({
  name: "UserExtra",
  definition(t) {
    userLogin.forEach(field => t.string(field.name, {required: true, ...field.value}))
    userExtra.forEach(field => t.string(field.name, field.value))
    t.resolveType(field => t.model("User")[field]());
  }
});

const User = objectType({
  name: "User",
  definition(t) {
    t.implements("UserBasic");
    t.implements("UserExtra");
    t.model.donor();
    t.model.createdAt();
    t.model.updatedAt();
    t.boolean("isDonor", {
      resolve({ donor }) {
        return Boolean(donor);
      }
    });
  }
});

const UserLoginPayload = objectType({
  name: "UserLoginPayload",
  definition(t) {
    t.field("user", {
      type: "User"
    });
    t.string("token");
  }
});


const Donor = objectType({
  name: "Donor",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.bloodGroup();
    t.model.document();
    t.model.createdAt();
    t.model.updatedAt();
  }
});

const Hospital = objectType({
  name: "Hospital",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.street();
    t.model.lg();
    t.model.state();
    t.model.createdAt();
    t.model.updatedAt();
  }
});

const BloodRequest = objectType({
  name: "BloodRequest",
  definition(t) {
    t.model.id();
    t.model.requester();
    t.model.bloodGroup();
    t.model.hospital();
    t.model.status();
    t.model.createdAt();
    t.model.updatedAt();
  }
});


export default [
  UserBasic,
  UserExtra,
  User,
  UserRegisterInput,
  Donor,
  Hospital,
  BloodRequest,
  UserLoginPayload,
  UserLoginInput,
];
