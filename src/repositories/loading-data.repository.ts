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

        
        let notice = await AppDataSource.createQueryBuilder()
                                            .select("id, title, description, image")
                                            .from("notice", "n")
                                            .orderBy("n.id","DESC")
                                            .getRawOne();
                                            
        notice = notice != null? notice : new Notice();
        const count = await this.countPupil(pupilNumber);

        return {administrator, count, notice}                              
    }

    countPupil(pupilNumber){
        
        return pupilNumber != null ? pupilNumber.filter(number =>(number.c == "1")).length : 0;
    }
}