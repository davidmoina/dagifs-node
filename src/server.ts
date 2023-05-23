import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads/',
    limits: { fileSize: 10000000 }, // 10MB max file(s) size
    abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
  })
);

export default app;
