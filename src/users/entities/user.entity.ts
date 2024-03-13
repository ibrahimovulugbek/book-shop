import { CategoryEntity } from "src/categories/entities/category.entity";
import { Roles } from "src/utility/enums/user-roles.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true})
    email: string

    @Column({ select: false })
    password: string

    @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
    roles: Roles[]

    @CreateDateColumn()
    createdAt: Timestamp;

    @CreateDateColumn()
    updatedAt: Timestamp;

    @OneToMany(() => CategoryEntity, (cat) => cat.addedBy)
    categories:CategoryEntity[]
}
