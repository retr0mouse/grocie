import { initTRPC } from '@trpc/server';
import * as z from 'zod';
import { Compare } from '../lib/Compare';
import { Parser } from '../lib/Parser';
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
            await Database.updateCoopItems();
            await Database.createStatsForEverything();
        }),
    findItem: publicProcedure
        .input(z.object({ title: z.string() }))
        .query(async ({ input }) => {
            if (input.title.length > 0 ) {
                const findItems = await Database.findTenSimilarItemsByTitle(input.title);
                return findItems;
            }
            return null;
        }),
    getItem: publicProcedure
        .input(z.object({ title: z.string().nullish() }).nullish())
        .query(async ({ input }) => {
            if (input?.title && input.title.length > 0 ) {
                const foundItem = await Database.getProduct(input.title);
                return foundItem;
            } else {
                return null
            }
        })
});

// export type definition of API
export type AppRouter = typeof appRouter;
