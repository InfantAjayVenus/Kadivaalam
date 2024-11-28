export interface Task {
    id: string,
    title: string,
    description: string,
    duration: {
        hours: number,
        minutes: number
    }
}