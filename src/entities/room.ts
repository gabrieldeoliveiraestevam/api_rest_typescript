import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student";
import { Subject } from "./subject";
import { Video } from "./video";

// Decoration do typeorm para buscar a entidade
@Entity('rooms')
export class Room {

    // Coluna do tipo chave primária e auto incremental
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'text', nullable: true })
    description: string;
    
    // Declara a coluna de array de vídeos
    // Declara relacionamento de um para muitos
    @OneToMany(() => Video, video => video.room)
    @JoinColumn({name: 'videos'})
    videos: Video[];

    // Relação muito para muitos
    @ManyToMany(() => Subject, subject => subject.rooms)
    subjects: Subject[];

    @ManyToMany(() => Student, student => student.rooms)
    students: Student[];

};