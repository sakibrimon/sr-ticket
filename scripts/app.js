let seatsLeft = getTextElementValueById("seats-left");
let seatCount = getTextElementValueById("seat-count");
const seatList = document.getElementById("seat-list");
let selectCount = 0;
const price = document.getElementById("price");
const couponBtn = document.getElementById("coupon-apply");
const couponInput = document.getElementById("coupon-input");
const couponField = document.getElementById("coupon-field");
const couponMsg = document.getElementById("coupon-msg");
const phoneInput = document.getElementById("phone");
const nextBtn = document.getElementById("next");
const allSeats = document.getElementsByClassName("seat");
for (const seat of allSeats) {
    seat.addEventListener("click", function () {
        if (!Array.from(seat.classList).includes("bg-prime")) {
            if (selectCount === 4) {
                alert("One cannot buy more than 4 seats at a time");
                return;
            }
            seat.classList.add("bg-prime", "text-white");
            seatsLeft--;
            setTextElementValueById("seats-left", seatsLeft);
            seatCount++;
            setTextElementValueById("seat-count", seatCount);
            const p = document.createElement("p");
            p.classList.add("flex", "justify-between", "items-center", "font-medium", "text-[#03071299]", "pb-4");
            const s1 = document.createElement("span");
            const s2 = document.createElement("span");
            s2.classList.add("w-[60%]", "flex", "justify-between");
            const s2_1 = document.createElement("span");
            const s2_2 = document.createElement("span");
            s1.innerText = seat.children[0].innerText;
            s2_1.innerText = "Economy";
            s2_2.innerText = "550";
            s2.appendChild(s2_1);
            s2.appendChild(s2_2);
            p.appendChild(s1);
            p.appendChild(s2);
            seatList.appendChild(p);
            selectCount++;
            if (selectCount === 4) {
                couponBtn.removeAttribute("disabled");
            }
            setTextElementValueById("price", parseInt(price.innerText) + 550);
            setTextElementValueById("net-price", parseInt(price.innerText));

        } else {
            seat.classList.remove("bg-prime", "text-white");
            seatsLeft++;
            setTextElementValueById("seats-left", seatsLeft);
            seatCount--;
            setTextElementValueById("seat-count", seatCount);
            for (const item of seatList.children) {
                if (item.children[0].innerText === seat.children[0].innerText) {
                    item.remove();
                    selectCount--;
                    couponBtn.setAttribute("disabled", "disabled");
                    setTextElementValueById("price", parseInt(price.innerText) - 550);
                    setTextElementValueById("net-price", parseInt(price.innerText));
                    break;
                }
            }
            couponField.children[0].children[0].value = "";
            couponField.classList.remove("hidden");
            couponMsg.innerText = "";
        }
        if (seatList.children.length > 0) {
            phoneInput.removeAttribute("disabled");
            phoneInput.removeAttribute("title");
            phoneInput.addEventListener('input', function () {
                const phoneNumber = phoneInput.value;

                // A very basic phone number validation
                const isValidPhoneNumber = /^01\d{9}$/.test(phoneNumber);

                // nextBtn.disabled = !isValidPhoneNumber;

                if (isValidPhoneNumber) {
                    nextBtn.removeAttribute("disabled");
                } else {
                    nextBtn.setAttribute("disabled", "disabled");
                }
            });
        } else {
            phoneInput.setAttribute("disabled", "disabled");
            phoneInput.setAttribute("title", "Select a seat first.");
        }
    });
}
couponBtn.addEventListener("click", function () {
    if (couponInput.value === "NEW15") {
        setTextElementValueById("net-price", parseInt(price.innerText) - parseInt(price.innerText) * 0.15);
        couponField.classList.add("hidden");
        couponMsg.innerText = "You got 15% Discount!"
    } else if (couponInput.value === "Couple 20") {
        setTextElementValueById("net-price", parseInt(price.innerText) - parseInt(price.innerText) * 0.20);
        couponField.classList.add("hidden");
        couponMsg.innerText = "You got 20% Discount!";
    } else {
        couponMsg.innerText = "Enter a valid coupon code";
        couponMsg.classList.add("text-red-400");
    }
});
