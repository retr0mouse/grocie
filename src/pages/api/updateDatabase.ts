import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import { Database } from "../../server/middleware/Database";
import { verifySignature } from "@upstash/qstash/nextjs";

async function updateDatabase(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization;
    if (token !== env.CRON_TOKEN) {
        res.status(401).json({ error: 'Unauthorized'});
        return;
    }

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
