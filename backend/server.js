require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const connectDB = require('./config/db');
const session = require('express-session');

// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');
const flightRoutes = require('./routes/Flight');
const airportRoutes = require('./routes/airport');
const trainRoutes = require('./routes/Train');
const stationRoutes = require("./routes/station");
const CityPlaceRoutes = require("./routes/CityPlace");
// passport config
require('./config/passport');


const app = express();
connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true })); // frontend URL
app.use(
    cookieSession({
        name: 'session',
        keys: [process.env.SESSION_SECRET || 'keyboardcat'],
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
);


app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/flight', flightRoutes);
app.use('/booking', bookingRoutes);
app.use('/airport', airportRoutes);
app.use("/trains", trainRoutes);
app.use("/stations", stationRoutes);
app.use("/places", CityPlaceRoutes);
app.get('/', (req, res) => res.send('Auth backend running'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));