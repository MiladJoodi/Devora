import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  total: number;
  limit: number;
};

export default function Pagination({
  currentPage,
  total,
  limit,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {currentPage > 1 && (
        <Link
          href={`/posts?page=${currentPage - 1}`}
          className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
        >
          Previous
        </Link>
      )}

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={`/posts?page=${currentPage + 1}`}
          className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
        >
          Next
        </Link>
      )}
    </div>
  );
}