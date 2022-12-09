import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity('videos')
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    title: string;

    @Column({type: 'text'})
    url: string;

    // Relacionamento de muitos para um (Videos -> Room)
    // Relacionamento de "ida e volta"
    @ManyToOne(() => Room, room => room.videos)
    // Como a chave estrangeria vai ser criada no banco de dados
    @JoinColumn({name: 'room_id'}) 
    room: Room;
};