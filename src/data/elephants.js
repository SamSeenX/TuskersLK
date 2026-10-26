/**
 * Sri Lankan Elephants and Tuskers Unified Archive Dataset
 * Aggregates wild tuskers, national park legends, and temple custodians
 */

import { WILD_ELEPHANTS } from './wild-elephants.js';
import { PROTECTED_TUSKERS } from './protected-tuskers-1.js';
import { PROTECTED_TUSKERS_2 } from './protected-tuskers-2.js';
import { PARK_ELEPHANTS } from './park-elephants.js';
import { CUSTODIAN_ELEPHANTS } from './custodian-elephants.js';

export const ELEPHANTS = [
  ...WILD_ELEPHANTS,
  ...PROTECTED_TUSKERS,
  ...PROTECTED_TUSKERS_2,
  ...PARK_ELEPHANTS,
  ...CUSTODIAN_ELEPHANTS
];

export function getElephantById(id) {
  return ELEPHANTS.find((elephant) => elephant.id === id);
}

export function getStats() {
  return {
    total: ELEPHANTS.length,
    alive: ELEPHANTS.filter((e) => e.status === 'Alive').length,
    deceased: ELEPHANTS.filter((e) => e.status === 'Deceased').length,
    historical: ELEPHANTS.filter((e) => e.status === 'Historical').length,
    wild: ELEPHANTS.filter((e) => e.category === 'Wild Tusker').length,
    temple: ELEPHANTS.filter((e) => e.category === 'Temple Custodian').length
  };
}
