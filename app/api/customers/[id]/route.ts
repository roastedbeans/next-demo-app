import { NextResponse } from "next/server";
import { readCustomer } from "@/lib/customers";
import { getProfile } from "@/lib/dal";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await getProfile(request);
  if (!profile) return new NextResponse("", { status: 401 });
  const { id } = await params;
  const row = await readCustomer(id);
  return row ? NextResponse.json(row) : new NextResponse("", { status: 404 });
}
