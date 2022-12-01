import { initTRPC } from '@trpc/server';
import * as z from 'zod';
import { Compare } from '../lib/Compare';
import { Database } from '../middleware/Database';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
    mongodbTest: publicProcedure    
        .query(async () => {
            const allCategories = await Database.getCategories();
            // console.log(allCategories);
            return allCategories;
        }),
    addProduct: publicProcedure
        .input(z.object({
            category: z.string(),
            name: z.string(),
            rimi_price: z.optional(z.number()),
            barbora_price: z.optional(z.number()),
            selver_price: z.optional(z.number()),
            coop_price: z.optional(z.number()),
            statistics: z.optional(z.array(z.object({
                date: z.date(),
                min_price: z.number(),
                avg_price: z.number(),
                max_price: z.number()
            })))
        }))
        .mutation(async ({ input }) => {
            // console.log(input);
            // if (input != null) await Database.addProduct(input)
        }),
    storeItems: publicProcedure
        .mutation(async () => {
            await Database.updateBarboraItems();
            await Database.updateRimiItems();
            // await Database.createStatsForEverything();
        }),
    findItem: publicProcedure    
        .input(z.object({ title: z.string() }))
        .query(async ({ input }) => {
            const findItems = await Compare.compareCommonItem(input.title);
            return findItems;
        })
});

// export type definition of API
export type AppRouter = typeof appRouter;