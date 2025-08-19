declare const enum TaskStatus {
    Created = 0,
    WaitingToRun = 1,
    Running = 2,
    RanToCompletion = 3,
    Cancelled = 4,
    Faulted = 5
}
export default TaskStatus;
