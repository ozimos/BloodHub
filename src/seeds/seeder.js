// eslint-disable-next-line import/no-extraneous-dependencies
import { Photon } from '@generated/photon';

import { initialDonor } from './seedData';

const photon = new Photon();

async function main() {
  const user = await photon.users.findOne({
    where: { email: initialDonor.email },
    select: { email: true },
  });
  if (user && user.email) return;
  await photon.users.create({ data: initialDonor });
}
if (process.env.CI) {
  main()
    // eslint-disable-next-line no-console
    .catch(console.error)
    .finally(async () => {
      await photon.disconnect();
    });
}
