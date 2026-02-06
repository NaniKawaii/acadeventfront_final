import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
