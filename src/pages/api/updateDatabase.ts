import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { resourceLimits } from "worker_threads";
import { Database } from "../../server/middleware/Database";

const updateDatabase = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await Database.updateBarboraItems(), 
        await Database.updateRimiItems(),
        await Database.updateCoopItems(),
        await Database.createStatsForEverything()
        res.status(200);
        res.send("OK");
        return;
    } catch (error) {
        console.error((error as Error).message)
        res.status(500).json({ error: (error as Error).message })
    } finally {
        res.end();
    }
}

export default verifySignature(updateDatabase);

export const config = {
  api: {
    bodyParser: false,
  },
};
