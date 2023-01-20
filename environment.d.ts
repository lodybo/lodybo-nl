declare global {
  namespace NodeJs {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      GHOST_URL: string;
      GHOST_KEY: string;
    }
  }
}

export {};
