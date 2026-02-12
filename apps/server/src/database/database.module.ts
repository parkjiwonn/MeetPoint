import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const DATABASE = Symbol("DATABASE");

export type Database = PostgresJsDatabase<typeof schema>;

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>("DATABASE_URL")!;
        const client = postgres(databaseUrl);
        return drizzle(client, { schema });
      },
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
