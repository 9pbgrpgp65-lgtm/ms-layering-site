import { NextResponse } from "next/server";
import { getProducts } from "@/lib/notion";

export const revalidate = 60; // Revalidate every minute

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}
