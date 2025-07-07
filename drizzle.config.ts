import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema",
  // Wyświetla monit o potwierdzenie uruchomienia wydrukowanych instrukcji SQL podczas uruchamiania 'drizzle-kit push'.
  strict: true,
  // Wyświetla wszystkie polecenia SQL podczas drizzle-kit push.
  verbose: true,
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
