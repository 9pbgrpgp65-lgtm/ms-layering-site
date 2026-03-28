import { NextResponse } from "next/server";
import { getIngredients } from "@/lib/notion";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const ingredients = await getIngredients();
  return NextResponse.json(ingredients);
}
