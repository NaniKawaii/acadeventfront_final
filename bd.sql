-- Migrations will appear here as you chat with AI

create table faculties (
  id bigint primary key generated always as identity,
  name text not null unique
);

create table careers (
  id bigint primary key generated always as identity,
  faculty_id bigint not null,
  name text not null,
  constraint fk_career_faculty foreign key (faculty_id) references faculties (id) on delete cascade
);

create table users (
  id bigint primary key generated always as identity,
  full_name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null check (
    role in ('ADMIN', 'ORGANIZADOR', 'ASISTENTE', 'SCANNER')
  ),
  faculty_id bigint null,
  career_id bigint null,
  created_at timestamp default current_timestamp,
  constraint fk_user_faculty foreign key (faculty_id) references faculties (id) on delete set null,
  constraint fk_user_career foreign key (career_id) references careers (id) on delete set null
);

create table events (
  id bigint primary key generated always as identity,
  title text not null,
  description text,
  banner_url text,
  location text,
  modality text check (modality in ('PRESENCIAL', 'VIRTUAL', 'HIBRIDO')),
  start_datetime timestamp not null,
  end_datetime timestamp not null,
  capacity int not null check (capacity >= 0),
  requirements text,
  faculty_id bigint,
  career_id bigint,
  organizer_id bigint not null,
  created_at timestamp default current_timestamp,
  constraint fk_event_faculty foreign key (faculty_id) references faculties (id) on delete set null,
  constraint fk_event_career foreign key (career_id) references careers (id) on delete set null,
  constraint fk_event_organizer foreign key (organizer_id) references users (id) on delete cascade
);

create table speakers (
  id bigint primary key generated always as identity,
  full_name text not null,
  bio text,
  photo_url text
);

create table event_speakers (
  event_id bigint not null,
  speaker_id bigint not null,
  primary key (event_id, speaker_id),
  constraint fk_event_speaker_event foreign key (event_id) references events (id) on delete cascade,
  constraint fk_event_speaker_speaker foreign key (speaker_id) references speakers (id) on delete cascade
);

create table registrations (
  id bigint primary key generated always as identity,
  event_id bigint not null,
  user_id bigint not null,
  status text not null check (
    status in ('INSCRITO', 'CANCELADO', 'LISTA_ESPERA')
  ),
  registered_at timestamp default current_timestamp,
  constraint uq_registration unique (event_id, user_id),
  constraint fk_registration_event foreign key (event_id) references events (id) on delete cascade,
  constraint fk_registration_user foreign key (user_id) references users (id) on delete cascade
);

create table attendances (
  id bigint primary key generated always as identity,
  event_id bigint not null,
  user_id bigint not null,
  check_in_time timestamp,
  present boolean default false,
  method text check (method in ('MANUAL', 'QR')),
  constraint uq_attendance unique (event_id, user_id),
  constraint fk_attendance_event foreign key (event_id) references events (id) on delete cascade,
  constraint fk_attendance_user foreign key (user_id) references users (id) on delete cascade
);

create table certificates (
  id bigint primary key generated always as identity,
  event_id bigint not null,
  user_id bigint not null,
  verification_code text unique not null,
  issued_at timestamp default current_timestamp,
  pdf_url text,
  constraint fk_certificate_event foreign key (event_id) references events (id) on delete cascade,
  constraint fk_certificate_user foreign key (user_id) references users (id) on delete cascade
);

create table qr_codes (
  id bigint primary key generated always as identity,
  registration_id bigint not null,
  qr_token text unique not null,
  created_at timestamp default current_timestamp,
  constraint fk_qr_registration foreign key (registration_id) references registrations (id) on delete cascade
);

create table notifications (
  id bigint primary key generated always as identity,
  user_id bigint not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp default current_timestamp,
  constraint fk_notification_user foreign key (user_id) references users (id) on delete cascade
);

create index idx_events_start_datetime on events using btree (start_datetime);

create index idx_events_faculty_id on events using btree (faculty_id);

create index idx_registrations_event_id on registrations using btree (event_id);

create index idx_registrations_user_id on registrations using btree (user_id);

create index idx_attendances_event_id on attendances using btree (event_id);

create index idx_certificates_verification_code on certificates using btree (verification_code);