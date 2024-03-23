import { UserEntity } from "src/users/entities/user.entity";
import { OrderStatus } from "src/utility/enums/order-status.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ShippingEntity } from "./shipping.entity";
import { OrdersProductsEntity } from "./orders-products.entity";

@Entity({ name: 'orders' })
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    orderAt: Timestamp

    @Column({ type: 'enum', enum: OrderStatus, })
    status: string

    @Column({ nullable: true })
    shippedAt: Date

    @Column({ nullable: true })
    deliveredAt: Date

    @ManyToOne(() => UserEntity, user => user.ordersUpdateBy)
    updatedBy: UserEntity

    @OneToOne(() => ShippingEntity, shipping => shipping.order, { cascade: true })
    @JoinColumn()
    shippingAddress: ShippingEntity

    @OneToMany(() => OrdersProductsEntity, op => op.order, { cascade: true })
    products: OrdersProductsEntity[]

}
