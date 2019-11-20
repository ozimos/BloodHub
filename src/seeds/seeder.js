// eslint-disable-next-line import/no-extraneous-dependencies
import { Photon } from '@generated/photon';

import { initialDonor } from './seedData';

const photon = new Photon();

async function main() {
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
