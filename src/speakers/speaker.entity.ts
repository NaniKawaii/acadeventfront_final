import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../events/event.entity';

@Entity('speakers')
export class Speaker {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column({ type: 'text', nullable: true })
  bio!: string | null;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl!: string | null;

  @ManyToMany(() => Event, (event) => event.speakers)
  events!: Event[];

}
