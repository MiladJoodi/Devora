import { NextResponse } from "next/server";

import { getPostBySlug } from "@/server/services/posts/get-post-by-slug";

// GET /api/posts/[slug]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}