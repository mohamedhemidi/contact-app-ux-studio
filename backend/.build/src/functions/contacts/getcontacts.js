import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import mysql from "mysql";
const host = "uxstudio.c5ijdfslnocg.eu-west-1.rds.amazonaws.com";
const user = "admin";
const password = "uxstudio2023";
const database = "uxstudio";
const handler = async () => {
    const contactsList = [
        {
            name: "Timothy Lewis",
            email: "timothy@lewis.com",
            phone: "+122334",
            active: true,
        },
    ];
    try {
        let connection = mysql.createConnection({
            host,
            user,
            password,
            database,
            ssl: "Amazon RDS",
        });
        console.log(connection);
        return formatJSONResponse(200, {
            contacts: contactsList,
        });
    }
    catch (error) {
        return formatJSONResponse(400, {
            error,
        });
    }
};
export const getcontacts = middyfy(handler);
//# sourceMappingURL=getcontacts.js.map