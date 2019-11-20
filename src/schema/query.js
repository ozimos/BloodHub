import { objectType } from 'nexus';

export default objectType({
  name: 'Query',
  definition(t) {
    t.crud.user();
    t.crud.donors();
    t.crud.hospitals();
    t.field('getCurrentUser', {  
      type: 'User',  
      nullable: true, 
      async resolve(root, args, context, info) {  
        return context.currentUser  
      },  
    })
  },
});
