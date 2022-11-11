import { initTRPC } from '@trpc/server';
import * as z from 'zod';

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
});

// export type definition of API
export type AppRouter = typeof appRouter;
