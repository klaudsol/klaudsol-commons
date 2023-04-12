import DB from "../lib/DB";

export default class PeopleGroups {
  static async connect({ id, groups }) {
    const db = new DB();

    const sql = `INSERT IGNORE INTO people_groups (people_id, group_id) VALUES (:people_id, :group_id)`;
    const params = groups.map((group) => [
      { name: "people_id", value: { longValue: id } },
      { name: "group_id", value: { longValue: group } },
    ]);

    await db.batchExecuteStatement(sql, params);

    return true;
  }

  static async disconnect({ id, groups }) {
    const db = new DB();

    // DELETE IN (...groups) wont work for some reason. Each deletion is batched for now
    const sql = `DELETE FROM people_groups WHERE people_id = :people_id AND group_id = :group_id`;
    const params = groups.map((group) => [
      { name: "people_id", value: { longValue: id } },
      { name: "group_id", value: { longValue: group } },
    ]);

    await db.batchExecuteStatement(sql, params);

    return true;
  }
}
