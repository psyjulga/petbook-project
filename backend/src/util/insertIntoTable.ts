import client from '../database'

export default async function insertIntoTable(
	table: string,
	fields: string[],
	values: string[],
	defaultID: boolean
): Promise<any> {
	let conn

	try {
		conn = await client.connect()

		const fieldsList = fields.join(', ')
		const valuesList = values.join(`', '`)

		const sqlWithDefault = `INSERT INTO ${table}(${fieldsList}) VALUES (default, '${valuesList}') RETURNING *`
		const sqlWithoutDefault = `INSERT INTO ${table}(${fieldsList}) VALUES ('${valuesList}') RETURNING *`

		const sql = defaultID ? sqlWithDefault : sqlWithoutDefault

		const res = await conn.query(sql)
		const inserted = res.rows[0]
		return inserted
	} catch (e) {
		console.log('error in insertIntoTable: ', e)
	} finally {
		conn?.release()
	}
}
