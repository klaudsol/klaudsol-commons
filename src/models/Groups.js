import DB from "../lib/DB";

export default class Group {
    static async all() {
        const db = new DB();

        const sql = `SELECT * FROM groups`;

        const data = await db.executeStatement(sql);
        const records = data.records.map(
            ([
                { longValue: id },
                { stringValue: name },
                { stringValue: description },
                { longValue: isSystemSupplied }, // for some reason, its a integer, not a boolean
            ]) => ({ id, name, description, isSystemSupplied }));

        return records;
    }
}
