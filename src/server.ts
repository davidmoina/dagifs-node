import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import gifsRouter from './routes/gifs.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads/',
    limits: { fileSize: 10000000 },
    abortOnLimit: true
  })
);
app.use('/gifs', gifsRouter);

export default app;
