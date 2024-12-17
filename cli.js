#!/usr/bin/env node

import phantomaton from './phantomaton.js';
import fs from 'fs';
import path from 'path';

const [, , filename] = process.argv;
const content = fs.readFileSync(filename, 'utf8');
const root = path.dirname(filename);

phantomaton(content, root);
