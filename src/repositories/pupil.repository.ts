import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { AdministratorDto } from "src/dtos/administrator.dto";
import { PupilDto } from "src/dtos/pupil.dto";
import { Access } from "src/entities/access.entity";
import { Person } from "src/entities/person.entity";
import { Profile } from "src/entities/profile.entity";
import { Pupil } from "src/entities/pupil.entity";
import { CostumDate } from "src/util/costum-data";
import { v4 } from "uuid";

@Injectable()
export class PupilRepository{

    async createPupil(pupilDto: PupilDto): Promise<Pupil> {
                      
        const { goal, person } = pupilDto;
        const {name, birthday, gender, access } = person;
        const {email, password, profile } = access;
        const { photo, role } = profile;


        const newProfile = new Profile;
        newProfile.id = v4();
        newProfile.role = role;
        newProfile.photo = photo;

        const newAccess = new Access();
        newAccess.id = v4();
        newAccess.email = email;
        newAccess.password = password;
        newAccess.profile_fk = newProfile.id;

        const newPerson = new Person();
        newPerson.id = v4();
        newPerson.name = name;
        newPerson.birthday = new CostumDate().convertToDate(birthday);
        newPerson.gender = gender;
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
            return new Pupil();
        }        
    }    

    async getDataHome(administratorDto: AdministratorDto){

        const {id} = administratorDto;

        const administrator = await AppDataSource.createQueryBuilder()
                                                    .select("*")
                                                    .from("administrator", "a")
                                                    .where("a.id = :id", {id: id})
                                                    .execute();

        const pupilNumber = await AppDataSource.createQueryBuilder()
                                                .select("*")
                                                .from("pupil", "p")
                                                .groupBy("p.id")
                                                .addSelect("COUNT(*)", "c")
                                                .getRawMany();

        
        const notice = await AppDataSource.createQueryBuilder()
                                            .select("*")
                                            .from("notice", "n")
                                            .orderBy("n.id","DESC")
                                            .getRawOne();

        const count = await this.countPupil(pupilNumber);

        return {administrator, count, notice}                              
    }

    countPupil(pupilNumber){
        
        return pupilNumber != null ? pupilNumber.filter(number =>(number.c == "1")).length : 0;
    }
}