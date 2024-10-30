import aleister from 'aleister';
import hierophant from 'hierophant';
import priestess from 'priestess';
import necronomicon from 'necronomicon';

class Phantomaton {
  constructor(text) {
    this.text = text;
    this.container = hierophant();
    this.container.install(priestess.start.resolver());
  }

  /**
   * Imports the specified modules for use in the Phantomaton system.
   * 
   * @param {string} modules - Newline-separated names of the modules to import.
   * @body modules
   * @returns {void}
   * @example phantomaton.import(['phantomaton-anthropic', 'phantomaton-cli'])
   */
  imports(body) {
    const modules = body.split('\n').map(m => m.trim()).filter(m => m.length > 0);
    this.promise = Promise.all(modules.map(async (module) => {
      const imported = await import(module);
      console.log(module, imported, imported.default);
      const { install } = imported.default({});
      install.forEach(component => this.container.install(component));
    }));
  }

  async start() {
    if (this.promise) await this.promise;
    const [start] = this.container.resolve(priestess.start.resolve);
    return start();
  }
}

export default (text) => {
  const { commands, instance } = aleister(Phantomaton)(text);
  const spellbook = necronomicon({ commands });
  spellbook.execute(text);
  instance.start();
};
