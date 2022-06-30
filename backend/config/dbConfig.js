const MONGO_PASS = 'admin123';
const MONGODB_URL = `mongodb+srv://admin:${MONGO_PASS}@cluster0.nletj.mongodb.net/?retryWrites=true&w=majority`;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = {
    MONGO_PASS: MONGO_PASS,
    MONGODB_URL: MONGODB_URL,
    mongooseOptions: mongooseOptions,
}
