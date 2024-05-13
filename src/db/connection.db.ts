import { Sequelize } from "sequelize";
//singleton Pattern
class Connection {
    private static instance: Sequelize | null = null;

    private constructor() {

    }

    public static getInstance(): Sequelize {
        if (!Connection.instance) {
            // Config DBConnection only once
            Connection.instance = new Sequelize('mayoristausuarios', 'root', '', {
                host: 'localhost',
                dialect: 'mysql'
            });
        }
        return Connection.instance;
    }
}

export default Connection.getInstance();