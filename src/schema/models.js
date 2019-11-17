import { objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.phone();
    t.model.street();
    t.model.lg();
    t.model.state();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.password();
    t.model.email();
    t.model.donor();
    t.boolean("isDonor", {
      resolve({donor}){
        return Boolean(donor)
      }
    })
  },
});

const Donor = objectType({
  name: 'Donor',
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.bloodGroup();
    t.model.document();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Hospital = objectType({
  name: 'Hospital',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.street();
    t.model.lg();
    t.model.state();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const BloodRequest = objectType({
  name: 'BloodRequest',
  definition(t) {
    t.model.id();
    t.model.requester();
    t.model.bloodGroup();
    t.model.hospital();
    t.model.status();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

export default [User, Donor, Hospital, BloodRequest];
