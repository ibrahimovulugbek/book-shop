import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReviewDto {

    @IsNotEmpty({ message: "Ratings is must not be empty" })
    @IsNumber({}, { message: "Rating should be number" })
    ratings: number

    @IsNotEmpty({ message: "Comment is must not be empty" })
    @IsString({ message: "Comment is should be string" })
    comment: string

    @IsNotEmpty({ message: "Product id must not be empty!!!" })
    @IsNumber({}, { message: "Product id should be number" })
    productId: number
    
}
