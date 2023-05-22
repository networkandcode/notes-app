import axios from 'axios'

const getRecords = (req, res) => {
    const email = req.body

    console.log(6, email)
    
    let data = JSON.stringify({
        operation: "sql",
        sql: `SELECT * FROM notes.notes WHERE email = "${email}"`
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

axios.request(config)
.then((response) => {
    const records = response.data
    res.status(200).json(records)
})
.catch((error) => {
  console.log(error);
});

}

export default getRecords