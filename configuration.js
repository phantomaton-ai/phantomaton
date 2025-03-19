import fs from 'fs';
import path from 'path';
import os from 'os';

const mergeConfigurations = (globalConfig, localConfig) => {
  const mergedConfig = { ...globalConfig };
  
  for (const [key, value] of Object.entries(localConfig)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      mergedConfig[key] = {
        ...mergedConfig[key],
        ...value
      };
    } else {
      mergedConfig[key] = value;
    }
  }
  
  return mergedConfig;
};

const configuration = module => {
  const homeConfigPath = path.join(os.homedir(), '.phantomaton', 'configuration.json');
  const localConfigPath = path.join('.phantomaton', 'configuration.json');
  
  let globalConfig = {};
  let localConfig = {};

  if (fs.existsSync(homeConfigPath)) {
    try {
      const json = fs.readFileSync(homeConfigPath, 'utf-8');
      globalConfig = JSON.parse(json);
    } catch (error) {
      console.warn(`Error reading global configuration: ${error.message}`);
    }
  }

  if (fs.existsSync(localConfigPath)) {
    try {
      const json = fs.readFileSync(localConfigPath, 'utf-8');
      localConfig = JSON.parse(json);
    } catch (error) {
      console.warn(`Error reading local configuration: ${error.message}`);
    }
  }

  const moduleGlobalConfig = globalConfig[module] || {};
  const moduleLocalConfig = localConfig[module] || {};

  return mergeConfigurations(moduleGlobalConfig, moduleLocalConfig);
};

export default configuration;