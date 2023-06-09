import Mixpanel from 'mixpanel'

const mixpanel = Mixpanel.init(process.env.MIXPANEL_ID)

export default mixpanel