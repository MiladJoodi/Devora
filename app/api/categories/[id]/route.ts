import { NextResponse } from "next/server";

import { updateCategory } from "@/server/services/categories/update-category";
import { slugify } from "@/server/utils/slugify";
import { createCategorySchema } from "@/validations/category";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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

    const category = await updateCategory({
      id,
      name: result.data.name,
      slug,
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Category updated successfully",
        category,
      },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CATEGORY_ALREADY_EXISTS"
    ) {
      return NextResponse.json(
        { message: "Category already exists." },
        { status: 409 },
      );
    }

    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}