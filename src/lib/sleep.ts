export function sleep(duration: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(null), duration)
    })
}