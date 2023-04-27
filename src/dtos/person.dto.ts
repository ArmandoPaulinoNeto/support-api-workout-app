import { AccessDto } from "./access.dto";

export class PersonDto{
    id: string;
    name: string;
    birthday: string;
    sex: string;
    access: AccessDto;
}