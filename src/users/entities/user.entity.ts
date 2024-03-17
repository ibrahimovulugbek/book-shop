import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { Roles } from "src/utility/enums/user-roles.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ select: false })
    password: string

    @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
    roles: Roles[]

    @CreateDateColumn()
    createdAt: Timestamp;

    @CreateDateColumn()
    updatedAt: Timestamp;

    @DeleteDateColumn()
    // deletedAt: Timestamp
    deletedAt: Date

    @OneToMany(() => CategoryEntity, (cat) => cat.addedBy)
    categories: CategoryEntity[]

    @OneToMany(() => ProductEntity, (prod) => prod.addedBy)
    products: ProductEntity[]

    @OneToMany(() => ReviewEntity, (rev) => rev.user)
    reviews: ReviewEntity[]
}
