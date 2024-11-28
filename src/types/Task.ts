export interface Duration {
    hours: number,
    minutes: number
}
export interface Task {
    id: string,
    title: string,
    description: string,
    duration:  Duration
}