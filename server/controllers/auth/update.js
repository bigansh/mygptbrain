import authFinderAndUpdater from '../../functions/lifecycle/authFinderOrUpdater.js'

/**
 * A controller to handle the read requests for the account
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const update = async (req, res) => {
	try {
		const { profile_id } = req.user

		const { userObject } = req.body

		if (!userObject && !userObject.authDetails)
			throw new Error('No userObject found!')

		const data = await authFinderAndUpdater(userObject)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default update
