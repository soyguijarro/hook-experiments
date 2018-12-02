import Counter from './experiments/Counter';
import Stopwatch from './experiments/Stopwatch';
import Expirers from './experiments/Expirers';
import Inputs from './experiments/Inputs';
import Todo from './experiments/Todo';

export const EXPERIMENTS = [
  {
    value: 'counter',
    text: 'Counter',
    component: Counter,
  },
  {
    value: 'stopwatch',
    text: 'Stopwatch',
    component: Stopwatch,
  },
  {
    value: 'expirers',
    text: 'Timeouts',
    component: Expirers,
  },
  {
    value: 'inputs',
    text: 'Inputs',
    component: Inputs,
  },
  {
    value: 'todo',
    text: 'Todo list',
    component: Todo,
  },
];
