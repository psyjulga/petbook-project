import client from '../database'

// return type can be of different custom types, so here we use any
export default async function deleteFromTable(
	table: string,
	field: string,
	value: string
): Promise<any> {
	let conn
	try {
		conn = await client.connect()
		const sql = `DELETE FROM ${table} WHERE ${field} = ${value} RETURNING *`
		const res = await conn.query(sql)
		const deletedRows = res.rows
		return deletedRows
	} catch (e) {
		console.log('error in deleteFromTable: ', e)
	} finally {
		conn?.release()
	}

	return null
}
