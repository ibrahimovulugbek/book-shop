import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateShippingDto {

    @IsNotEmpty({})
    @IsString({ message: "Phone type must be string" })
    phone: string

    @IsOptional()
    @IsString({ message: "Phone type must be string" })
    name: string

    @IsNotEmpty({ message: "Name should not empty!" })
    @IsString({ message: "Phone type must be string" })
    address: string

    @IsNotEmpty({ message: "Name should not empty!" })
    @IsString({ message: "Phone type must be string" })
    city: string

    @IsNotEmpty({ message: "Name should not empty!" })
    @IsString({ message: "Phone type must be string" })
    postCode: string

    @IsNotEmpty({ message: "Name should not empty!" })
    @IsString({ message: "Phone type must be string" })
    state: string

    @IsNotEmpty({ message: "Name should not empty!" })
    @IsString({ message: "Phone type must be string" })
    country: string

}