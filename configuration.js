import fs from 'fs';
import path from 'path';
import os from 'os';

const read = (file, module) => {
  if (!fs.existsSync(file)) return {};
  const json = fs.readFileSync(file, 'utf-8');
  const configurations = JSON.parse(json);
  return configurations[module] || {};
};

const configuration = module => [
  path.join(os.homedir(), '.phantomaton', 'configuration.json'),
  path.join('.phantomaton', 'configuration.json')
].map(
  file => read(file, module)
).reduce(
  (a, b) => ({ ...a, ...b}),
  {}
);

export default configuration;
