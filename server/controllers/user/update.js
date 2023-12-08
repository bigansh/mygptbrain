import updateUser from '../../functions/user/updateUser.js'
import updateUserMetadata from '../../functions/user/updateUserMetadata.js'

/**
 * A controller to handle the update requests for the account
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const update = async (req, res) => {
	try {
		const { userObject, userMetadataObject } = req.body

		const { profile_id } = req.user

		let data

		if (req.query.query_type === 'metadata') {
			data = await updateUserMetadata(profile_id, userMetadataObject)
		} else {
			data = await updateUser(userObject, profile_id)
		}

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default update
