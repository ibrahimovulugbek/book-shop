import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserSignIn {
    
    @IsNotEmpty({ message: "Email bo'sh bo'lmasligi kerak!" })
    @IsEmail({}, { message: "Emailingizni to'g'ri kiriting!" })
    email: string;

    @IsNotEmpty({ message: "Password bo'sh bo'lmasligi kerak!" })
    @IsString({message:"Title type must be string!"})
    @MinLength(3, { message: "Password uzunligi kamida 3 ta belgidan iborat bo'lish kk!" })
    @MaxLength(10, { message: "Password uzunligi 10 ta belgidan oshmasligi kk!" })
    password: string;

}