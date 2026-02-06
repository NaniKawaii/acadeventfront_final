import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Faculty } from '../faculties/faculty.entity';
import { Career } from '../careers/career.entity';
import { Registration } from '../registrations/registration.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Certificate } from '../certificates/certificate.entity';
import { Speaker } from '../speakers/speaker.entity';

export enum EventModality {
  PRESENCIAL = 'PRESENCIAL',
  VIRTUAL = 'VIRTUAL',
  HIBRIDO = 'HIBRIDO'
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ name: 'banner_url', type: 'text', nullable: true })
  bannerUrl!: string | null;

  @Column()
  location!: string;

  @Column({ type: 'text' })
  modality!: EventModality;

  @Column({ type: 'int' })
  capacity!: number;

  @Column({ type: 'text', nullable: true })
  requirements!: string | null;

  @Column({ name: 'start_datetime', type: 'timestamp' })
  startAt!: Date;

  @Column({ name: 'end_datetime', type: 'timestamp' })
  endAt!: Date;

  @ManyToOne(() => User, (user) => user.organizedEvents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizer_id' })
  organizer!: User;

  @Column({ name: 'organizer_id', type: 'bigint' })
  organizerId!: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.events, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'faculty_id' })
  faculty!: Faculty;

  @Column({ name: 'faculty_id', type: 'bigint', nullable: true })
  facultyId!: string | null;

  @ManyToOne(() => Career, (career) => career.events, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'career_id' })
  career!: Career;

  @Column({ name: 'career_id', type: 'bigint', nullable: true })
  careerId!: string | null;

  @ManyToMany(() => Speaker, (speaker) => speaker.events, { cascade: true })
  @JoinTable({
    name: 'event_speakers',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'speaker_id', referencedColumnName: 'id' }
  })
  speakers!: Speaker[];

  @OneToMany(() => Registration, (registration) => registration.event)
  registrations!: Registration[];

  @OneToMany(() => Attendance, (attendance) => attendance.event)
  attendances!: Attendance[];

  @OneToMany(() => Certificate, (certificate) => certificate.event)
  certificates!: Certificate[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
