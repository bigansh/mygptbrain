import findUser from '../../functions/profile/findUser'

/**
 * A controller to handle the read requests for the account
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const read = async (req, res) => {
	try {
		const { profile_id } = req.user

		const data = await findUser(profile_id)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default read
