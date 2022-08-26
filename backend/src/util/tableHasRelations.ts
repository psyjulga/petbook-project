import client from '../database'

export default async function tableHasRelations(
	table: string,
	foreignKey: string,
	id: string
): Promise<boolean> {
	let conn

	try {
		conn = await client.connect()
		const sql = `SELECT * FROM ${table} WHERE ${foreignKey} = ${id}`
		const res = await conn.query(sql)
		const relations = res.rows
		if (relations.length) return true
	} catch (e) {
		console.log('error in tableHasRelations: ', e)
	} finally {
		conn?.release()
	}

	return false
}
