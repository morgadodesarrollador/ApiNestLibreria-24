import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterAuthDto {

    @IsEmail({}, {
        message: 'Invalid email'
    })
    @IsNotEmpty({
        message: 'email is required'
    })
    email: string;

    @IsString({
        message: 'Invalid username'
    })
    @IsOptional()
    username: string;

    @IsString({
        message: 'Invalid password'
    })
    @IsNotEmpty({
        message: 'password is required'
    })
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}
