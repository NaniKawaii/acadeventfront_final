import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
 
export enum AttendanceMethod {
  MANUAL = 'MANUAL',
  QR = 'QR'
}

@Entity('attendances')
@Index(['eventId', 'userId'], { unique: true })
export class Attendance {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @ManyToOne(() => Event, (event) => event.attendances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event!: Event;

  @Column({ name: 'event_id', type: 'bigint' })
  eventId!: string;

  @ManyToOne(() => User, (user) => user.attendances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: string;

  @Column({ name: 'check_in_time', type: 'timestamp', nullable: true })
  checkInTime!: Date | null;

  @Column({ type: 'boolean', default: false })
  present!: boolean;

  @Column({ type: 'text', nullable: true })
  method!: AttendanceMethod | null;
}
