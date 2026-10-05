import { Suspense } from "react";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { verifyUser } from "@/lib/dal";
import { signOut } from "./actions";
import { CustomerRows } from "./customer-rows";
import { NewCustomerForm } from "./new-customer-form";
import { RowsSkeleton } from "./skeletons";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const profile = await verifyUser();

  return (
    <main className="px-16 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Customers" }]} />
      <div className="mt-4 flex items-baseline justify-between">
        <h1 className="text-4xl font-bold">Customers</h1>
        <form action={signOut}>
          <span className="mr-4 text-neutral-500">{profile.email} · {profile.role}</span>
          <button className="underline">Sign out</button>
        </form>
      </div>

      {profile.role === "admin" && <NewCustomerForm />}

      <Suspense fallback={<RowsSkeleton />}>
        <CustomerRows />
      </Suspense>
    </main>
  );
}
