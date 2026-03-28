import { NextResponse } from "next/server";
import { getProducts } from "@/lib/notion";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}
