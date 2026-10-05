export function problemFor(e: unknown) {
  const m = e instanceof Error ? e.message : "";
  if (m === "404") return "That is not there any more.";
  return "Something went wrong. Check the database connection.";
}
