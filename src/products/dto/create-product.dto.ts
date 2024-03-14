import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class CreateProductDto {

    @IsNotEmpty({ message: "Title must not be empty!!!" })
    @IsString()
    title: string

    @IsNotEmpty({ message: "Description must not be empty!!!" })
    @IsString()
    description: string

    @IsNotEmpty({ message: "Price must not be empty!!!" })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "Price should be number and max decimal precission 2" })
    @IsPositive({ message: "Price should be positive number" })
    price: number

    // @IsNotEmpty({ message: "Stock must not be empty!!!" })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "Price should be number and max decimal precission 2" })
    @IsPositive({ message: "Stock should be positive number" })
    stock: number

    @IsNotEmpty({ message: "Images must not be empty!!!" })
    @IsArray({ message: "Images should be in array format" })
    images: string[]

    @IsNotEmpty({ message: "Category id must not be empty!!!" })
    @IsNumber({}, { message: "Category id should be number" })
    categoryId: number
}



