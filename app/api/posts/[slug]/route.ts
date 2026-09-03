import { NextResponse } from "next/server";

import { getPostBySlug } from "@/server/services/posts/get-post-by-slug";
import { deletePost } from "@/server/services/posts/delete-post";

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

// DELETE /api/posts/[slug]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const post = await deletePost(slug);

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}