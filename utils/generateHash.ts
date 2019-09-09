import monthsConfig from './monthsConfig';

interface iMonth {
  month: number[];
}

interface iMonthData {
  summary: number[];
  MIN: number;
  MAX: number;
}

interface iTransaction {
  date: string;
  amount: number;
  transactionType: string;
}

enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit'
}

interface iValueForDay {
  currentValue: number;
  day: number;
  amount: number;
  transactionType: string;
}

export default function generateMonthData(
  transactions: iTransaction[]
): iMonthData {
  const months = [];
  let MIN = 0;
  let MAX = 0;
  transactions.forEach(transaction => {
    const { transactionType, date, amount } = transaction;
    const [_, month, day] = date.split('-');
    const monthNumber = Number(month) - 1;
    const index = Number(day) - 1;

    if (months[monthNumber]) {
      const currentValue = months[monthNumber][index] || 0;
      const newValue = computeValueForDay({
        currentValue,
        day: index,
        amount,
        transactionType
      });
      months[monthNumber][index] = newValue;
      MIN = Math.min(MIN, newValue);
      MAX = Math.max(MAX, newValue);
    } else {
      months[monthNumber] = initializeArraySize(date);
    }
  });
  const summary = months.reduce((allDays, month) => allDays.concat(month), []);

  return { MIN, MAX, summary };
}

function computeValueForDay(data: iValueForDay): number {
  let { currentValue, amount, transactionType } = data;
  if (transactionType === TransactionType.CREDIT) {
    currentValue += amount;
  } else if (transactionType === TransactionType.DEBIT) {
    currentValue -= amount;
  }
  return currentValue;
}

function initializeArraySize(dateString) {
  const date = new Date(dateString);
  const isLeap = new Date(date.getFullYear(), 1, 29).getMonth() == 1;

  const monthIndex = date.getMonth();

  let { length } = monthsConfig[monthIndex];
  // account for Leap Year
  if (monthIndex === 1 && isLeap) {
    length = 29;
  }
  return Array.from({ length }).fill(0);
}
