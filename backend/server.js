require('dotenv').config();
const express = require('express');
const app = express();
const DbConnect = require('./database');
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser()); // this is enabling the cookies to use in the server coming from client request
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use('/storage', express.static('storage')); // means any req with /storage will get direct access and the image will be opened

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({ limit: '8mb' }));  // setting the limit to 8mb which can be recieved by the server
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello from express Js');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
