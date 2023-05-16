import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "../seeds/MainSeeder"
require("dotenv").config();


const databaseConfig: DataSourceOptions & SeederOptions = {
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(<string>process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    seeds: [MainSeeder],
    synchronize: true,
    logging: true,
    migrationsRun: true
};

export default databaseConfig;