import { expect, stub } from 'lovecraft';
import hierophant from 'hierophant';
import priestess from 'priestess';
import Phantomaton from './phantomaton.js';

describe('Phantomaton', () => {
  let instance;

  beforeEach(() => {
    instance = new Phantomaton('Hello, world!');
  });

  it('imports modules', async () => {
    const importsSpy = stub(instance, 'imports');
    await instance.start();
    expect(importsSpy).to.have.been.called;
  });

  it('starts the conversation', async () => {
    const startSpy = stub(priestess, 'start').returns(() => {});
    await instance.start();
    expect(startSpy).to.have.been.called;
  });
});