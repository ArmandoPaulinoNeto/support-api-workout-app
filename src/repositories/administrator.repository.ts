import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { AdministratorDto } from "src/dtos/administrator.dto";
import { NoticeDto } from "src/dtos/notice.dto";
import { Notice } from "src/entities/notice.entity";
import { v4 } from "uuid";

@Injectable()
export class AdministratorRepository{

    async createNotice(noticeDto: NoticeDto): Promise<Notice> {
        
        const {id, title, description, image, administratorFK} = noticeDto;

        const newNotice = new Notice();
        newNotice.id = v4();
        newNotice.title = title;
        newNotice.description = description;
        newNotice.image = image;
        newNotice.administrator_fk = administratorFK

        AppDataSource.createQueryBuilder()
                            .insert()
                            .into("notice")
                            .values(newNotice)
                            .execute();
        return newNotice;
    }
}