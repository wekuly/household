import React from 'react';
import { useApp } from '../store/useApp';

const Form = ({ updateHousehold }) => {

    const { addItem } = useApp();

    const isNotNumber = (text) => !/^\d*$/.test(text);
    const [value, setValue] = React.useState("");
    const [errorMessage1, setErrorMessage1] = React.useState("카테고리를 고르세요.");
    const [errorMessage2, setErrorMessage2] = React.useState("");
    const [category, setCategory] = React.useState("default");

    const handleInputChange = (event) => {
        const value = event.target.value;
        setErrorMessage2("");
        if (isNotNumber(value)) {
            setErrorMessage2("숫자만 입력하세요.");
            return;
        }
        setValue(value);
    }
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setErrorMessage1("");
        setCategory(category);
        if (category === "default" || category === "" || parseFloat(value) === 0) {
            setErrorMessage1("카테고리를 고르세요.");
            return;
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        setErrorMessage1("");
        setErrorMessage2("");
        if (category === "default" || category === "") {
            setErrorMessage1("카테고리를 골라야 돼요.");
            return;
        }
        if (value === "" || parseFloat(value) === 0) {
            setErrorMessage2("쓴 돈이 비어있어요 .");
            return;
        }
        updateHousehold(value);

        setValue("");
        setCategory("default");
        document.getElementById("category").value = "default";
    }

    function updateHousehold(value) {
        addItem({
            Date: new Date().toISOString().split('T')[0],
            Amount: value,
            Category: category
        });
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <p>카테고리 : ( 기부, 정기적, 경조사, 생활비, 수입 ) -&nbsp;
                <select name="category" id="category" onChange={handleCategoryChange}>
                    <option value="default">카테고리를 고르세요</option>
                    <option value="Donation">기부</option>
                    <option value="Regular">정기적</option>
                    <option value="familyEvent">경조사</option>
                    <option value="ETC">생활비</option>
                    <option value="Plus">수입</option>
                </select></p>
            <p>방금 쓴 돈 : &nbsp;
                <input
                    type="text"
                    name="name"
                    placeholder=""
                    value={value}
                    onChange={handleInputChange} />
                <button type="submit">입력</button>
            </p>
            <p style={{ color: "red" }}>{errorMessage1}</p>
            <p style={{ color: "red" }}>{errorMessage2}</p>
        </form>

    );
}

export default Form;
