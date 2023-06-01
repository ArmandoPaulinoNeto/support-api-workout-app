import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { DataPupilDto } from "src/dtos/data-pupil.dto";
import { PupilDto } from "src/dtos/pupil.dto";
import { ScheduleDto } from "src/dtos/schedule.dto";
import { TrainingExerciseDto } from "src/dtos/training-exercise.dto";
import { Access } from "src/entities/access.entity";
import { Person } from "src/entities/person.entity";
import { Profile } from "src/entities/profile.entity";
import { Pupil } from "src/entities/pupil.entity";
import { CostumDate } from "src/util/costum-data";
import { EncriptorBcrypt } from "src/util/encriptor-bcrypt";
import { v4 } from "uuid";

@Injectable()
export class PupilRepository{
    
    async createPupil(pupilDto: DataPupilDto): Promise<Pupil> {
        
        const { goal, name, birthday, sex, email, password, photo, role } = pupilDto;
        
        
        const newProfile = new Profile;
        newProfile.id = v4();
        newProfile.role = role;
        newProfile.photo = photo;

        const newAccess = new Access();
        newAccess.id = v4();
        newAccess.email = email;
        newAccess.password = await new EncriptorBcrypt().generatorHash(password);
        newAccess.profile_fk = newProfile.id;

        const newPerson = new Person();
        newPerson.id = v4();
        newPerson.name = name;
        newPerson.birthday = new CostumDate().convertToDate(birthday);
        newPerson.sex = sex;
        newPerson.access_fk = newAccess.id;

        const newPupil = new Pupil();
        newPupil.id = v4();
        newPupil.goal = goal;
        newPupil.person_fk = newPerson.id;
        
        const queryRunner = AppDataSource.createQueryRunner();

        await queryRunner.startTransaction();

        try {            
            await queryRunner.manager.createQueryBuilder()
            .insert()
            .into("profile")
                                .values(newProfile)
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .insert()
                                .into("access")
                                .values(newAccess)
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .insert()
                                .into("person")
                                .values(newPerson)
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .insert()
                                .into("pupil")
                                .values(newPupil)
                                .execute();
                                
            await queryRunner.commitTransaction();
            return newPupil;
        } 
        catch (error) {
            queryRunner.rollbackTransaction();
            console.log(error);
            throw "Erro ao tentar salvar os dados do aluno."
        }        
    }
                        
    findById(pupilDto: PupilDto) {
        const { id } = pupilDto
        
        return AppDataSource.createQueryBuilder()
                            .select("*")
                            .from("pupil", "p")
                            .leftJoinAndSelect("person", "ps","ps.id = p.person_fk")
                            .leftJoinAndSelect("access", "a","a.id = ps.access_fk")
                            .leftJoinAndSelect("profile", "pf","pf.id = a.profile_fk")
                            .where("p.id = :id", { id: id })
                            .getRawOne();
    }
                        
    fetchAllPupil() {
        return AppDataSource.createQueryBuilder()
                            .select("p.id, ps.name, ps.birthday, ps.sex")
                            .from("pupil", "p")
                            .innerJoin("person", "ps","ps.id = p.person_fk")
                            .execute();
    }
                        
    async fetchAllSchedulePupilById(pupilDto: PupilDto) {
        
        const { id } = pupilDto;
        
        return AppDataSource.createQueryBuilder()
                            .select("s.id, s.training_day, t.name as name_training")
                            .from("pupil", "p")
                            .leftJoin("schedule", "s", "s.pupil_fk = p.id")
                            .leftJoin("training","t", "t.id = s.training_fk")
                            .where("p.id = :id", { id: id })
                            .andWhere("s.status = true")
                            .execute();        
    }

    findByScheduleId(scheduleDto: ScheduleDto) {

        const { id } = scheduleDto;

        return AppDataSource.createQueryBuilder()
                            .select("s.training_day, t.name as name_training, te.id as training_exercise_id, te.repetitions, te.series, te.weight, te.observation, e.name as e_name, e.muscle_group")
                            .from("schedule", "s")
                            .leftJoin("training","t", "t.id = s.training_fk")
                            .leftJoin("training_exercise","te", "te.schedule_fk = s.id")
                            .leftJoin("exercise","e", "e.id = te.exercise_fk")
                            .where("s.id = :id", { id: id })
                            .execute();
    }
    
    updateWeightExercise(trainingExerciseDto: TrainingExerciseDto) {
        const { id, weight } = trainingExerciseDto;
        var newWeight = {weight: weight};
        try {            
            return AppDataSource.createQueryBuilder()
                                .update("training_exercise")
                                .set(newWeight)
                                .where("id = :id", {id: id})
                                .execute();
        } 
        catch (error) {           
            throw "Erro ao tentar atualizar o exercício!."
        } 
    }
    
    fetchAllAssementByPupilId(pupilDto: PupilDto) {
        
        const { id } = pupilDto;
        
        return AppDataSource.createQueryBuilder()
                            .select("*")
                            .from("assessment", "a")
                            .where("a.pupil_fk = :id", { id: id })
                            .execute();     
    }
    
    async updatePupil(pupilDto: PupilDto): Promise<any> {
                      
        const { goal, person_fk, name, birthday, sex, access_fk, email, password, profile_fk, photo } = pupilDto;

        const newProfile = new Profile;
        newProfile.photo = photo;

        const newAccess = new Access();
        newAccess.email = email;
        newAccess.password = password.includes("$2b$10") ? password :  await new EncriptorBcrypt().generatorHash(password);

        const newPerson = new Person();
        newPerson.name = name;
        newPerson.birthday = new CostumDate().convertToDate(birthday);
        newPerson.sex = sex;

        const newPupil = new Pupil();
        newPupil.goal = goal;
        
        const queryRunner = AppDataSource.createQueryRunner();

        await queryRunner.startTransaction();

        try {            
            await queryRunner.manager.createQueryBuilder()
                                .update("pupil")
                                .set(newPupil)
                                .where("person_fk = :id", {id: person_fk})
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .update("person")
                                .set(newPerson)
                                .where("id = :id", {id: person_fk})
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .update("access")
                                .set(newAccess)
                                .where("id = :id", {id: access_fk})
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .update("profile")
                                .set(newProfile)
                                .where("id = :id", {id: profile_fk})
                                .execute();

            await queryRunner.commitTransaction();
            return "Os dados do aluno foram atualizados com sucesso!";
        } 
        catch (error) {
            queryRunner.rollbackTransaction();
            console.log(error);
            throw "Erro ao tentar atualizar os dados do aluno."
        }        
    }

    async deletePupil(pupilDto: PupilDto): Promise<any> {
                      
        const { id } = pupilDto;

        var pupil = await AppDataSource.createQueryBuilder()
                                        .select("p.person_fk, ps.access_fk, a.profile_fk, a.id")
                                        .from("pupil", "p")
                                        .leftJoin("person", "ps","ps.id = p.person_fk")
                                        .leftJoin("access", "a","a.id = ps.access_fk")
                                        .leftJoin("profile", "pf","pf.id = a.profile_fk")
                                        .where("p.id = :id", { id: id })
                                        .getRawOne();

        var schedule = await AppDataSource.createQueryBuilder()
                                            .select("s.id")
                                            .from("schedule", "s")
                                            .where("s.pupil_fk = :id", { id: id })
                                            .execute();
                                            
        const queryRunner = AppDataSource.createQueryRunner();

        await queryRunner.startTransaction();

        try {            

            await queryRunner.manager.createQueryBuilder()
                                .delete()
                                .from("assessment")
                                .where("pupil_fk = :id", {id: id})
                                .execute();

            for (var i = 0; i < schedule.length; i++) {
                
                await queryRunner.manager.createQueryBuilder()
                                .delete()
                                .from("training_exercise")
                                .where("schedule_fk = :id", {id: schedule[i].id})
                                .execute();
                await queryRunner.manager.createQueryBuilder()
                                .delete()
                                .from("schedule")
                                .where("id = :id", {id: schedule[i].id})
                                .execute();
            }
                             
            await queryRunner.manager.createQueryBuilder()
                                .delete()
                                .from("pupil")
                                .where("id = :id", {id: id})
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .delete()
                                .from("person")
                                .where("id = :id", {id: pupil.person_fk})
                                .execute();
            
            await queryRunner.manager.createQueryBuilder()
                                .delete()
                                .from("access")
                                .where("id = :id", {id: pupil.access_fk})
                                .execute();

            await queryRunner.manager.createQueryBuilder()
                                .delete()
                                .from("profile")
                                .where("id = :id", {id: pupil.profile_fk})
                                .execute();

            await queryRunner.commitTransaction();
            return "Os dados do aluno foram deletados com sucesso!";
        } 
        catch (error) {
            queryRunner.rollbackTransaction();
            console.log(error);
            throw "Erro ao tentar deletar os dados do aluno."
        }        
    }
}