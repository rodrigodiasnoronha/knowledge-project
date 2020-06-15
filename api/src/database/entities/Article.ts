import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
    ManyToMany,
} from 'typeorm';
import { User } from './User';
import { Tag } from './Tag';

@Entity('articles')
export class Article {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    title: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    alias: string;

    @Column({ type: 'varchar', nullable: false })
    description: string;

    @Column({ type: 'varchar', nullable: false })
    image_url: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @ManyToOne((type) => User, (inverseType) => Article)
    @JoinColumn()
    user: User;

    @ManyToMany((type) => Tag, (inverseType) => Article)
    tags: Tag[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
