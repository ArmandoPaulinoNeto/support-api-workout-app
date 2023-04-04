import { ProfileDto } from "./profile.dto";

export class AccessDto{
    email: string;
    password: string;
    profile: ProfileDto;
}