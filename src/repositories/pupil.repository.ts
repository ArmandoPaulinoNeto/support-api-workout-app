import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { DataPupilDto } from "src/dtos/data-pupil.dto";
import { PupilDto } from "src/dtos/pupil.dto";
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
                            .select("p.id, ps.name")
                            .from("pupil", "p")
                            .innerJoin("person", "ps","ps.id = p.person_fk")
                            .execute();
    }

    fetchAllPupilSchedule() {
        return AppDataSource.createQueryBuilder()
                            .select("p.id, ps.name, t.name as last_training")
                            .from("pupil", "p")
                            .innerJoin("person", "ps","ps.id = p.person_fk")
                            .leftJoin("schedule", "s", "s.pupil_fk = p.id")
                            .leftJoin("training_exercise", "te","te.schedule_fk = s.id")
                            .leftJoin("training","t", "te.training_fk = t.id")
                            .execute();
    }

    async updatePupil(pupilDto: PupilDto): Promise<any> {
                      
        const { id, goal, person_fk, name, birthday, sex, access_fk, email, password, profile_fk, photo, role } = pupilDto;

        const newProfile = new Profile;
        newProfile.photo = photo;

        const newAccess = new Access();
        newAccess.email = email;
        console.log(password);
        console.log(password.includes("$2b$10"));
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
                                .where("id = :id", {id: id})
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
                                        .select("p.person_fk, ps.access_fk, a.profile_fk")
                                        .from("pupil", "p")
                                        .leftJoinAndSelect("person", "ps","ps.id = p.person_fk")
                                        .leftJoinAndSelect("access", "a","a.id = ps.access_fk")
                                        .leftJoinAndSelect("profile", "pf","pf.id = a.profile_fk")
                                        .where("p.id = :id", { id: id })
                                        .getRawOne();

        const queryRunner = AppDataSource.createQueryRunner();

        await queryRunner.startTransaction();

        try {            
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