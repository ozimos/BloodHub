import bcrypt from 'bcrypt';

export const password = 'somepassword';
const hash = bcrypt.hashSync(password, 10);
export const initialDonor = {
  firstName: 'Betty',
  lastName: 'Jane',
  email: 'joker@random2.com',
  phone: '08133248846',
  password: hash,
  donor: {
    create: {
      bloodGroup: 'A_positive',
    },
  },
};
