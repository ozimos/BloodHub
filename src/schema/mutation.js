import { mutationType } from 'nexus';

export default mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOneDonor();
    t.crud.updateOneUser();
    t.crud.updateOneDonor();
  },
});
