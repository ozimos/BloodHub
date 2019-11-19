import { Photon } from "@generated/photon";

import { initialDonor } from "./seedData";
const photon = new Photon();


async function main() {
  await photon.users.create({ data: initialDonor });
}
if (process.env.CI) {
  main()
    .catch(e => console.error(e))
    .finally(async () => {
      await photon.disconnect();
    });
}
