import { readCustomers, summarise } from "@/lib/customers";
import { problemFor } from "@/lib/problem";
import { CustomerSearch } from "./customer-search";
import { Problem } from "./problem";

export async function CustomerRows() {
  let customers;
  try {
    customers = await readCustomers();
  } catch (e) {
    return <Problem message={problemFor(e)} />;
  }

  if (customers.length === 0) {
    return <Problem message="No customers yet." />;
  }

  const summary = summarise(customers);
  const items = [
    { label: "Total owed", value: `₱ ${summary.total.toFixed(2)}` },
    { label: "Still owing", value: `${summary.owing} of ${customers.length}` },
    { label: "Settled", value: summary.settled },
  ];
  return (
    <>
      <dl className="mt-6 flex gap-12">
        {items.map((s) => (
          <div key={s.label}>
            <dt className="text-sm text-neutral-500">{s.label}</dt>
            <dd className="text-2xl font-semibold">{s.value}</dd>
          </div>
        ))}
      </dl>
      <CustomerSearch customers={customers} />
    </>
  );
}
