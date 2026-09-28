import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function seed() {
  const { db } = await import("./index");
  const { projects } = await import("./schema");
  await db
    .insert(projects)
    .values([
      { slug: "store-ledger", title: "Store Ledger", year: 2025,
        summary: "Records store credit instead of a paper notebook." },
      { slug: "org-check-in", title: "Org Check-in", year: 2026,
        summary: "Scans members in at the door with a QR code." },
      { slug: "barangay-reports", title: "Barangay Reports", year: 2026,
        summary: "Lets residents pin a broken streetlight on a map." },
    ])
    .onConflictDoNothing();
  console.log("Seeded projects");
  process.exit(0);
}

seed();
