#!/usr/bin/env node

import phantomaton from './phantomaton.js';
import fs from 'fs';
import path from 'path';

const [, , filename] = process.argv;
const content = fs.readFileSync(filename, 'utf8');

phantomaton(content);
