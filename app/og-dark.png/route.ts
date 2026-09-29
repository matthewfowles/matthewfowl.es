import { shareImage } from "@/lib/metadata-image";

export async function GET() {
  return shareImage("en", "dark");
}
