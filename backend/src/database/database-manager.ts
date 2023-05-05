import Mongoose from "mongoose";


export default class DatabaseManager {

    private static mongooseInstance: typeof Mongoose

    static async initDatabaseConnection(): Promise<boolean> {
        try {
            this.mongooseInstance = await Mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
            return true
        } catch (error) {
            console.log(error)
        }

        return false
    }

    static getMongooseInstance(): typeof Mongoose {
        return this.mongooseInstance
    }
}
