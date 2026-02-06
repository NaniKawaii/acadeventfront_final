import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../events/event.entity';
import { Registration } from '../registrations/registration.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Certificate } from '../certificates/certificate.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  ORGANIZADOR = 'ORGANIZADOR',
  ASISTENTE = 'ASISTENTE',
  SCANNER = 'SCANNER'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Column({ name: 'full_name', nullable: true })
  fullName!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ name: 'password_hash', nullable: true })
  passwordHash!: string;

  @Column('text', { array: true, nullable: true })
  roles!: UserRole[];

  @Column({ name: 'faculty_id', type: 'bigint', nullable: true })
  facultyId!: string | null;

  @Column({ name: 'career_id', type: 'bigint', nullable: true })
  careerId!: string | null;

  @OneToMany(() => Event, (event) => event.organizer)
  organizedEvents!: Event[];

  @OneToMany(() => Registration, (registration) => registration.user)
  registrations!: Registration[];

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances!: Attendance[];

  @OneToMany(() => Certificate, (certificate) => certificate.user)
  certificates!: Certificate[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
