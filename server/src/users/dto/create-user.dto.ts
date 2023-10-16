import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
export class CreateUserDto {
  @ApiProperty({
    example: "test@gmail.com",
    description: "Email of the user",
  })
  @IsString({ message: "Must be string" })
  @IsEmail({}, { message: "Wrong e-mail" })
  readonly email: string;

  @ApiProperty({ example: "12345", description: "Password of the user" })
  @IsString({ message: "Must be string" })
  @Length(4, 16, { message: "From 4 to 16 symbols" })
  readonly password: string;
}
