/**
 * A controller to handle the query requests for chat
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const query = async (req, res) => {
	try {
		const { profile_id } = req.user

		

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default query
