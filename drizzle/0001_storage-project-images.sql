insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-images', 'project-images', true, 2097152, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
--> statement-breakpoint
create policy "Admins upload project images"
on storage.objects for insert to authenticated
with check (bucket_id = 'project-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
--> statement-breakpoint
create policy "Admins read project image records"
on storage.objects for select to authenticated
using (bucket_id = 'project-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
--> statement-breakpoint
create policy "Admins delete project images"
on storage.objects for delete to authenticated
using (bucket_id = 'project-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
