import client from '../database'

export default async function insertIntoTable(
	table: string,
	fields: string[],
	values: string[]
): Promise<any> {
	let conn

	try {
		conn = await client.connect()

		const fieldsList = fields.join(', ')
		console.log('fields list: ', fieldsList)

		const valuesList = values.join(`', '`)
		console.log('values list: ', valuesList)

		const sql = `INSERT INTO ${table}(${fieldsList}) VALUES (default, '${valuesList}') RETURNING *`
		console.log('sql insert into: ', sql)
		const res = await conn.query(sql)
		const inserted = res.rows[0]
		return inserted
	} catch (e) {
		console.log('error in insertIntoTable: ', e)
	} finally {
		conn?.release()
	}
}
