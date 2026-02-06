import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @ManyToOne(() => Event, (event) => event.certificates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event!: Event;

  @Column({ name: 'event_id', type: 'bigint' })
  eventId!: string;

  @ManyToOne(() => User, (user) => user.certificates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: string;

  @Column({ name: 'verification_code', unique: true })
  verificationCode!: string;

  @Column({ name: 'pdf_url', type: 'text', nullable: true })
  pdfUrl!: string | null;

  @CreateDateColumn({ name: 'issued_at' })
  issuedAt!: Date;
}
