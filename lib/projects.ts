import "server-only";

export type Project = { slug: string; title: string; year: number; summary: string };
export type Stats = { total: number; newest: number; oldest: number };

export const PROJECTS: Project[] = [
  { slug: "store-ledger", title: "Store Ledger", year: 2025,
    summary: "Records store credit instead of a paper notebook." },
  { slug: "org-check-in", title: "Org Check-in", year: 2026,
    summary: "Scans members in at the door with a QR code." },
  { slug: "barangay-reports", title: "Barangay Reports", year: 2026,
    summary: "Lets residents pin a broken streetlight on a map." },
];

export async function readProjects() {
  return PROJECTS;
}

export async function readProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

export async function readStats(): Promise<Stats> {
  await new Promise((go) => setTimeout(go, 2000));
  const years = PROJECTS.map((p) => p.year);
  return { total: PROJECTS.length, newest: Math.max(...years), oldest: Math.min(...years) };
}
