import aleister from 'aleister';
import hierophant from 'hierophant';
import priestess from 'priestess';
import necronomicon from 'necronomicon';

import configuration from './configuration.js';
import importer from './importer.js';

class Phantomaton {
  constructor() {
    this.container = hierophant();
    this.container.install(priestess.input.resolver());
    this.container.install(priestess.start.resolver());
    this.promises = [];
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
      const imported = await importer.import(module);
      const { install } = imported.default(configuration(module));
      install.forEach(component => this.container.install(component));
      resolve();
    }));
  }

  async start(input) {
    this.container.install(priestess.input.provider([], () => () => input));
    await Promise.all(this.promises);
    const keys = [...this.container.providers.keys()];
    const key = keys.find(k => k.description === 'conversation:resolve');
    const [conversation] = this.container.resolve(key);
    const [start] = this.container.resolve(priestess.start.resolve);
    return start();
  }
}

export default async (text) => {
  const { commands, instance } = aleister(Phantomaton)();
  const spellbook = necronomicon({ commands, includes: { text: true, results: false } });
  await instance.start(spellbook.execute(text));
};
