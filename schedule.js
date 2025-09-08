// Targeting the package radio buttons
const radios = document.querySelectorAll('input[name="package"]');
// Tabs functionality for the package booking form
const tabs = document.querySelectorAll(".package-tab")
const tabsContent = document.querySelector(".booking-form")
// Tabs for the customize travel booking form
const ctabs = document.querySelectorAll(".tab")
const ctabsContent = document.querySelector(".cbooking-form")

// Map for the package options
const packageOptions = {
    "solo": {
        travelers: [1],
        noChildren: [0],
        rooms: [1]
    },
    "family": {
        travelers: [2, 3],
        noChildren: [1, 2, 3],
        rooms: [2, 3, 4]
    },
    "business": {
        travelers: [1, 2, 3],
        noChildren: [0],
        rooms: [1 ,2, 3]
    },
    "group": {
        travelers: [4, 5, 6, 7],
        noChildren: [0, 1, 2, 3, 4, 5],
        rooms: [3, 4, 5, 6, 7]
    }
}

// Default options for package booking form
let currentPackage = packageOptions.solo;
let currentTab = "flight";    

radios.forEach(radio => {
  radio.addEventListener("change", () => {
    currentPackage = packageOptions[radio.value];
    tabsContent.innerHTML = renderBookingForm(currentTab, currentPackage);
  });
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // 1. Remove "active" from all tabs
    tabs.forEach(t => t.classList.remove("active"));
    
    // 2. Add "active" to the clicked tab
    tab.classList.add("active");

    currentTab = tab.dataset.tab;
    tabsContent.innerHTML = renderBookingForm(currentTab, currentPackage);
  });
});

// Rendering function for Hooking the package options
function renderBookingForm(currentTab, currentPackage) {
    if (currentTab === "flight") {
        return `
            <form class="booking-form">
                <div class="form-group">
                    <label for="passengers">Adult Passengers</label>
                    <select id="passengers">
                        ${currentPackage.travelers.map(num => `<option>${num} Passenger${num>1?'s':''}</option>`).join("")}
                    </select>
                </div>
                <div class="form-group">
                    <label for="passengers">Children Passengers &lt;15</label>
                    <select id="noChildren">
                        ${currentPackage.noChildren.map(num => `<option>${num === 0 ? 'No Child' : num+' Child'+(num>1?'ren':'')}</option>`).join("")}
                    </select>
                </div>

                <div class="form-group">
                    <label for="class">Class</label>
                    <select id="class">
                    <option>Economy</option>
                    <option selected>Business</option>
                    <option>First Class</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="location">From</label>
                    <input type="text" id="location" placeholder="JKIA, Nairobi, KENYA">
                </div>

                <div class="form-group">
                    <label for="destination">To</label>
                    <input type="text" id="destination" placeholder="Dribbble, Cape Town, SA">
                </div>

                <div class="form-group">
                    <label for="departure">Departure</label>
                    <input type="date" id="departure" name="departure" required>
                </div>

                <div class="form-group">
                    <label for="return">Return</label>
                    <input type="date" id="return" name="retrun">
                </div>
               <div class="form-group">
                    <label for="return">Go to Next Tab <h2>Hotel →</h2></label>
                </div>
            </form>
        `;
    } else if (currentTab === "hotel") {
        return `
            <form class="booking-form">
                <div class="form-group">
                    <label for="from">Hotel Name</label>
                    <input type="text" id="from" placeholder="Sarova Whitesand, Mombasa, Kenya">
                </div>

                <div class="form-group">
                    <label for="passengers">Rooms</label>
                    <select id="rooms">
                        ${currentPackage.rooms.map(num => `<option>${num} Room${num>1?'s':''}</option>`).join("")}
                    </select>
                </div>

                <div class="form-group">
                    <label for="class">Class</label>
                    <select id="class">
                    <option>Economy</option>
                    <option selected>Business</option>
                    <option>Luxury</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="checkin">Check In</label>
                    <input type="date" id="checkin" name="checkin" required>
                </div>

                <div class="form-group">
                    <label for="checkout">Check Out</label>
                    <input type="date" id="checkout" name="checkout" required>
                </div>

               <div class="form-group">
                    <label for="return">Go to Next Tab <h2>Rent a Car →</h2></label>
                </div>

            </form>
        `;
    } else if (currentTab === "rent") {
        return `
            <form class="booking-form">
                <div class="form-group">
                    <label for="passengers">Car type</label>
                    <select id="rental">
                    <option>SUV</option>
                    <option selected>Saloon Car</option>
                    <option>Mini Van</option>
                    <option>Jeep</option>
                    <option>Van</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="class">Pick-Up</label>
                    <select id="class">
                    <option>Airpot</option>
                    <option selected>Hotel</option>
                    <option>Our Branches</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="from">Driver's Licence</label>
                    <input type="text" id="from" placeholder="IDL-B5QTZWJZ">
                </div>

                <div class="form-group">
                    <label for="to">Country of Issue</label>
                    <input type="text" id="to" placeholder="Kenya">
                </div>

                <div class="form-group">
                    <label for="from">Leasing From</label>
                    <input type="date" id="from" name="from" required>
                </div>

                <div class="form-group">
                    <label for="to">To</label>
                    <input type="date" id="to" name="to" required>
                </div>
                <div class="form-group">
                    <label for="return">Go to Next Tab <h2>Hotel →</h2></label>
                </div>
            </form>
        `;
    } else {
        return `
            <form class="booking-form">
                <div class="form-group">
                    <label for="mop">Mode of payment</label>
                    <select id="payment">
                        <option>Upfront</option>
                        <option selected>Instalmets</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="pv">Pay Via</label>
                    <select id="payment">
                        <option>Mobile Money</option>
                        <option selected>Visa</option>
                        <option>Credit Card</option>
                        <option>paypal</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="pan">Primary Account Number</label>
                    <input type="text" id="pan" placeholder="4539 4512 0398 7356" required>
                </div>

                <div class="form-group">
                    <label for="noc">Name of the Cardholder</label>
                    <input type="text" id="name" placeholder="JohnDoe" required>
                </div>

                <div class="form-group">
                    <label for="expiry">Expiry Date</label>
                    <input type="date" id="expiry" name="expiry" required>
                </div>

                <div class="form-group">
                    <label for="return">Total Amount: <h2>KES 93,010.32</h2></label>
                </div>

                <button class="cta-btn" type="submit">Make Payment →</button>
            </form>
        `;
    }
  // Rent a Car + Payment tabs can be handled similarly
}


// targeting the customize form content
ctabs.forEach(ctab => {
    ctab.addEventListener("click",() => {
        // 1. Remove "active" from all tabs
    ctabs.forEach(t => t.classList.remove("active"));
    
    // 2. Add "active" to the clicked tab
    ctab.classList.add("active");

    if (ctab.textContent === "Flight") {
        ctabsContent.innerHTML = `
            <form class="booking-form">
                <div class="form-group">
                    <label for="passengers">Adult Passengers</label>
                    <select id="passengers">
                    <option selected>1 Passenger</option>
                    <option>2 Passengers</option>
                    <option>3 Passengers</option>
                    <option>4 passengers</option>
                    <option>5 passsagers</option>
                    <option>Group passsagers</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="passengers">Children Passengers &lt;15</label>
                    <select id="passengers">
                    <option selected>No Child</option>
                    <option>1 Child</option>
                    <option>2 Children</option>
                    <option>3 Children</option>
                    <option>4 Children</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="class">Class</label>
                    <select id="class">
                    <option>Economy</option>
                    <option selected>Business</option>
                    <option>First Class</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="location">From</label>
                    <input type="text" id="location" placeholder="JKIA, Nairobi, KENYA">
                </div>

                <div class="form-group">
                    <label for="destination">To</label>
                    <input type="text" id="destination" placeholder="Dribbble, Cape Town, SA">
                </div>

                <div class="form-group">
                    <label for="departure">Departure</label>
                    <input type="date" id="departure" name="departure" required>
                </div>

                <div class="form-group">
                    <label for="return">Return</label>
                    <input type="date" id="return" name="retrun">
                </div>
               <div class="form-group">
                    <label for="return">Go to Next Tab <h2>Hotel →</h2></label>
                </div>
            </form>
        `;
    } else if (ctab.textContent === "Hotel") {
        ctabsContent.innerHTML = `
            <form class="booking-form">
                <div class="form-group">
                    <label for="from">Hotel Name</label>
                    <input type="text" id="from" placeholder="Sarova Whitesand, Mombasa, Kenya">
                </div>

                <div class="form-group">
                    <label for="passengers">Rooms</label>
                    <select id="passengers">
                    <option>1 Bedroom</option>
                    <option selected>2 Bedroom</option>
                    <option>3 Bedroom</option>
                    <option>4 Suit</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="class">Class</label>
                    <select id="class">
                    <option>Economy</option>
                    <option selected>Business</option>
                    <option>Luxury</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="checkin">Check In</label>
                    <input type="date" id="checkin" name="checkin" required>
                </div>

                <div class="form-group">
                    <label for="checkout">Check Out</label>
                    <input type="date" id="checkout" name="checkout" required>
                </div>

               <div class="form-group">
                    <label for="return">Go to Next Tab <h2>Rent a Car →</h2></label>
                </div>

            </form>
        `;
    } else if (ctab.textContent === "Rent a Car") {
        ctabsContent.innerHTML = `
            <form class="booking-form">
                <div class="form-group">
                    <label for="passengers">Car type</label>
                    <select id="rental">
                    <option>SUV</option>
                    <option selected>Saloon Car</option>
                    <option>Mini Van</option>
                    <option>Jeep</option>
                    <option>Van</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="class">Pick-Up</label>
                    <select id="class">
                    <option>Airpot</option>
                    <option selected>Hotel</option>
                    <option>Our Branches</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="from">Driver's Licence</label>
                    <input type="text" id="from" placeholder="IDL-B5QTZWJZ">
                </div>

                <div class="form-group">
                    <label for="to">Country of Issue</label>
                    <input type="text" id="to" placeholder="Kenya">
                </div>

                <div class="form-group">
                    <label for="from">Leasing From</label>
                    <input type="date" id="from" name="from" required>
                </div>

                <div class="form-group">
                    <label for="to">To</label>
                    <input type="date" id="to" name="to" required>
                </div>
                <div class="form-group">
                    <label for="return">Go to Next Tab <h2>Hotel →</h2></label>
                </div>
            </form>
        `;
    } else {
        ctabsContent.innerHTML = `
            <form class="booking-form">
                <div class="form-group">
                    <label for="passengers">Mode of payment</label>
                    <select id="payment">
                        <option>Upfront</option>
                        <option selected>Instalmets</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="class">Pay Via</label>
                    <select id="class">
                        <option>Mobile Money</option>
                        <option selected>Visa</option>
                        <option>Credit Card</option>
                        <option>paypal</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="pan">Primary Account Number</label>
                    <input type="text" id="pan" placeholder="4539 4512 0398 7356" required>
                </div>

                <div class="form-group">
                    <label for="name">Name of the Cardholder</label>
                    <input type="text" id="name" placeholder="JohnDoe" required>
                </div>

                <div class="form-group">
                    <label for="expiry">Expiry Date</label>
                    <input type="date" id="expiry" name="expiry" required>
                </div>

                <div class="form-group">
                    <label for="return">Total Amount: <h2>KES 93,010.32</h2></label>
                </div>

                <button class="cta-btn" type="submit">Make Payment →</button>
            </form>
        `;
    }
    })
})

const payViaSelect = document.getElementById("payVia");
const paymentDetails = document.getElementById("payment-details");

function renderPaymentFields(method) {
  switch (method) {
    case "mobile":
      paymentDetails.innerHTML = `
        <div class="form-group">
          <label for="phone">Mobile Number</label>
          <input type="tel" id="phone" placeholder="+254 712 345 678" required>
        </div>
      `;
      break;

    case "visa":
    case "credit":
      paymentDetails.innerHTML = `
        <div class="form-group">
          <label for="pan">Primary Account Number</label>
          <input type="text" id="pan" placeholder="4539 4512 0398 7356" required>
        </div>
        <div class="form-group">
          <label for="name">Cardholder Name</label>
          <input type="text" id="name" placeholder="John Doe" required>
        </div>
        <div class="form-group">
          <label for="expiry">Expiry Date</label>
          <input type="month" id="expiry" required>
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input type="password" id="cvv" maxlength="4" required>
        </div>
      `;
      break;

    case "paypal":
      paymentDetails.innerHTML = `
        <div class="form-group">
          <label for="paypalEmail">PayPal Email</label>
          <input type="email" id="paypalEmail" placeholder="example@paypal.com" required>
        </div>
      `;
      break;

    default:
      paymentDetails.innerHTML = "";
  }
}

// 🔥 Render initial state
renderPaymentFields(payViaSelect.value);

// 🔄 Update on change
payViaSelect.addEventListener("change", (e) => {
  renderPaymentFields(e.target.value);
});
