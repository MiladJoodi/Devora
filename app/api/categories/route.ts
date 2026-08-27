import { NextResponse } from "next/server";

import { createCategorySchema } from "@/validations/category";
import { createCategory } from "@/server/services/categories/create-category";
import { getCategories } from "@/server/services/categories/get-categories";
import { slugify } from "@/server/utils/slugify";

export async function GET() {
  try {
    const categories = await getCategories();

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = createCategorySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const slug = slugify(result.data.name);

    const category = await createCategory({
      name: result.data.name,
      slug,
    });

    return NextResponse.json(
      {
        message: "Category created successfully",
        category,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}