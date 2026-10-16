-- Referensi skema PostgreSQL untuk migrasi produksi Langkah.
-- Tidak dijalankan oleh prototipe dan wajib dilengkapi RLS serta kebijakan retensi.

create type user_role as enum ('teacher', 'counselor', 'school_admin');
create type support_level as enum ('tinggi', 'sedang', 'stabil');
create type intervention_status as enum ('direncanakan', 'berjalan', 'selesai');

create table schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  email text not null,
  display_name text not null,
  role user_role not null,
  created_at timestamptz not null default now(),
  unique (school_id, email)
);

create table students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  pseudonym text not null,
  class_name text not null,
  counselor_id uuid references users(id),
  created_at timestamptz not null default now(),
  archived_at timestamptz
);

create table assessments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  author_id uuid not null references users(id),
  attendance smallint check (attendance between 0 and 100),
  previous_attendance smallint check (previous_attendance between 0 and 100),
  average_score smallint check (average_score between 0 and 100),
  previous_score smallint check (previous_score between 0 and 100),
  engagement smallint check (engagement between 1 and 5),
  motivation smallint check (motivation between 1 and 5),
  economic_constraint boolean not null default false,
  family_responsibility boolean not null default false,
  language_barrier boolean not null default false,
  support_score smallint check (support_score between 0 and 100),
  support_level support_level not null,
  factors jsonb not null default '[]',
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table interventions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  owner_id uuid not null references users(id),
  type text not null,
  title text not null,
  status intervention_status not null default 'direncanakan',
  due_date date,
  progress smallint not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table case_notes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  intervention_id uuid references interventions(id) on delete cascade,
  author_id uuid not null references users(id),
  encrypted_body text not null,
  created_at timestamptz not null default now()
);

create table audit_events (
  id bigint generated always as identity primary key,
  school_id uuid not null references schools(id),
  actor_id uuid references users(id),
  action text not null,
  resource_type text not null,
  resource_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index assessments_student_created_idx on assessments(student_id, created_at desc);
create index interventions_student_status_idx on interventions(student_id, status);
create index audit_school_created_idx on audit_events(school_id, created_at desc);
