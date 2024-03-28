import { Type } from "class-transformer";
import { CreateShippingDto } from "./create-shipping.dto";
import { OrderedProductsDto } from "./ordered-products.dto";
import { ValidateNested } from "class-validator";

export class CreateOrderDto {

    @Type(()=>CreateShippingDto)
    @ValidateNested()
    addressShipping: CreateShippingDto

    @Type(()=>OrderedProductsDto)
    @ValidateNested()
    orderedProducts: OrderedProductsDto[]
}
