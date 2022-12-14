import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../server/middleware/Database";

async function updateDatabase(req: NextApiRequest, res: NextApiResponse) {

    Promise.allSettled([
        await Database.updateBarboraItems(),
        await Database.updateRimiItems(),
        await Database.updateCoopItems(),
        await Database.createStatsForEverything(),
    ]);
    
    return res.status(200);
}

export default verifySignature(updateDatabase);

export const config = {
  api: {
    bodyParser: false,
  },
};
