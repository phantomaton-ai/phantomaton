import path from 'path';
import { fileURLToPath } from 'url';

import aleister from 'aleister';
import hierophant from 'hierophant';
import priestess from 'priestess';
import necronomicon from 'necronomicon';

import configuration from './configuration.js';
import Importer from './importer.js';

// Determine the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Phantomaton {
  constructor(root) {
    this.container = hierophant();
    this.container.install(priestess.input.resolver());
    this.container.install(priestess.start.resolver());
    this.promises = [];
    this.importer = new Importer(root);
  }

  /**
   * Installs the specified plugin for use in the Phantomaton system.
   * 
   * @param {string} module - Name of the plugin to install
   * @returns {void}
   * @example phantomaton.import('phantomaton-anthropic\nphantomaton-cli')
   */
  install(module) {
    this.promises.push(new Promise(async resolve => {
      const imported = await this.importer.import(module);
      const { install } = imported.default(configuration(module));
      install.forEach(component => this.container.install(component));
      resolve();
    }));
  }

  async start(input) {
    this.container.install(priestess.input.provider([], () => () => input));
    await Promise.all(this.promises);
    const [start] = this.container.resolve(priestess.start.resolve);
    return start();
  }
}

export default async (text, root) => {
  const { commands, instance } = aleister(Phantomaton)(root);
  const spellbook = necronomicon({ commands, includes: { text: true, results: false } });
  await instance.start(spellbook.execute(text));
};