// AppContext.jsx
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

export function AppContextProvider({ initialItems, children }) {
    const [items, setItems] = useState(initialItems);

    // items 변경 시 자동 저장
    useEffect(() => {
        console.log("items가 변경되었습니다.");
        localStorage.setItem("items", JSON.stringify(items));
        return () => console.log("strict모드");
    }, [items]);

    useEffect(() => {
    }, []);

    const addItem = (item) => {
        setItems(prev => [...prev, item]);
    };

    return (
        <AppContext.Provider value={{ items, addItem }}>
            {children}
        </AppContext.Provider>
    );
}
