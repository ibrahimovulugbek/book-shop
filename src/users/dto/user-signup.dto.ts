import { IsNotEmpty, IsString } from "class-validator";
import { UserSignIn } from "./user-signin.dto";

export class UserSignUp extends UserSignIn {

    @IsNotEmpty({ message: "Name bo'sh bo'lmasligi kerak!" })
    @IsString({ message: "Name ga string turidagi qiymat berish lozim! " })
    name: string;

}