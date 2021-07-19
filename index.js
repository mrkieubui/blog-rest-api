var express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const routes = require('./src/routes/blogRoutes');
routes(app);

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});