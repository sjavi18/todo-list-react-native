
export const formatDate = (secs: number) => {
    const t = new Date(1970, 0, 1)
    t.setSeconds(secs)
    return t.toLocaleDateString('ko-KR')
}

export const secondsToDate = (secs: number) => {
    const t = new Date(1970, 0, 1)
    return t.setSeconds(secs)
}