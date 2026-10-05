import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-16 py-8">
      <h1 className="text-4xl font-bold">No such customer</h1>
      <p className="mt-6 text-xl">This customer was removed.</p>
      <Link href="/customers" className="mt-6 inline-block underline">
        Back to customers
      </Link>
    </main>
  );
}
