"use client";

import Link from "next/link";
import { useState } from "react";
import type { Customer } from "@/lib/customers";

type Props = { customers: Customer[] };
export function CustomerSearch({ customers }: Props) {
  const [query, setQuery] = useState("");
  const shown = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search customers"
        className="mt-8 w-80 border px-4 py-2"
      />
      <ul className="mt-6 max-w-2xl divide-y divide-neutral-200 border-y border-neutral-200">
        {shown.map((c) => (
          <li key={c.id}>
            <Link href={`/customers/${c.id}`} className="flex justify-between py-3 hover:bg-neutral-50">
              <span className="text-xl">{c.name}</span>
              <span className="tabular-nums">₱ {c.balance.toFixed(2)}</span>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && (
        <p className="mt-4 text-neutral-500">No customers match &quot;{query}&quot;.</p>
      )}
    </>
  );
}
