import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty({ message: "Title bo'sh bo'lmasligi kerak!" })
    @IsString({ message: "Title type must be string!" })
    title: string

    @IsNotEmpty({ message: "Description bo'sh bo'lmasligi kerak!" })
    @IsString({ message: "Description type must be string!" })
    description: string
}
