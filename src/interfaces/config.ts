interface App {
  PORT: number;
}

interface Db {
  URI: string;
}

interface Cloudinary {
  CLOUD_NAME?: string;
  API_KEY?: string;
  API_SECRET?: string;
}

export interface Config {
  development: {
    app: App;
    db: Db;
    cloudinary: Cloudinary;
  };
}
