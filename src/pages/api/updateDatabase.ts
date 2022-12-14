import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../server/middleware/Database";

async function updateDatabase(req: NextApiRequest, res: NextApiResponse) {
    // await ;
    // await Database.updateRimiItems();
    // await Database.updateCoopItems();
    // await Database.createStatsForEverything();
    Promise.allSettled([Database.updateBarboraItems()]);
    return res.status(200).json({});
}

export default verifySignature(updateDatabase);

export const config = {
  api: {
    bodyParser: false,
  },
};
