import express from 'express';
import Redis from 'ioredis';
import cors from 'cors';
import UserRoutes from './routes/user';
import DBRoutes from './routes/db';
import MessageRoutes from './routes/message';
import ConversationRoutes from './routes/conversation';
import OnlineRoutes from './routes/online';
import VersionRoutes from './routes/version';
import AuthRoutes from './routes/auth';
import PingRoutes from './routes/ping';
import config from './config/key';

const app = express();
let redisInstance;
let client;

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Config Redis
if (config.env == 'staging' || config.env == 'production') {
  redisInstance = new Redis({
    sentinels: [
      { host: config.redis.sentinel0, port: config.redis.sentinelPort },
      { host: config.redis.sentinel1, port: config.redis.sentinelPort },
      { host: config.redis.sentinel2, port: config.redis.sentinelPort }
    ],
    name: config.redis.masterGroupName
  });
} else {
  console.log('admin dev mode');
  redisInstance = new Redis({
    host: config.redis.host,
    port: config.redis.port
  });
}

client = redisInstance;

// Use Routes
app.use('/api/db', DBRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/message', MessageRoutes);
app.use('/api/conversation', ConversationRoutes);
app.use('/api/online', OnlineRoutes);
app.use('/api/version', VersionRoutes);
app.use('/api/auth', AuthRoutes);
app.use('api/ping', PingRoutes);

export { client, app };
