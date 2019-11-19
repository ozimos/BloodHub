import { mutationType, arg } from "nexus";
import { signIn, register } from "../auth";

export default mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOneDonor();
    t.crud.updateOneUser();
    t.crud.updateOneDonor();
    t.field("userLogin", {
      type: "UserAuthPayload",
      args: {
        data: arg({ type: "UserLoginInput"})
      },
      async resolve(root, {data:  {email, password} }, { photon }) {
        const response = await signIn(email, password, photon);
        return response;
      }
    });
    t.field("userRegister", {
      type: "UserAuthPayload",
      args: {
        data: arg({ type: "UserCreateInput"}),
      },
      async resolve(root, {data}, { photon }) {
        const response = await register(data, photon);
        return response;
      }
    });
  }
});
