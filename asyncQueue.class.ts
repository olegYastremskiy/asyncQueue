 /**
 * Class for working with async queues
 */
export class AsyncQueue {
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