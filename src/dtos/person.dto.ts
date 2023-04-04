import { AccessDto } from "./access.dto";

export class PersonDto{
    id: string;
    name: string;
    birthday: string;
    gender: string;
    access: AccessDto;
}