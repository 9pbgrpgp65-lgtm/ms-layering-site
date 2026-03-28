import { Client } from "@notionhq/client";
import type { Product, Accord, Seasons } from "@/data/products";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_INGREDIENTS_DB_ID || "";
const PARFUMS_DB_ID = process.env.NOTION_PARFUMS_DB_ID || "";

export type NotionIngredient = {
  name: string;
  slug: string;
  imageUrl: string | null;
  category: string;
};

export async function getIngredients(): Promise<NotionIngredient[]> {
  if (!DATABASE_ID || !process.env.NOTION_API_KEY) {
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 100,
    });

    const ingredients: NotionIngredient[] = [];

    for (const page of response.results) {
      if (!("properties" in page)) continue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = page.properties as any;

      const name = getText(props.Name);
      const slug = getText(props.Slug);
      const category = getText(props.Category);
      const imageUrl = getFileUrl(props.Image);

      if (name) {
        ingredients.push({ name, slug, imageUrl, category });
      }
    }

    // Handle pagination if more than 100
    let nextCursor = response.has_more ? response.next_cursor : null;
    while (nextCursor) {
      const next = await notion.databases.query({
        database_id: DATABASE_ID,
        page_size: 100,
        start_cursor: nextCursor,
      });
      for (const page of next.results) {
        if (!("properties" in page)) continue;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const props = page.properties as any;
        const name = getText(props.Name);
        const slug = getText(props.Slug);
        const category = getText(props.Category);
        const imageUrl = getFileUrl(props.Image);
        if (name) {
          ingredients.push({ name, slug, imageUrl, category });
        }
      }
      nextCursor = next.has_more ? next.next_cursor : null;
    }

    return ingredients;
  } catch {
    console.error("Failed to fetch ingredients from Notion");
    return [];
  }
}

// Helper to extract text from Notion properties
function getText(prop: unknown): string {
  const p = prop as { type?: string; title?: { plain_text: string }[]; rich_text?: { plain_text: string }[]; select?: { name: string } | null };
  if (p?.type === "title") return p.title?.map((t) => t.plain_text).join("") || "";
  if (p?.type === "rich_text") return p.rich_text?.map((t) => t.plain_text).join("") || "";
  if (p?.type === "select") return p.select?.name || "";
  return "";
}

function getNumber(prop: unknown): number {
  const p = prop as { type?: string; number?: number | null };
  if (p?.type === "number") return p.number ?? 0;
  return 0;
}

function getCheckbox(prop: unknown): boolean {
  const p = prop as { type?: string; checkbox?: boolean };
  if (p?.type === "checkbox") return p.checkbox ?? false;
  return false;
}

function getFileUrl(prop: unknown): string | null {
  const p = prop as { type?: string; files?: { type: string; file?: { url: string }; external?: { url: string } }[] };
  if (p?.type === "files" && p.files && p.files.length > 0) {
    const file = p.files[0];
    if (file.type === "file") return file.file?.url || null;
    if (file.type === "external") return file.external?.url || null;
  }
  return null;
}

function getFileUrls(prop: unknown): string[] {
  const p = prop as { type?: string; files?: { type: string; file?: { url: string }; external?: { url: string } }[] };
  if (p?.type !== "files" || !p.files) return [];
  return p.files
    .map((file) => {
      if (file.type === "file") return file.file?.url || null;
      if (file.type === "external") return file.external?.url || null;
      return null;
    })
    .filter((url): url is string => url !== null);
}

export type NotionProduct = Product & {
  photoUrls: string[];
};

async function queryAllPages(databaseId: string) {
  const allPages: { properties: Record<string, unknown> }[] = [];
  let startCursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
      start_cursor: startCursor,
    });
    for (const page of response.results) {
      if ("properties" in page) {
        allPages.push(page as { properties: Record<string, unknown> });
      }
    }
    startCursor = response.has_more && response.next_cursor ? response.next_cursor : undefined;
  } while (startCursor);

  return allPages;
}

function parseNotesJson(raw: string): { top: string[]; middle: string[]; base: string[] } | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (parsed.top && parsed.middle && parsed.base) return parsed;
  } catch { /* ignore */ }
  return undefined;
}

function parseAccordsJson(raw: string): Accord[] | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch { /* ignore */ }
  return undefined;
}

function parseSeasonsJson(raw: string): Seasons | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.winter === "number") return parsed;
  } catch { /* ignore */ }
  return undefined;
}

export async function getProducts(): Promise<NotionProduct[]> {
  if (!PARFUMS_DB_ID || !process.env.NOTION_API_KEY) {
    return [];
  }

  try {
    const pages = await queryAllPages(PARFUMS_DB_ID);
    const products: NotionProduct[] = [];
    let idCounter = 1;

    for (const page of pages) {
      const props = page.properties;

      const name = getText(props.Name);
      if (!name) continue;

      const brand = getText(props.Brand);
      const category = (getText(props.Category) || "homme") as Product["category"];
      const slug = getText(props.Slug) || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const bestseller = getCheckbox(props.Bestseller);
      const photoUrls = getFileUrls(props.Photos);

      const prices = {
        "3ml": getNumber(props["Price 3ml"]),
        "30ml": getNumber(props["Price 30ml"]),
        "50ml": getNumber(props["Price 50ml"]),
        "100ml": getNumber(props["Price 100ml"]),
      };

      const notes = parseNotesJson(getText(props.Notes));
      const accords = parseAccordsJson(getText(props.Accords));
      const seasons = parseSeasonsJson(getText(props.Seasons));

      products.push({
        id: idCounter++,
        name,
        brand,
        category,
        prices,
        slug,
        bestseller: bestseller || undefined,
        notes,
        accords,
        seasons,
        photoUrls,
      });
    }

    return products;
  } catch (err) {
    console.error("Failed to fetch products from Notion:", err);
    return [];
  }
}
