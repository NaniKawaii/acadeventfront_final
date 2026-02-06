import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';

export enum RegistrationStatus {
  INSCRITO = 'INSCRITO',
  CANCELADO = 'CANCELADO',
  LISTA_ESPERA = 'LISTA_ESPERA'
}

@Entity('registrations')
@Index(['eventId', 'userId'], { unique: true })
export class Registration {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @ManyToOne(() => Event, (event) => event.registrations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event!: Event;

  @Column({ name: 'event_id', type: 'bigint' })
  eventId!: string;

  @ManyToOne(() => User, (user) => user.registrations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: string;

  @Column({ type: 'text', default: RegistrationStatus.INSCRITO })
  status!: RegistrationStatus;

  @CreateDateColumn({ name: 'registered_at' })
  registeredAt!: Date;
}
