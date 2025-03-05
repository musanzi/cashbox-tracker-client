import { ERole } from '../../shared/utils/enums/role.enum';

export interface UpdateUserDto {
  email: string;
  name: string;
  phone_number: string;
  role: ERole;
}
