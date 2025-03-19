import { expect, stub } from 'lovecraft';
import fs from 'fs';
import path from 'path';
import configuration from './configuration.js';
import os from 'os';

describe('Configuration', () => {
  beforeEach(() => {
    stub(fs, 'existsSync');
    stub(fs, 'readFileSync');
  });

  afterEach(() => {
    fs.existsSync.restore();
    fs.readFileSync.restore();
  });

  it('loads configuration from file', () => {
    const configData = { 'phantomaton-anthropic': { apiKey: 'abc123' } };
    fs.existsSync.returns(true);
    fs.readFileSync.returns(JSON.stringify(configData));

    const config = configuration('phantomaton-anthropic');
    expect(config).to.deep.equal(configData['phantomaton-anthropic']);
  });

  it('returns empty object if no configuration file', () => {
    fs.existsSync.returns(false);

    const config = configuration('phantomaton-anthropic');
    expect(config).to.deep.equal({});
  });

  it('merges configurations from multiple sources', () => {
    const homeConfigData = { 
      'phantomaton-anthropic': { 
        apiKey: 'global-key', 
        model: 'claude-2' 
      } 
    };
    const localConfigData = { 
      'phantomaton-anthropic': { 
        apiKey: 'local-key',
        temperature: 0.7 
      } 
    };

    // Simulate home config file
    fs.existsSync
      .withArgs(path.join(os.homedir(), '.phantomaton', 'configuration.json'))
      .returns(true);
    fs.readFileSync
      .withArgs(path.join(os.homedir(), '.phantomaton', 'configuration.json'))
      .returns(JSON.stringify(homeConfigData));

    // Simulate local config file
    fs.existsSync
      .withArgs(path.join('.phantomaton', 'configuration.json'))
      .returns(true);
    fs.readFileSync
      .withArgs(path.join('.phantomaton', 'configuration.json'))
      .returns(JSON.stringify(localConfigData));

    const config = configuration('phantomaton-anthropic');
    expect(config).to.deep.equal({
      apiKey: 'local-key',
      model: 'claude-2',
      temperature: 0.7
    });
  });
});