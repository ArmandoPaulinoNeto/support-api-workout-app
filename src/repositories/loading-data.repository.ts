import { AppDataSource } from "src/config/data-source";
import { LoggedDto } from "src/dtos/logged.dto";
import { Notice } from "src/entities/notice.entity";

export class LoadingDataRepository{

    async getDataHome(loggedDto: LoggedDto){

        const {id, role} = loggedDto;

        const administrator = await AppDataSource.createQueryBuilder()
                                                    .select("*")
                                                    .from(role, "r")
                                                    .where("r.id = :id", {id: id})
                                                    .getRawOne();

        const pupilNumber = await AppDataSource.createQueryBuilder()
                                                .select("COUNT(p.id)")
                                                .from("pupil", "p")
                                                .groupBy("p.id")
                                                .execute();

        const teacherNumber = await AppDataSource.createQueryBuilder()
                                                .select("COUNT(t.id)")
                                                .from("teacher", "t")
                                                .groupBy("t.id")
                                                .execute();
        
        let notice = await AppDataSource.createQueryBuilder()
                                            .select("id, image, status")
                                            .from("notice", "n")
                                            .where("n.status = true")
                                            .getRawOne();
                                            
        notice = notice != null ? notice : new Notice();
        const nPupils = pupilNumber.length ?? 0;
        const nTeachers = teacherNumber.length ?? 0;

        return {administrator, nPupils, nTeachers, notice}                              
    }
}