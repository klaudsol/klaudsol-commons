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

    static async findByUser({ id }) {
        const db = new DB();

        const sql = `SELECT group_id FROM people_groups WHERE people_id = :id`;
        const params = [ { name: "id", value: { longValue: id } } ];

        const data = await db.executeStatement(sql, params);
        const records = data.records.map(([ { stringValue: id } ]) => id); // id is stringvalue for some reason

        return records;
    }
}
