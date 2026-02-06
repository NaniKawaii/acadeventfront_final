import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Career } from '../careers/career.entity';
import { Event } from '../events/event.entity';

@Entity('faculties')
export class Faculty {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Column({ unique: true, nullable: true })
  name!: string;

  @OneToMany(() => Career, (career) => career.faculty)
  careers!: Career[];

  @OneToMany(() => Event, (event) => event.faculty)
  events!: Event[];

}
