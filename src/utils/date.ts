
export const formatDate = (data: Date): string => {
    const year = data.getFullYear();
    const month = data.getMonth() < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
    const day = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
    return `${year}.${month}.${day}`
}