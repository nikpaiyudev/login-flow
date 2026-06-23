import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  @IsEmail()
  emailId: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isVerified: boolean;
}
