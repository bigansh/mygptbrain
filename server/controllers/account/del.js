import deleteUser from '../../functions/profile/deleteUser'

/**
 * A controller to handle the delete requests for the account
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const del = async (req, res) => {
	try {
		const { profile_id } = req.user

		const data = await deleteUser(profile_id)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default del
