import { NextResponse } from "next/server";

import { createPostSchema } from "@/validations/post";
import { requireUser } from "@/server/services/auth/require-user";
import { createPost } from "@/server/services/posts/create-post";
import { slugify } from "@/server/utils/slugify";

import { getPosts } from "@/server/services/posts/get-posts";

// POST /api/posts
export async function POST(request: Request) {
  try {
    const user = await requireUser();

    const body = await request.json();

    const result = createPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const slug = slugify(result.data.title);

    const post = await createPost({
      ...result.data,
      slug,
      authorId: user.id,
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        post,
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

// GET /api/posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const posts = await getPosts(page, limit);

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}