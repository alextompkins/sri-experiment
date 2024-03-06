import { myName } from './subModule.js';

export const doOtherThing = () => {
  const element = document.getElementById('doOtherThing');

  element.innerText = `WE DID IT, ${myName}, HOORAY!`;
  console.log(`WE DID IT, ${myName}, HOORAY!`);
};
