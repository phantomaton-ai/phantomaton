import { expect, stub } from 'lovecraft';
import hierophant from 'hierophant';
import priestess from 'priestess';

import importer from './importer.js';
import phantomaton from './phantomaton.js';

const TEST = `
/install(module:start-plugin)
/install(module:some-plugin)
/install(module:some-other-plugin)

Testbot!
`;

describe('Phantomaton', () => {
  let start;

  beforeEach(async () => {
    start = stub();
    const installs = {
      'start-plugin': [
        priestess.start.provider([], () => start)
      ]
    };
    stub(importer, 'import').callsFake(module => ({ default: () => ({
      install: installs[module] || []
    }) }));
    await phantomaton(TEST);
  });

  afterEach(() => {
    importer.import.restore();
  });


  it('imports modules', () => {
    expect(importer.import.calledWith('start-plugin')).to.be.true;
  });
});
