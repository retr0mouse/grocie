import { initTRPC } from '@trpc/server';
import * as z from 'zod';
import { Database } from '../middleware/Database';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
    hello: publicProcedure    
    .input(
        z
          .object({
            text: z.string().nullish(),
          })
          .nullish(),
      )
      .query(({ input }) => {
        return {
          greeting: `hello ${input?.text ?? 'world'}`,
        };
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
          if (input != null) await Database.addProducts([input])
      }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
