import { Database } from "../../server/middleware/Database";

export default async function updateDatabase() {
    await Database.updateBarboraItems();
    await Database.updateRimiItems();
    await Database.updateCoopItems();
    await Database.createStatsForEverything();
}
