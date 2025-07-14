import { data } from "@/drizzle/data";

export type PostT = (typeof data)[number] & {
  id: string;
};