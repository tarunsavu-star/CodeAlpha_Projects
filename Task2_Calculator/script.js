/* =====================================================
   NOVACALC - PREMIUM ADVANCED CALCULATOR
   COMPLETE script.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const display =
        document.getElementById("display");

    const expressionDisplay =
        document.getElementById("expression");

    const displayStatus =
        document.getElementById("displayStatus");

    const copyBtn =
        document.getElementById("copyBtn");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastIcon =
        document.getElementById("toastIcon");

    const historyList =
        document.getElementById("historyList");

    const emptyHistory =
        document.getElementById("emptyHistory");

    const clearHistoryBtn =
        document.getElementById("clearHistory");

    const historySearch =
        document.getElementById("historySearch");

    const themeBtn =
        document.getElementById("themeBtn");

    const memoryIndicator =
        document.getElementById("memoryIndicator");

    const historyIndicator =
        document.getElementById("historyIndicator");


    /* =====================================================
       STATE
    ===================================================== */

    let currentValue = "0";

    let previousValue = null;

    let currentOperator = null;

    let waitingForOperand = false;

    let expressionText = "";

    let justCalculated = false;

    let history = [];

    let historyFilter = "all";


    /* =====================================================
       LOAD SAVED DATA
    ===================================================== */

    try {

        const savedHistory =
            localStorage.getItem(
                "novaCalcHistory"
            );

        if (savedHistory) {

            history =
                JSON.parse(savedHistory);

        }

    } catch (error) {

        history = [];

    }


    /* =====================================================
       FORMAT NUMBER
    ===================================================== */

    function formatNumber(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "0";
        }

        if (!Number.isFinite(Number(value))) {
            return "Error";
        }

        const number =
            Number(value);

        if (
            Math.abs(number) >= 1e12 ||
            (
                Math.abs(number) > 0 &&
                Math.abs(number) < 1e-8
            )
        ) {

            return number.toExponential(6);

        }

        const rounded =
            Number(
                number.toFixed(10)
            );

        return String(rounded);
    }


    /* =====================================================
       UPDATE DISPLAY
    ===================================================== */

    function updateDisplay() {

        display.textContent =
            currentValue;

        display.classList.remove(
            "pop"
        );

        void display.offsetWidth;

        display.classList.add(
            "pop"
        );

        if (displayStatus) {

            if (
                currentValue === "Error"
            ) {

                displayStatus.textContent =
                    "Calculation error";

            } else if (
                waitingForOperand
            ) {

                displayStatus.textContent =
                    "Enter next number";

            } else {

                displayStatus.textContent =
                    "Ready";
            }
        }
    }


    /* =====================================================
       UPDATE EXPRESSION
    ===================================================== */

    function updateExpression() {

        if (expressionDisplay) {

            expressionDisplay.textContent =
                expressionText ||
                "Ready for calculation";
        }
    }


    /* =====================================================
       SHOW TOAST
    ===================================================== */

    function showToast(
        message,
        type = "success"
    ) {

        if (!toast) {
            return;
        }

        if (toastMessage) {

            toastMessage.textContent =
                message;
        }

        if (toastIcon) {

            toastIcon.textContent =
                type === "error"
                    ? "!"
                    : "✓";
        }

        toast.classList.add(
            "show"
        );

        clearTimeout(
            window.novaToastTimer
        );

        window.novaToastTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 1800);
    }


    /* =====================================================
       SAVE HISTORY
    ===================================================== */

    function saveHistory() {

        try {

            localStorage.setItem(
                "novaCalcHistory",
                JSON.stringify(history)
            );

        } catch (error) {

            console.warn(
                "Could not save calculator history."
            );
        }
    }


    /* =====================================================
       CALCULATE
    ===================================================== */

    function calculate(
        first,
        second,
        operator
    ) {

        const a =
            Number(first);

        const b =
            Number(second);

        switch (operator) {

            case "+":
                return a + b;

            case "-":
                return a - b;

            case "*":
                return a * b;

            case "/":

                if (b === 0) {
                    return null;
                }

                return a / b;

            default:
                return b;
        }
    }


    /* =====================================================
       OPERATOR SYMBOL
    ===================================================== */

    function operatorSymbol(
        operator
    ) {

        switch (operator) {

            case "+":
                return "+";

            case "-":
                return "−";

            case "*":
                return "×";

            case "/":
                return "÷";

            default:
                return operator;
        }
    }


    /* =====================================================
       INPUT NUMBER
    ===================================================== */

    function inputNumber(number) {

        if (
            currentValue === "Error"
        ) {

            clearCalculator();

        }


        if (
            justCalculated &&
            !currentOperator
        ) {

            currentValue =
                number === "."
                    ? "0."
                    : number;

            justCalculated = false;

            expressionText = "";

            updateExpression();

            updateDisplay();

            return;
        }


        if (
            waitingForOperand
        ) {

            currentValue =
                number === "."
                    ? "0."
                    : number;

            waitingForOperand =
                false;

        } else if (
            number === "." &&
            currentValue.includes(".")
        ) {

            return;

        } else if (
            currentValue === "0" &&
            number !== "."
        ) {

            currentValue =
                number;

        } else {

            currentValue +=
                number;
        }


        updateDisplay();
    }


    /* =====================================================
       INPUT OPERATOR
    ===================================================== */

    function inputOperator(
        operator
    ) {

        if (
            currentValue === "Error"
        ) {
            return;
        }


        const inputValue =
            Number(currentValue);


        if (
            currentOperator &&
            waitingForOperand
        ) {

            currentOperator =
                operator;

            expressionText =
                `${formatNumber(previousValue)}
                 ${operatorSymbol(operator)}`;

            expressionText =
                expressionText.trim();

            updateExpression();

            return;
        }


        if (
            previousValue === null
        ) {

            previousValue =
                inputValue;

        } else if (
            currentOperator
        ) {

            const result =
                calculate(
                    previousValue,
                    inputValue,
                    currentOperator
                );


            if (
                result === null
            ) {

                showError(
                    "Cannot divide by zero"
                );

                return;
            }


            previousValue =
                result;

            currentValue =
                formatNumber(result);
        }


        currentOperator =
            operator;

        waitingForOperand =
            true;

        justCalculated =
            false;


        expressionText =
            `${formatNumber(previousValue)}
             ${operatorSymbol(operator)}`;

        expressionText =
            expressionText.trim();

        updateExpression();

        updateDisplay();
    }


    /* =====================================================
       EQUALS
    ===================================================== */

    function performCalculation() {

        if (
            currentValue === "Error"
        ) {
            return;
        }

        if (
            currentOperator === null ||
            previousValue === null
        ) {

            return;
        }


        const secondValue =
            Number(currentValue);

        const firstValue =
            Number(previousValue);


        const result =
            calculate(
                firstValue,
                secondValue,
                currentOperator
            );


        if (
            result === null
        ) {

            showError(
                "Cannot divide by zero"
            );

            return;
        }


        const formattedResult =
            formatNumber(result);


        const fullExpression =
            `${formatNumber(firstValue)}
             ${operatorSymbol(currentOperator)}
             ${formatNumber(secondValue)}`;


        addHistory(
            fullExpression,
            formattedResult
        );


        expressionText =
            `${fullExpression} =`;


        currentValue =
            formattedResult;

        previousValue =
            null;

        currentOperator =
            null;

        waitingForOperand =
            true;

        justCalculated =
            true;


        updateExpression();

        updateDisplay();

        renderHistory();
    }


    /* =====================================================
       CLEAR
    ===================================================== */

    function clearCalculator() {

        currentValue =
            "0";

        previousValue =
            null;

        currentOperator =
            null;

        waitingForOperand =
            false;

        justCalculated =
            false;

        expressionText =
            "";


        updateExpression();

        updateDisplay();
    }


    /* =====================================================
       DELETE
    ===================================================== */

    function deleteLast() {

        if (
            waitingForOperand ||
            justCalculated
        ) {
            return;
        }


        if (
            currentValue === "Error"
        ) {

            clearCalculator();

            return;
        }


        if (
            currentValue.length <= 1
        ) {

            currentValue =
                "0";

        } else {

            currentValue =
                currentValue.slice(
                    0,
                    -1
                );
        }


        updateDisplay();
    }


    /* =====================================================
       PERCENT
    ===================================================== */

    function percentage() {

        if (
            currentValue === "Error"
        ) {
            return;
        }


        const value =
            Number(currentValue);


        if (
            Number.isNaN(value)
        ) {
            return;
        }


        let result;


        if (
            previousValue !== null &&
            currentOperator
        ) {

            result =
                Number(previousValue) *
                value /
                100;

        } else {

            result =
                value / 100;
        }


        currentValue =
            formatNumber(result);

        waitingForOperand =
            false;

        justCalculated =
            false;


        updateDisplay();
    }


    /* =====================================================
       SIGN
    ===================================================== */

    function toggleSign() {

        if (
            currentValue === "0" ||
            currentValue === "Error"
        ) {
            return;
        }


        if (
            currentValue.startsWith("-")
        ) {

            currentValue =
                currentValue.slice(1);

        } else {

            currentValue =
                "-" + currentValue;
        }


        updateDisplay();
    }


    /* =====================================================
       ERROR
    ===================================================== */

    function showError(
        message
    ) {

        currentValue =
            "Error";

        expressionText =
            message;

        previousValue =
            null;

        currentOperator =
            null;

        waitingForOperand =
            false;

        justCalculated =
            true;


        updateExpression();

        updateDisplay();

        showToast(
            message,
            "error"
        );


        setTimeout(() => {

            if (
                currentValue === "Error"
            ) {

                clearCalculator();

            }

        }, 1800);
    }


    /* =====================================================
       HISTORY
    ===================================================== */

    function addHistory(
        expression,
        result
    ) {

        const item = {

            id:
                Date.now() +
                Math.random(),

            expression:
                expression,

            result:
                result,

            timestamp:
                Date.now()
        };


        history.unshift(
            item
        );


        if (
            history.length > 100
        ) {

            history =
                history.slice(
                    0,
                    100
                );
        }


        saveHistory();

        updateHistoryIndicator();
    }


    /* =====================================================
       HISTORY DATE
    ===================================================== */

    function formatHistoryTime(
        timestamp
    ) {

        const date =
            new Date(timestamp);

        const today =
            new Date();


        const isToday =
            date.toDateString() ===
            today.toDateString();


        if (isToday) {

            return date.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );
        }


        return date.toLocaleDateString(
            [],
            {
                day: "2-digit",
                month: "short"
            }
        );
    }


    /* =====================================================
       RENDER HISTORY
    ===================================================== */

    function renderHistory() {

        if (!historyList) {
            return;
        }


        const searchTerm =
            historySearch
                ? historySearch.value
                    .trim()
                    .toLowerCase()
                : "";


        let filtered =
            [...history];


        if (
            historyFilter === "today"
        ) {

            const today =
                new Date()
                    .toDateString();

            filtered =
                filtered.filter(
                    item =>
                        new Date(
                            item.timestamp
                        ).toDateString() ===
                        today
                );
        }


        if (searchTerm) {

            filtered =
                filtered.filter(
                    item =>
                        item.expression
                            .toLowerCase()
                            .includes(searchTerm) ||
                        item.result
                            .toLowerCase()
                            .includes(searchTerm)
                );
        }


        historyList.innerHTML = "";


        if (
            filtered.length === 0
        ) {

            const empty =
                document.createElement(
                    "div"
                );

            empty.className =
                "empty-history";


            const icon =
                document.createElement(
                    "div"
                );

            icon.className =
                "empty-history-icon";

            icon.textContent =
                "◷";


            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                searchTerm
                    ? "No matching calculations"
                    : "No calculations yet";


            const paragraph =
                document.createElement(
                    "p"
                );

            paragraph.textContent =
                searchTerm
                    ? "Try a different search."
                    : "Your calculations will appear here automatically.";


            empty.appendChild(
                icon
            );

            empty.appendChild(
                title
            );

            empty.appendChild(
                paragraph
            );


            historyList.appendChild(
                empty
            );


            return;
        }


        filtered.forEach(
            item => {

                const historyItem =
                    document.createElement(
                        "div"
                    );

                historyItem.className =
                    "history-item";


                /* Top */

                const top =
                    document.createElement(
                        "div"
                    );

                top.className =
                    "history-item-top";


                const time =
                    document.createElement(
                        "span"
                    );

                time.className =
                    "history-time";

                time.textContent =
                    formatHistoryTime(
                        item.timestamp
                    );


                const actions =
                    document.createElement(
                        "div"
                    );

                actions.className =
                    "history-actions";


                /* Reuse */

                const reuse =
                    document.createElement(
                        "button"
                    );

                reuse.className =
                    "history-action";

                reuse.type =
                    "button";

                reuse.title =
                    "Use result";

                reuse.textContent =
                    "↗";


                reuse.addEventListener(
                    "click",
                    () => {

                        currentValue =
                            item.result;

                        previousValue =
                            null;

                        currentOperator =
                            null;

                        waitingForOperand =
                            false;

                        justCalculated =
                            true;

                        expressionText =
                            item.expression +
                            " =";

                        updateExpression();

                        updateDisplay();

                        showToast(
                            "Result loaded"
                        );
                    }
                );


                /* Delete */

                const deleteButton =
                    document.createElement(
                        "button"
                    );

                deleteButton.className =
                    "history-action delete";

                deleteButton.type =
                    "button";

                deleteButton.title =
                    "Delete calculation";

                deleteButton.textContent =
                    "×";


                deleteButton.addEventListener(
                    "click",
                    () => {

                        history =
                            history.filter(
                                historyItem =>
                                    historyItem.id !==
                                    item.id
                            );

                        saveHistory();

                        renderHistory();

                        updateHistoryIndicator();

                        showToast(
                            "Calculation removed"
                        );
                    }
                );


                actions.appendChild(
                    reuse
                );

                actions.appendChild(
                    deleteButton
                );


                top.appendChild(
                    time
                );

                top.appendChild(
                    actions
                );


                /* Expression */

                const expression =
                    document.createElement(
                        "div"
                    );

                expression.className =
                    "history-expression";

                expression.textContent =
                    item.expression;


                /* Result */

                const result =
                    document.createElement(
                        "div"
                    );

                result.className =
                    "history-result";

                result.textContent =
                    "= " +
                    item.result;


                historyItem.appendChild(
                    top
                );

                historyItem.appendChild(
                    expression
                );

                historyItem.appendChild(
                    result
                );


                historyList.appendChild(
                    historyItem
                );

            }
        );
    }


    /* =====================================================
       HISTORY INDICATOR
    ===================================================== */

    function updateHistoryIndicator() {

        if (!historyIndicator) {
            return;
        }

        historyIndicator.textContent =
            history.length > 0
                ? `${history.length} SAVED`
                : "HISTORY";
    }


    /* =====================================================
       BUTTON ACTIONS
    ===================================================== */

    document
        .querySelectorAll(
            ".calculator-button, .quick-tool"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const number =
                            button.dataset.number;

                        const operator =
                            button.dataset.operator;

                        const action =
                            button.dataset.action;


                        if (
                            number !== undefined
                        ) {

                            inputNumber(
                                number
                            );

                            return;
                        }


                        if (
                            operator !== undefined
                        ) {

                            inputOperator(
                                operator
                            );

                            return;
                        }


                        if (
                            action ===
                            "clear"
                        ) {

                            clearCalculator();

                            return;
                        }


                        if (
                            action ===
                            "delete"
                        ) {

                            deleteLast();

                            return;
                        }


                        if (
                            action ===
                            "percent"
                        ) {

                            percentage();

                            return;
                        }


                        if (
                            action ===
                            "sign"
                        ) {

                            toggleSign();

                            return;
                        }


                        if (
                            action ===
                            "equals"
                        ) {

                            performCalculation();

                        }

                    }
                );

            }
        );


    /* =====================================================
       KEYBOARD SUPPORT
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const key =
                event.key;


            /* Numbers */

            if (
                /^[0-9]$/.test(key)
            ) {

                event.preventDefault();

                inputNumber(
                    key
                );

                return;
            }


            /* Decimal */

            if (
                key === "."
            ) {

                event.preventDefault();

                inputNumber(
                    "."
                );

                return;
            }


            /* Operators */

            if (
                ["+", "-", "*", "/"]
                    .includes(key)
            ) {

                event.preventDefault();

                inputOperator(
                    key
                );

                return;
            }


            /* Enter */

            if (
                key === "Enter" ||
                key === "="
            ) {

                event.preventDefault();

                performCalculation();

                return;
            }


            /* Escape */

            if (
                key === "Escape"
            ) {

                event.preventDefault();

                clearCalculator();

                return;
            }


            /* Backspace */

            if (
                key === "Backspace"
            ) {

                event.preventDefault();

                deleteLast();

                return;
            }


            /* Percent */

            if (
                key === "%"
            ) {

                event.preventDefault();

                percentage();

                return;
            }


            /* Sign */

            if (
                key === "n" ||
                key === "N"
            ) {

                event.preventDefault();

                toggleSign();

            }

        }
    );


    /* =====================================================
       COPY RESULT
    ===================================================== */

    if (copyBtn) {

        copyBtn.addEventListener(
            "click",
            async () => {

                if (
                    currentValue ===
                    "Error"
                ) {

                    showToast(
                        "Nothing to copy",
                        "error"
                    );

                    return;
                }


                try {

                    await navigator.clipboard
                        .writeText(
                            currentValue
                        );

                    showToast(
                        "Result copied"
                    );

                } catch (error) {

                    showToast(
                        "Copy unavailable",
                        "error"
                    );
                }

            }
        );
    }


    /* =====================================================
       CLEAR ALL HISTORY
    ===================================================== */

    if (clearHistoryBtn) {

        clearHistoryBtn.addEventListener(
            "click",
            () => {

                if (
                    history.length === 0
                ) {

                    showToast(
                        "History is already empty"
                    );

                    return;
                }


                const confirmed =
                    window.confirm(
                        "Clear all calculation history?"
                    );


                if (!confirmed) {
                    return;
                }


                history = [];

                saveHistory();

                renderHistory();

                updateHistoryIndicator();

                showToast(
                    "History cleared"
                );
            }
        );
    }


    /* =====================================================
       HISTORY SEARCH
    ===================================================== */

    if (historySearch) {

        historySearch.addEventListener(
            "input",
            renderHistory
        );
    }


    /* =====================================================
       HISTORY FILTER
    ===================================================== */

    document
        .querySelectorAll(
            ".history-filter"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".history-filter"
                            )
                            .forEach(
                                filterButton =>
                                    filterButton
                                        .classList
                                        .remove(
                                            "active"
                                        )
                            );


                        button.classList.add(
                            "active"
                        );


                        historyFilter =
                            button.dataset.filter ||
                            "all";


                        renderHistory();

                    }
                );

            }
        );


    /* =====================================================
       THEME SWITCH
    ===================================================== */

    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-theme"
                );


                const isLight =
                    document.body
                        .classList
                        .contains(
                            "light-theme"
                        );


                try {

                    localStorage.setItem(
                        "novaCalcTheme",
                        isLight
                            ? "light"
                            : "dark"
                    );

                } catch (error) {
                    /* Ignore */
                }


                themeBtn.textContent =
                    isLight
                        ? "☀"
                        : "◐";

            }
        );
    }


    /* =====================================================
       LOAD THEME
    ===================================================== */

    try {

        const savedTheme =
            localStorage.getItem(
                "novaCalcTheme"
            );


        if (
            savedTheme === "light"
        ) {

            document.body.classList.add(
                "light-theme"
            );


            if (themeBtn) {

                themeBtn.textContent =
                    "☀";
            }
        }

    } catch (error) {
        /* Ignore */
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateDisplay();

    updateExpression();

    updateHistoryIndicator();

    renderHistory();


    /* =====================================================
       READY MESSAGE
    ===================================================== */

    console.log(
        "✦ NovaCalc initialized successfully"
    );

    console.log(
        "Keyboard support enabled"
    );

    console.log(
        "Calculation history enabled"
    );

});
