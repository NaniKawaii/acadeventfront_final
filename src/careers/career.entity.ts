import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Faculty } from '../faculties/faculty.entity';
import { Event } from '../events/event.entity';

@Entity('careers')
export class Career {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Column({ nullable: true })
  name!: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.careers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'faculty_id' })
  faculty!: Faculty;

  @Column({ name: 'faculty_id', type: 'bigint' })
  facultyId!: string;

  @OneToMany(() => Event, (event) => event.career)
  events!: Event[];

}
