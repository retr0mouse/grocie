import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { resourceLimits } from "worker_threads";
import { Database } from "../../server/middleware/Database";

async function updateDatabase(req: NextApiRequest, res: NextApiResponse) {
    try {
        Promise.all([
            // await Database.updateBarboraItems(), 
            await Database.updateRimiItems(),
            await Database.updateCoopItems(),
            await Database.createStatsForEverything()
        ]);
    } catch (error) {
        console.log("error: " + error);
    }
    res.status(200).end();
}

export default verifySignature(updateDatabase);

export const config = {
  api: {
    bodyParser: false,
  },
};
