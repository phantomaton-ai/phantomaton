import phantomaton from './phantomaton.js';
import fs from 'fs';
import path from 'path';

const exampleFile = 'examples/chat.md';
const filePath = path.join(__dirname, exampleFile);
const content = fs.readFileSync(filePath, 'utf8');

phantomaton(content);