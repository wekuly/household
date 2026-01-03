import React from 'react';

const Form = ({ updateHousehold }) => {

    const isNotNumber = (text) => !/^\d*$/.test(text);
    const [value, setValue] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleInputChange = (event) => {
        const value = event.target.value;
        setErrorMessage("");
        if (isNotNumber(value)) {
            setErrorMessage("숫자만 입력하세요  .");
            return;
        }
        setValue(value);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        if (value === "" || parseFloat(value) === 0) {
            setErrorMessage("뭐든 입력하세요.");
            return;
        }
        // updateHousehold(value);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <p>방금 쓴 돈 : </p>
            <input
                type="text"
                name="name"
                placeholder=""
                value={value}
                onChange={handleInputChange} />
            <button type="submit">입력</button>
            <p>카테고리 : ( 기부, 정기적, 경조사, 생활비, 수입 )</p>
            <select name="category" id="category">
                <option value="Donation">기부</option>
                <option value="Regular">정기적</option>
                <option value="familyEvent">경조사</option>
                <option value="ETC">생활비</option>
                <option value="Plus">수입</option>
            </select>
            <p style={{ color: "red" }}>{errorMessage}</p>
        </form>

    );
}

export default Form;
