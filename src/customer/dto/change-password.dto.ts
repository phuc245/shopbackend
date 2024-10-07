import { IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  old_Password: string;

  @IsStrongPassword()
  new_Password: string;
}
