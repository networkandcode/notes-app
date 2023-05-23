import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import axios from 'axios'

const getRecords = async(req, res) => {
    const { user } = await getSession(req, res)
    if (!user.sub) {
        throw new Error('User not authenticated')
    }

    const email = req.body

    const schema = process.env.HDB_SCHEMA
    const table = process.env.HDB_TABLE
    
    let data = JSON.stringify({
        operation: "sql",
        sql: `SELECT * FROM ${schema}.${table} WHERE email = "${email}"`
    })

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: process.env.HDB_ENDPOINT,
  headers: {
    Authorization: `Basic ${process.env.HDB_AUTH_TOKEN}`,
    'Content-Type': 'application/json'
  },
  data : data
};

await axios.request(config)
.then((response) => {
    const records = response.data
    res.status(200).json(records)
})
.catch((error) => {
  console.log(error);
});

}

export default withApiAuthRequired(getRecords)