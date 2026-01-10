export function loadItems() {

    //더미데이터로 임시로 추가
    try {
        const saved = localStorage.getItem("items");
        return saved ? JSON.parse(saved) :
            [
            ];
    }
    catch {
        return [
        ];
    }

    // const user = JSON.parse(localStorage.getItem("user")) || [];
    /*
    [
        {
            "Date": "2026-01-04",
            "Amount": 100000,
            "Category": "Donation",  --Donation , Regular, familyEvent, ETC , Plus (기부, 정기적, 경조사, 생활비 , 수입)

            기부 : 십일조, 후원 등  --정기적이지만 따로 관리하자.
            정기적 : 보험, 휴대폰비, 넷플릭스비, 쿠팡와우 등
            경조사 : 결혼식, 장례식
            ETC : 그외 모든 생활비 (용돈)
            수입 : 월급, 용돈, 투자수익 등
        },
    ]

    */
}