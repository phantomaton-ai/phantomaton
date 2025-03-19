import fs from 'fs';
import path from 'path';
import os from 'os';

const configuration = module => {
  const homeConfigPath = path.join(os.homedir(), '.phantomaton', 'configuration.json');
  const localConfigPath = path.join('.phantomaton', 'configuration.json');
  
  let config = {};

  try {
    if (fs.existsSync(homeConfigPath)) {
      const homeJson = fs.readFileSync(homeConfigPath, 'utf-8');
      const homeConfig = JSON.parse(homeJson);
      config = { ...config, ...homeConfig[module] };
    }

    if (fs.existsSync(localConfigPath)) {
      const localJson = fs.readFileSync(localConfigPath, 'utf-8');
      const localConfig = JSON.parse(localJson);
      config = { ...config, ...localConfig[module] };
    }
  } catch (error) {
    console.warn(`Configuration error: ${error.message}`);
  }

  return config;
};

export default configuration;