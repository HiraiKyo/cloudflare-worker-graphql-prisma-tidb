import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import { createContext } from './context';

interface Env {
  DATABASE_URL: string;
}
// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema });

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const context = createContext(env.DATABASE_URL);
    const response = await yoga(request, ctx);
    await context.db.$disconnect();
    return response;
  },
};