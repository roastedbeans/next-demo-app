"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { verifyAdmin } from "@/lib/dal";
import { ProjectPostSchema } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";

export type PostState = { message: string; title: string; year: string; summary: string };

const BUCKET = "project-images";

function slugFor(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function isDuplicate(e: unknown) {
  const err = e as { code?: string; cause?: { code?: string } };
  return err.code === "23505" || err.cause?.code === "23505";
}

export async function createProject(_prev: PostState, form: FormData): Promise<PostState> {
  await verifyAdmin();

  const typed = {
    title: String(form.get("title") ?? ""),
    year: String(form.get("year") ?? ""),
    summary: String(form.get("summary") ?? ""),
  };
  const parsed = ProjectPostSchema.safeParse({ ...typed, image: form.get("image") });
  if (!parsed.success) {
    return { message: parsed.error.issues[0].message, ...typed };
  }
  const { title, year, summary, image } = parsed.data;

  const slug = slugFor(title);
  const path = `${slug}-${Date.now()}.${image.type.split("/")[1]}`;
  const supabase = await createClient();
  const upload = await supabase.storage.from(BUCKET).upload(path, image, { contentType: image.type });
  if (upload.error) return { message: "The picture could not be uploaded.", ...typed };
  const imageUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

  try {
    await db.insert(projects).values({ slug, title, year, summary, imageUrl });
  } catch (e) {
    await supabase.storage.from(BUCKET).remove([path]);
    if (isDuplicate(e)) return { message: "A project with that title already exists.", ...typed };
    return { message: "Something went wrong.", ...typed };
  }

  revalidatePath("/projects");
  redirect(`/projects/${slug}`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
