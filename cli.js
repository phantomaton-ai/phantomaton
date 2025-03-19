#!/usr/bin/env node

import phantomaton from './phantomaton.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [, , filename] = process.argv;
const targetFile = filename || path.join(__dirname, 'phantomaton.md');

if (!fs.existsSync(targetFile)) {
  console.error(`Error: Configuration file not found at ${targetFile}`);
  process.exit(1);
}

const content = fs.readFileSync(targetFile, 'utf8');
const root = path.dirname(targetFile);

phantomaton(content, root);