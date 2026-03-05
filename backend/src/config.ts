export interface Config {
  NODE_ENV: string;
  PORT: string;
  CLIENT_URL: string;
  GITHUB_TOKEN: string;
  GITHUB_API_URL: string;
}

type ConfigKey = keyof Config;

const loadConfig = () => {
  const requiredVars: ConfigKey[] = [
    'NODE_ENV',
    'PORT',
    'CLIENT_URL',
    'GITHUB_TOKEN',
    'GITHUB_API_URL',
  ];

  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return requiredVars.reduce((acc, key) => {
    acc[key] = process.env[key] as string;
    return acc;
  }, {} as Config);
};

export const config: Config = loadConfig();
