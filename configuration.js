import fs from 'fs';

const configuration = module => {
  const file = path.join('.phantomaton', 'configuration.json');
  if (!fs.existsSync(file)) return {};
  const json = fs.readFileSync(file, 'utf-8');
  const configurations = JSON.parse(json);
  return configurations[module] || {};
};

export default configuration;
