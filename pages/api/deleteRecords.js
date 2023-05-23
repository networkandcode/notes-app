import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import axios from 'axios'

const deleteRecords = async(req, res) => {
    const { user } = await getSession(req, res)
    if (!user.sub) {
        throw new Error('User not authenticated')
    }

    const ids = req.body
    
    let data = JSON.stringify({
        operation: "delete",
        schema: process.env.HDB_SCHEMA,
        table: process.env.HDB_TABLE,
        hash_values: ids,
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
      
    await axios.request(config)
        .then((response) => {
            const { message } = response.data
            res.status(200).json({ message })
        })
        .catch((error) => {
            console.log(error.message);
        })
}

export default withApiAuthRequired(deleteRecords)