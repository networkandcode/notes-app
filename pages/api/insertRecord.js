import axios from 'axios'

const insertRecord = async(req, res) => {
    const record = req.body

    console.log(6, Object.keys(record))

    let data = JSON.stringify({
        operation: "insert",
        schema: "notes",
        table: "notes",
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

export default insertRecord