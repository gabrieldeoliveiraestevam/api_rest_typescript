import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'date'})
    birth_date: Date;

    @ManyToMany(() => Room, room => room.students)
    @JoinTable({
        name: 'room_student',
        joinColumn: {
            name: 'student_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'room_id',
            referencedColumnName: 'id'            
        }
    })
    rooms: Room[]
};