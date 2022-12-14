import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { resourceLimits } from "worker_threads";
import { Database } from "../../server/middleware/Database";

async function updateDatabase(req: NextApiRequest, res: NextApiResponse) {
    try {
        Promise.all([
            Database.updateBarboraItems(), 
            Database.updateRimiItems(),
            Database.updateCoopItems(),
            Database.createStatsForEverything()
        ]).then(() => {
            res.status(200).end();
        });
    } catch (error) {
        console.log("error: " + error);
        res.status(500).end();
    }
}

export default verifySignature(updateDatabase);

export const config = {
  api: {
    bodyParser: false,
  },
};
