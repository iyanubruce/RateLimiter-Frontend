import { z } from "zod";
import { config } from "dotenv";
// const StringBooleanSchema = z
//   .union(
//     [z.literal("true"), z.literal("false"), z.literal("1"), z.literal("0")],
//     {
//       invalid_type_error:
//         "Invalid boolean value: expected 'true', 'false', '1', or '0'",
//     }
//   )
//   .transform((v) => v === "true" || v === "1");

config();
const EnvSchema = z.object({
  BACK_END_URL: z.string().default("https://api.ratelimitr.com/v1"),
});

export type Env = z.infer<typeof EnvSchema>;

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(result.error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

const env = result.data;

export default env;
