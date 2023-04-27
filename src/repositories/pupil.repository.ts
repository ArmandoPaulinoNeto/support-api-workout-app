import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { DataPupilDto } from "src/dtos/data-pupil.dto";
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

    fetchAllPupil() {
        return AppDataSource.createQueryBuilder()
                            .select("p.id, ps.name, t.name as last_training")
                            .from("pupil", "p")
                            .innerJoin("person", "ps","ps.id = p.person_fk")
                            .leftJoin("schedule", "s", "s.pupil_fk = p.id")
                            .leftJoin("training_exercise", "te","te.schedule_fk = s.id")
                            .leftJoin("training","t", "te.training_fk = t.id")
                            .execute();
    }
}