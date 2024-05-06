const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postsRouter = require('./postsRouter');
const authRouter = require('./authRouter');

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.use('/posts', postsRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
