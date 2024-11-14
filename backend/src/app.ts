import express from 'express';
import configurePassport from './config/passport';
import passport from 'passport';
import routes from './routes';

const app = express();

configurePassport(passport);

app.use(express.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

app.use('/api', routes);

export default app;
