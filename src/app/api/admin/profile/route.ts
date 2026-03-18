import { adminProfile } from "@/lib/admin-profile";

export async function GET() {
  return Response.json(adminProfile);
}
