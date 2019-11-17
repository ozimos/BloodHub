import { objectType } from 'nexus';

export default objectType({
  name: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.donors();
    t.crud.hospitals();
  },
});
