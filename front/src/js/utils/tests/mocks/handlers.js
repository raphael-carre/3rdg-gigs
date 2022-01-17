import Request from '@js/utils/classes/Request'
import { rest } from 'msw'

const gigsMockedData = [
    {
        id: 1,
        date: '2100-01-01T20:00:00',
        private: false
    },
    {
        id: 2,
        date: '2100-01-03T20:00:00',
        private: false
    }
]

export const handlers = [
    rest.get(`${Request.BASE_API_URL}/gigs/search`, (req, res, ctx) => {
        return res(ctx.json(gigsMockedData))
    })
]