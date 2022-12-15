import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import { resourceLimits } from "worker_threads";
import { Database } from "../../server/middleware/Database";

export default async function updateDatabase (req: NextApiRequest, res: NextApiResponse) {
    const requestToken = req.body.requestToken;
    if (requestToken !== env.CRON_TOKEN) {
        res.status(401).json({message: 'Unauthorized'});
        return; 
    }
    try {
        Promise.all([
            await Database.updateBarboraItems(), 
            await Database.updateRimiItems(),
            await Database.updateCoopItems(),
            await Database.createStatsForEverything()
        ]);
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
