import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import axios from 'axios'

const insertRecord = async(req, res) => {
    const { user } = await getSession(req, res)
    if (!user.sub) {
        throw new Error('User not authenticated')
    }

    const record = req.body

    let data = JSON.stringify({
        operation: "insert",
        schema: process.env.HDB_SCHEMA,
        table: process.env.HDB_TABLE,
        records: [
            record,
        ]
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.HDB_ENDPOINT,
        headers: {
            Authorization: `Basic ${process.env.HDB_AUTH_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data
    }
      
    axios.request(config)
        .then((response) => {
            const { message } = response.data
            res.status(200).json({ message })
        })
        .catch((error) => {
            console.log(error);
        })
}

export default withApiAuthRequired(insertRecord)