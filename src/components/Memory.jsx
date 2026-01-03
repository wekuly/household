import { useApp } from '../store/AppContext';
import React from 'react';

const Memory = () => {
    const { user } = useApp();

    if (user.length <= 1) {
        return <h3>기록이 없습니다.</h3>
    }

    const totalMoney = user.reduce((acc, item) => {
        if (item.Category === "Plus" && item.Amount > 0) {
            return acc + item.Amount;
        }
        return acc;
    }, user[0].Money);

    const memoList =
        user.map((item, index) => {
            if (index === 0) {
                //아무것도 안합니다.
            }
            else {
                if (item.Category === "Plus" && item.Amount > 0) {
                    ;
                }
            }
        });

    return (
        <div>
            <p>남은 돈 : {totalMoney}</p>
            <p>기록 : {memoList}</p>
        </div>
    );
};

export default Memory;