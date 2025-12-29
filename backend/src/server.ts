import 'dotenv/config';
import app from './app';
import { seedAdmin } from './database/seedAdmin';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
