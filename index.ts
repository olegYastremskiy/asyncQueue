import { AsyncQueue } from './asyncQueue.class';

const task = async <T>(value: T) => {
  await new Promise((r) => setTimeout(r, 1000 * Math.random()));
  console.log(value);
};

/**
 * Testing without using async queue
 */
const testing = async () => {
  await Promise.all([
    task(1),
    task(2),
    task(3),
    task(4)]
  );
};

/**
 * Testing with using async queue
 */
const testingAsync = async () => {
  const queue = new AsyncQueue();

  await Promise.all([
    queue.add(() => task(1)),
    queue.add(() => task(2)),
    queue.add(() => task(3)),
    queue.add(() => task(4)),
  ]);
};

// testing();
testingAsync();
