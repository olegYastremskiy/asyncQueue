const task = async <T>(value: T) => {
  await new Promise((r) => setTimeout(r, 1000 * Math.random()));
  console.log(value);
};

class AsyncQueue {
  private tasks: Function[] = [];
  private isPending = false;

  async add(fn: Function): Promise<void> {
    this.tasks.push(fn);
    await this.work();
    return;
  }

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
