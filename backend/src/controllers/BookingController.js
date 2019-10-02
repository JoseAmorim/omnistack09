const Booking = require('../models/Booking')
const User = require('../models/User')
const Spot = require('../models/Spot')

module.exports = {
    async store(req, res) {
        const { user_id: userId } = req.headers
        const { spot_id: spotId } = req.params
        const { date } = req.body

        const user = await User.findById(userId)
        const spot = await Spot.findById(spotId)

        if (!user) {
            return res.status(400).json({ message: 'User not found. :(' })
        }

        if (!spot) {
            return res.status(400).json({ message: 'Spot not found. :(' })
        }

        const booking = await Booking.create({
            date,
            user: userId,
            spot: spotId,
        })

        await booking
            .populate('spot')
            .populate('user')
            .execPopulate()

        return res.json(booking)
    },
}
