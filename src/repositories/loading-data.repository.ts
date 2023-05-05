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
                                                .select("*")
                                                .from("pupil", "p")
                                                .groupBy("p.id")
                                                .addSelect("COUNT(*)", "c")
                                                .getRawMany();
        
        const teacherNumber = await AppDataSource.createQueryBuilder()
                                                    .select("*")
                                                    .from("teacher", "t")
                                                    .groupBy("t.id")
                                                    .addSelect("COUNT(*)", "c")
                                                    .getRawMany();
        
        let notice = await AppDataSource.createQueryBuilder()
                                            .select("id, image, status")
                                            .from("notice", "n")
                                            .where("n.status = true")
                                            .getRawOne();
                                            
        notice = notice != null? notice : new Notice();
        const nPupils = await this.countRegisters(pupilNumber);
        const nTeachers = await this.countRegisters(pupilNumber);

        return {administrator, nPupils, nTeachers, notice}                              
    }

    countRegisters(nEntity){
        
        return nEntity != null ? nEntity.filter(number =>(number.c == "1")).length : 0;
    }
}