import client from '../database'

export default async function selectFromTable(
	column: string,
	table: string,
	field: string,
	value: string
): Promise<any> {
	let conn

	try {
		conn = await client.connect()
		const sql = `SELECT ${column} FROM ${table} WHERE ${field} = ${value}`
		const res = await conn.query(sql)
		const rows = res.rows
		return rows
	} catch (e) {
		console.log('error in selectFromTable: ', e)
	} finally {
		conn?.release()
	}
}
