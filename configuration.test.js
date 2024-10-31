import { expect, stub } from 'lovecraft';
import fs from 'fs';
import path from 'path';
import configuration from './configuration.js';

describe('Configuration', () => {
  it('loads configuration from file', () => {
    const configFile = path.join('.phantomaton', 'configuration.json');
    const configData = { 'phantomaton-anthropic': { apiKey: 'abc123' } };
    stub(fs, 'existsSync').returns(true);
    stub(fs, 'readFileSync').returns(JSON.stringify(configData));

    const config = configuration('phantomaton-anthropic');
    expect(config).to.deep.equal(configData['phantomaton-anthropic']);

    fs.existsSync.restore();
    fs.readFileSync.restore();
  });

  it('returns empty object if no configuration file', () => {
    const configFile = path.join('.phantomaton', 'configuration.json');
    stub(fs, 'existsSync').returns(false);

    const config = configuration('phantomaton-anthropic');
    expect(config).to.deep.equal({});

    fs.existsSync.restore();
  });
});