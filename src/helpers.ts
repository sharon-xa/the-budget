import dayjs from 'dayjs';

export function addSpaceBetweenHundreds(money_amount: string | number): string {

    if (typeof money_amount === "number") money_amount = money_amount.toString();

    return money_amount.split("").reverse().map((item, index, arr) => {
        if (index % 3 === 0 && index !== 0)
            return arr[index] + ",";
        return item;
    }).reverse().join("");
}

// This function takes a string and capitalize the first character and return the string
export const capitalizeFirstCharacter = (str: string): string => str.slice(0, 1).toUpperCase() + str.slice(1, str.length);

// return the index of the largest entryID in the array of logs
export function findLastLog(logs: LogType[]): number {
    if (logs.length === 0) return 0;

    let max = 0;
    let logIndex: number = 0;
    logs.forEach((log, index) => {
        if (log.id > max) {
            max = log.id;
            if (log.id === max) logIndex = index;
        }
    })
    return logIndex;
}

export function formatDate(date: string): string {
    return dayjs(date).format("YYYY-MM-DD hh:mm A")
}
