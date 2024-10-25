import aleister from 'aleister';
import hierophant from 'hierophant';
import necronomicon from 'necronomicon';

class Phantomaton {
  constructor(text) {
    this.text = text;
    this.container = hierophant();
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
      const { install } = await import(module).default;
      install.forEach(component => this.container.install(component));
    }));
  }

  async start() {
    if (this.promise) await this.promise;
    const start = this.container.resolve(start);
  }
}

export default (text) => {
  const { commands, instance } = aleister(Phantomaton)(text);
  const spellbook = necronomicon({ commands });
  spellbook.execute(text);
  instance.start();
};
