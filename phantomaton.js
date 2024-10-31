import aleister from 'aleister';
import hierophant from 'hierophant';
import priestess from 'priestess';
import necronomicon from 'necronomicon';

import configuration from './configuration.js';
import importer from './importer.js';

class Phantomaton {
  constructor(text) {
    this.text = text;
    this.container = hierophant();
    this.container.install(priestess.input.resolver());
    this.container.install(priestess.start.resolver());
    this.container.install(priestess.input.provider([], () => () => text));
  }

  /**
   * Imports the specified modules for use in the Phantomaton system.
   * 
   * @param {string} modules - Newline-separated names of the modules to import.
   * @body modules
   * @returns {void}
   * @example phantomaton.import('phantomaton-anthropic\nphantomaton-cli')
   */
  imports(body) {
    const modules = body.split('\n').map(m => m.trim()).filter(m => m.length > 0);
    this.promise = Promise.all(modules.map(async (module) => {
      const imported = await importer.import(module);
      const { install } = imported.default(configuration(module));
      install.forEach(component => this.container.install(component));
    }));
  }

  async start() {
    if (this.promise) await this.promise;
    const keys = [...this.container.providers.keys()];
    const key = keys.find(k => k.description === 'conversation:resolve');
    const [conversation] = this.container.resolve(key);
    const [start] = this.container.resolve(priestess.start.resolve);
    return start();
  }
}

export default async (text) => {
  const { commands, instance } = aleister(Phantomaton)(text);
  const spellbook = necronomicon({ commands });
  spellbook.execute(text);
  await instance.start();
};
