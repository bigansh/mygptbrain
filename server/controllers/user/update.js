import updateUser from '../../functions/user/updateUser.js'

/**
 * A controller to handle the update requests for the account
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const update = async (req, res) => {
	try {
		const { userObject } = req.body

		const data = await updateUser(userObject)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default update
