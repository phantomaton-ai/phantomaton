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
  constructor(options) {
    this.container = hierophant();
    this.container.install(priestess.input.resolver());
    this.container.install(priestess.start.resolver());
    this.importer = new Importer(options.root);
    this.installed = [];
    this.installations = Promise.all((options.install || []).map(m => this.install(m)));
  }

  /**
   * Installs the specified plugin for use in the Phantomaton system.
   * 
   * @param {string} module - Name of the plugin to install
   * @returns {void}
   * @example phantomaton.import('phantomaton-anthropic\nphantomaton-cli')
   */
  async install(module) {
    if (this.installed.includes(module)) return;
    this.installed.push(module);
    if (typeof module === 'string') {
      const imported = await this.importer.import(module);
      this.install(imported.default(configuration(module)));
    } else {
      await Promise.all((module.include || []).map(m => this.install(m)));
      module.install.forEach(component => this.container.install(component));
    }
  }

  async start(input) {
    await this.installations;
    this.container.install(priestess.input.provider([], () => () => input));
    const [start] = this.container.resolve(priestess.start.resolve);
    return start();
  }
}

export default async (text, options = {}) => {
  options = typeof options === 'string' ? { root: options } : options;
  const { commands, instance } = aleister(Phantomaton)(options);
  const includes = { promises: true, text: true, results: false };
  const spellbook = necronomicon({ commands, includes });
  return instance.start(await spellbook.execute(text));
};
