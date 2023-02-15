const task = async <T>(value: T) => {
  await new Promise((r) => setTimeout(r, 1000 * Math.random()));
  console.log(value);
};

/**
 * Class for working with async queues
 */
class AsyncQueue {
  private tasks: Function[] = [];
  private isPending = false;

  /**
   * Method for adding task to queue
   * @param fn - task - that needs to be added and handled in queue
   * @return - nothing needs to be returned
   */
  async add(fn: Function): Promise<void> {
    this.tasks.push(fn);
    await this.work();
    return;
  }

  /**
   * Method for working with tasks in queue
   * @params - empty
   * @return - nothing needs to be returned
   */
  async work(): Promise<void> {
    if (!this.tasks.length || this.isPending) return;
    this.isPending = true;
    const task: Function = <Function>this.tasks.shift();
    await task();
    this.isPending = false;
    return this.work();
  }
}

const testing = async () => {
  await Promise.all([
    task(1),
    task(2),
    task(3),
    task(4)]
  );
};

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
