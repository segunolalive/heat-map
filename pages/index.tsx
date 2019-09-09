import * as React from 'react';
import Cell from '../components/Cell';
import transactions from '../transactions.json';
import monthsConfig from '../utils/monthsConfig';

import generateMonthData from '../utils/generateHash';

export default function Index({ year = 2019 }) {
  const offset = new Date(year).getDay();
  const { MIN, MAX, summary } = generateMonthData(transactions);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <>
      <main>
        <h1>Transactions Heat Map</h1>
        <div className="flex">
          <div className="days">
            {weekDays.map(day => (
              <span className="label" key={day}>
                {day}
              </span>
            ))}
          </div>
          <div>
            <div className="grid">
              {Array.from({ length: offset }).map((_, index) => (
                <span key={index} className="placeholder" />
              ))}
              {summary.map((value, index) => (
                <Cell key={index} value={value} min={MIN} max={MAX} />
              ))}
            </div>
            <div className="months">
              {monthsConfig.map(({ name }) => (
                <span key={name} className="label">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
      <style jsx global>
        {`
          :root {
            font-size: 0.625rem;
          }

          html,
          body {
            padding: 0;
            margin: 0;
            width: 100%;
            min-height: 100%;
            color: #212121;
          }

          * {
            box-sizing: border-box;
          }

          .flex {
            display: flex;
          }

          main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .months {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            width: 100%;
          }

          .days {
            display: grid;
            grid-template-rows: repeat(7, 2rem);
            grid-auto-flow: column;
          }

          .label {
            font-size: 1.5rem;
          }

          h1 {
            font-size: 4rem;
            font-family: sans-serif;
          }

          .grid {
            display: grid;
            grid-template-rows: repeat(7, 2rem);
            grid-auto-flow: column;
            grid-auto-columns: 2rem;
          }

          span {
            border: 0.25rem solid white;
          }

          .placeholder {
            background: none;
          }
        `}
      </style>
    </>
  );
}
