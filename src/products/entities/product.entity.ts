import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    description: string

    @Column({ type: 'decimal' })
    price: number

    @Column()
    stock: number;

    @Column('simple-array')
    images: string[]

    @CreateDateColumn()
    createdAt: Timestamp;

    @CreateDateColumn()
    updatedAt: Timestamp;
    
}
