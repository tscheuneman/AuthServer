import { UserTest } from './tests/EntityTest/users.test.js'
import {createConnection, Connection} from "typeorm";

beforeAll(async () => {
    const connection = await createConnection({
        type: "postgres",
        host: "postgres",
        port: 5432,
        username: "postgres",
        password: "password",
        database: "todoapp_tests",
        synchronize: true,
        logging: false,
        esModuleInterop: false,
        entities: [
           "/var/www/todo/dist/Models/**/*.js"
        ]
    });

});


describe('Testing users', UserTest)