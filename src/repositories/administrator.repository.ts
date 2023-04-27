import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source";
import { DataTeacherDto } from "src/dtos/data-teacher.dto";
import { ExerciseDto } from "src/dtos/exercise.dto";
import { NoticeDto } from "src/dtos/notice.dto";
import { Access } from "src/entities/access.entity";
import { Exercise } from "src/entities/exercise.entity";
import { Notice } from "src/entities/notice.entity";
import { Person } from "src/entities/person.entity";
import { Profile } from "src/entities/profile.entity";
import { Teacher } from "src/entities/teacher.entity";
import { CostumDate } from "src/util/costum-data";
import { EncriptorBcrypt } from "src/util/encriptor-bcrypt";
import { v4 } from "uuid";

@Injectable()
export class AdministratorRepository{
    
    async createTeacher(teacherDto: DataTeacherDto): Promise<Teacher> {
        
        const { cref, name, birthday, sex, email, password, photo, role } = teacherDto;
        
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

        const newTeacher = new Teacher();
        newTeacher.id = v4();
        newTeacher.cref = cref;
        newTeacher.person_fk = newPerson.id;
        
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
                                .into("teacher")
                                .values(newTeacher)
                                .execute();
                                
                                await queryRunner.commitTransaction();
                                return newTeacher;
                            } 
                            catch (error) {
                                queryRunner.rollbackTransaction();
                                console.log(error);
            throw "Erro ao tentar salvar os dados do aluno."
        }        
    }
    
    fetchAllTeacher(){
        return AppDataSource.createQueryBuilder()
        .select("t.id, t.cref, t.person_fk, p.name")
        .from("teacher", "t")
        .leftJoin("person","p", "t.person_fk = p.id")
        .execute();
    }
    
    async createExercise(exerciseDto: ExerciseDto): Promise<Exercise>{
        
        const { name, muscleGroup } = exerciseDto;
        
        const newExercise = new Exercise();
        
        newExercise.id = v4();
        newExercise.name = name;
        newExercise.muscle_group = muscleGroup;

        try {
            AppDataSource.createQueryBuilder()
                                            .insert()
                                            .into("exercise")
                                            .values(newExercise)
                                            .execute();
                                            
            return newExercise;
        } catch (error) {
            throw "Erro ao tentar salvar os dados do exercício!"
        }
    }
    
    fetchAllExercise() {
        return AppDataSource.createQueryBuilder()
                            .select("*")
                            .from("exercise","e")
                            .execute();
    }

    async createNotice(noticeDto: NoticeDto): Promise<Notice> {
        
        const {id, title, description, image, administratorFK} = noticeDto;

        const newNotice = new Notice();
        newNotice.id = v4();
        newNotice.title = title;
        newNotice.description = description;
        newNotice.image = image;
        newNotice.administrator_fk = administratorFK

        try {
            AppDataSource.createQueryBuilder()
                                .insert()
                                .into("notice")
                                .values(newNotice)
                                .execute();
            return newNotice;
        } catch (error) {
            throw "Erro ao tentar salvar dados do anúncio!"
        }
    }
    
}