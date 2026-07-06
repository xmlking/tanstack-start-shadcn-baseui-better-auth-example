import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/lib/schema/index.ts", // Path to your schema file
  out: "./drizzle", // Your migrations folder
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string
  }
})
