declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      GHOST_URL: string;
      GHOST_KEY: string;
      GHOST_ADMIN_KEY: string;
      SNOW_MODE_ENABLED: string;
      SPOTIFY_CLIENT_ID: string;
      SPOTIFY_CLIENT_SECRET: string;
      SPOTIFY_REDIRECT_URI: string;
      SPOTIFY_AUTH_SECRET: string;
      SPOTIFY_CODE: string;
      SENDGRID_API_KEY: string;
    }
  }
}

declare global {
  interface Window {
    Calendly: any;
  }
}

export {};
