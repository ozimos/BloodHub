import { mutationType, stringArg, arg } from "nexus";
import { signIn, register } from "../auth";

export default mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOneDonor();
    t.crud.updateOneUser();
    t.crud.updateOneDonor();
    t.field("userLogin", {
      type: "UserLoginPayload",
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true })
      },
      async resolve(root, { email, password }, { prisma }) {
        const response = await signIn(email, password, prisma);
        return response;
      }
    });
    t.field("userRegister", {
      type: "UserLoginPayload",
      args: {
        data: arg({ type: "User", required: true }),
      },
      async resolve(root, args, { prisma }) {
        const response = await register(args, prisma);
        return response;
      }
    });
  }
});
