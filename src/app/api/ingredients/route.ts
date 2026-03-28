import { NextResponse } from "next/server";
import { getIngredients } from "@/lib/notion";

export const revalidate = 60; // Revalidate every minute

export async function GET() {
  const ingredients = await getIngredients();
  return NextResponse.json(ingredients);
}
