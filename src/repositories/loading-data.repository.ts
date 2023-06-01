import { AppDataSource } from "src/config/data-source";
import { LoggedDto } from "src/dtos/logged.dto";
import { Notice } from "src/entities/notice.entity";

export class LoadingDataRepository{
    
    async getDataHomeAdministrator(loggedDto: LoggedDto){
        
        const { id } = loggedDto;

        const administrator = await AppDataSource.createQueryBuilder()
                                                    .select("*")
                                                    .from("administrator", "a")
                                                    .where("a.id = :id", {id: id})
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
    
    async getDataHomeTeacher(loggedDto: LoggedDto) {
        const { id } = loggedDto;

        const teacher = await AppDataSource.createQueryBuilder()
                                            .select("t.cref, t.person_fk, p.name")
                                            .from("teacher", "t")
                                            .leftJoin("person", "p", "p.id = t.person_fk")
                                            .where("t.id = :id", {id: id})
                                            .getRawOne();

        const pupilNumber = await AppDataSource.createQueryBuilder()
                                                .select("COUNT(p.id)")
                                                .from("pupil", "p")
                                                .groupBy("p.id")
                                                .execute();

        let notice = await AppDataSource.createQueryBuilder()
                                        .select("id, image, status")
                                        .from("notice", "n")
                                        .where("n.status = true")
                                        .getRawOne();
        
        notice = notice != null ? notice : new Notice();
        const nPupils = pupilNumber.length ?? 0;
        
        return {teacher, nPupils, notice} 
    }

    async getDataHomePupil(loggedDto: LoggedDto) {
        
        const { id } = loggedDto;

        const pupil = await AppDataSource.createQueryBuilder()
                                            .select("pe.name, t.name as last_training, a.current_weight, a.hight")
                                            .from("pupil", "p")
                                            .leftJoin("person", "pe", "pe.id = p.person_fk")
                                            .leftJoin("schedule", "s", "s.pupil_fk = p.id")
                                            .leftJoin("training", "t", "t.id = s.training_fk")
                                            .leftJoin("assessment", "a", "a.pupil_fk = p.id")
                                            .where("p.id = :id", {id: id})
                                            .getRawOne();

        
        let notice = await AppDataSource.createQueryBuilder()
                                        .select("id, image, status")
                                        .from("notice", "n")
                                        .where("n.status = true")
                                        .getRawOne();
        
        notice = notice != null ? notice : new Notice();
        
        return {pupil, notice}                              
    }
}