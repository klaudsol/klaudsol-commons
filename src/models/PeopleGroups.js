import DB from "../lib/DB";

export default class PeopleGroups {
    static async add({ id, groups }) {
        const db = new DB();

        const sql = `INSERT INTO people_groups (people_id, group_id) VALUES (:id, :groups)`;
        const params = groups.map((group) => ({
             
        }))

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
