
import { useApp } from '../store/useApp';
import React, { useEffect } from 'react';
import './Memory.css';

const Memory = () => {
    const { items } = useApp();

    useEffect(() => {
        console.log(items);
    }, [items]);


    if (items.length <= 1) {
        return <h3>기록이 없습니다.</h3>
    }

    // 전체 합계, 리스트, 카테고리별 합계 객체 계산
    // 날짜(Date)를 기반으로 주(월요일~일요일)별로 묶어서 저장
    function getWeekKey(dateStr) {
        // dateStr: "YYYY-MM-DD"
        const date = new Date(dateStr);
        // getDay() : 0 (일), 1 (월)...6 (토)
        const day = date.getDay();
        // 월요일이 주의 시작. day=1(월)이면 -0, day=0(일)이면 -6
        const diffToMonday = (day + 6) % 7;
        const monday = new Date(date);
        monday.setDate(date.getDate() - diffToMonday);
        // YYYY-MM-DD
        const year = monday.getFullYear();
        const month = String(monday.getMonth() + 1).padStart(2, '0');
        const dayNum = String(monday.getDate()).padStart(2, '0');
        return `${year}-${month}-${dayNum}`;
    }


    const { totalMoney, memoList, categoryTotals, weeklyData } = items.reduce(
        (acc, item, index) => {
            const amount = Number(item.Amount);
            if (Number.isNaN(amount)) return acc;

            // 전체 계산
            if (item.Category === "Plus") {
                acc.totalMoney += amount;
            } else {
                acc.totalMoney -= amount;
            }

            // 카테고리별 합계 계산
            if (!acc.categoryTotals[item.Category]) {
                acc.categoryTotals[item.Category] = 0;
            }
            if (item.Category === "Plus") {
                acc.categoryTotals[item.Category] += amount;
            } else {
                acc.categoryTotals[item.Category] -= amount;
            }

            // 주별 데이터 정리 (+, 아닌것 구별)
            const weekKey = getWeekKey(item.Date);
            if (!acc.weeklyData[weekKey]) {
                acc.weeklyData[weekKey] = { plus: [], minus: [] };
            }
            if (item.Category === "Plus") {
                acc.weeklyData[weekKey].plus.push({
                    ...item,
                    amount,
                    index,
                });
            } else {
                acc.weeklyData[weekKey].minus.push({
                    ...item,
                    amount,
                    index,
                });
            }

            // 리스트
            acc.memoList.push(
                <p key={index}>
                    {item.Date} : <span style={{ fontWeight: "bold", color: item.Category === "Plus" ? "red" : "blue" }}>{amount.toLocaleString()}</span> - {item.Category}
                </p>
            );
            return acc;
        },
        { totalMoney: 0, memoList: [], categoryTotals: {}, weeklyData: {} }
    );


    return (
        <div>
            <p>남은 돈 : <span style={{ fontWeight: "bold", color: totalMoney < 0 ? "blue" : "black" }}>{totalMoney.toLocaleString()}</span></p>
            {totalMoney < 0 && <p>돈이 부족해요. 조금 더 아껴봐요.</p>}
            <ul id="memoryList">
                <li className="memoryList_item">
                    <p>기록 :</p>
                    {memoList}
                </li>
                <li className="memoryList_item">
                    <p>카테고리 별 내역 :</p>
                    {Object.entries(categoryTotals).map(([category, total]) => (
                        <p key={category}>{category}: <span style={{ fontWeight: "bold", color: total > 0 ? "red" : "blue" }}>{total.toLocaleString()}</span></p>
                    ))}
                </li>
                <li className="memoryList_item">
                    <p>주별 내역 :</p>
                    {Object.entries(weeklyData).map(([weekKey, weekData]) => {
                        const plus = weekData.plus.reduce((a, { amount }) => a + +amount, 0);
                        const minus = weekData.minus.reduce((a, { amount }) => a + +amount, 0);
                        const diff = plus - minus;
                        return (
                            <p key={weekKey}>
                                {weekKey} ~ &nbsp;:&nbsp;
                                <span style={{ fontWeight: "bold", color: diff > 0 ? "red" : "blue" }}>
                                    {diff.toLocaleString()}
                                </span>
                            </p>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};

export default Memory;