import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './Room';

@Entity('subjects')
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    // Relação muito para muitos
    @ManyToMany(() => Room, (room) => room.subjects)
    // Define a tabela de ligação
    @JoinTable({
        name: 'room_subject',
        // Define a coluna dessa entidade e o nome dela na nova entidade
        joinColumn: {
            name: 'subject_id',
            referencedColumnName: 'id',
        },
        // Define a coluna da outra entidade e o nome dela na nova entidade
        inverseJoinColumn: {
            name: 'room_id',
            referencedColumnName: 'id',
        },
    })
    rooms: Room[];
};
