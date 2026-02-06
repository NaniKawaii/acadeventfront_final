import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Registration } from '../registrations/registration.entity';

@Entity('qr_codes')
export class QrCode {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @ManyToOne(() => Registration, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'registration_id' })
  registration!: Registration;

  @Column({ name: 'registration_id', type: 'bigint' })
  registrationId!: string;

  @Column({ name: 'qr_token', unique: true })
  qrToken!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
