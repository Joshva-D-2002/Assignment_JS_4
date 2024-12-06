// 1. Create a div with background color red, create buttons
//      a.to hide the div
//      b.to change the background color of the div
//      c.to show your basic details on the div, the details should hide/show, on the click.

const container1 = document.getElementById("container-1");
const details = document.getElementById("details");

const hideCtn = document.getElementById("btn-hide");
const changeBg = document.getElementById("btn-bgcolor");
const hideDetails = document.getElementById("btn-details");

hideCtn.addEventListener("click", function () {
  if (container1.style.display === "none") {
    container1.style.display = "block";
    hideCtn.textContent = "Hide";
  } else {
    container1.style.display = "none";
    hideCtn.textContent = "Show";
  }
});

changeBg.addEventListener("click", function () {
  if (container1.style.backgroundColor === "yellow") {
    container1.style.backgroundColor = "red";
  } else {
    container1.style.backgroundColor = "yellow";
  }
});

hideDetails.addEventListener("click", function () {
  if (details.style.visibility === "hidden") {
    details.style.visibility = "visible";
    hideDetails.textContent = "Hide Details";
  } else {
    details.style.visibility = "hidden";
    hideDetails.textContent = "Show Details";
  }
});

// 2.Create a select box with numbers 1 to 10,  when selected 9, you should change the selection to 10 and show a message that "9 is fully occupied please select another number", when selected any number other than 9 it should show a message as "you selected 'particular number' " in a div, on hovering the div it should change the background color of the div into a highlighting shade, while the mouse pointer leaves the message area the background color should go back to as before (don't use CSS to attain the hovering functionality)

const container2 = document.getElementById("container-2");
const select = document.getElementById("select");

select.addEventListener("change", function () {
  if (select.value === "9") {
    container2.textContent = `${select.value} is fully occupied please select another number`;
    select.value = "10";
  } else {
    container2.textContent = `you selected ${select.value}`;
  }
});

container2.addEventListener("mouseover", function () {
  container2.style.backgroundColor = "rgba(0, 170, 255, 0.5)";
});
container2.addEventListener("mouseout", function () {
  container2.style.backgroundColor = "rgba(0, 170, 255, 1)";
});

const container3 = document.getElementById("container-3");
const btnsContainer = document.getElementById("btns-container");

// 3.Consider an array with name of 10 programming languages, make 10 buttons by iterating this array, when clicked on each button the name of the programming language should be shown in a corresponding div.

const arr = [
  "Html",
  "CSS",
  "php",
  "java",
  "c",
  "c++",
  "python",
  "javascript",
  "ruby",
  "c#",
];

arr.forEach((element) => {
  const btn = document.createElement("button");
  btn.textContent = element;
  btnsContainer.appendChild(btn);
  btn.addEventListener("click", function () {
    container3.textContent = element;
  });
});

// 4.Make a form with fields name, phone number, place, company name, pin code
//      a.if any of the field is empty on submitting it should show corresponding error messages on below of all the required fields.
//      b.pin code and mobile number fields should not be submitted with non-integer values, if so, then show an error msg stating only numbers are allowed.
//      c.Minimum length of phone number should be 10, otherwise show corresponding error msg below the mobile no. field.
//      d.On submit of the form, store the details in the local storage and clear the form. (it should stay on the same page don't refresh the page).
//      e.Make a prepopulate button, which when clicked will populate the form with values in the local storage if it exists, otherwise the button will be disabled.

const form1 = document.getElementById("form1");
const btnsubmit = document.getElementById("submit1");
const populateBtn = document.getElementById("populate");

const nameErr = document.getElementById("nameErr");
const phoneErr = document.getElementById("phoneErr");
const placeErr = document.getElementById("placeErr");
const companyErr = document.getElementById("companyErr");
const pinErr = document.getElementById("pinErr");

populateBtn.disabled = true;

btnsubmit.addEventListener("click", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("name").value.trim();
  const phoneNo = document.getElementById("phoneNo").value.trim();
  const place = document.getElementById("place").value.trim();
  const company = document.getElementById("company").value.trim();
  const pin = document.getElementById("pin").value.trim();

  nameErr.textContent = "";
  phoneErr.textContent = "";
  placeErr.textContent = "";
  companyErr.textContent = "";
  pinErr.textContent = "";

  function isNum(value) {
    return /^[0-9\s]+$/.test(value);
  }
  let isValid = true;
  if (nameInput.length == 0) {
    nameErr.textContent = "Name is Required";
    isValid = false;
  }
  if (phoneNo.length == 0) {
    phoneErr.textContent = "Phone Number is Required";
    isValid = false;
  } else if (!isNum(phoneNo)) {
    phoneErr.textContent = "Only Numbers are allowed";
    isValid = false;
  } else if (phoneNo.length < 10) {
    phoneErr.textContent = "Phone Number must contain atleast 10 numbers";
    isValid = false;
  }
  if (place.length == 0) {
    placeErr.textContent = "Place is Required";
    isValid = false;
  }
  if (company.length == 0) {
    companyErr.textContent = "Company Name Required";
    isValid = false;
  }
  if (pin.length == 0) {
    pinErr.textContent = "Pin Code is Required";
    isValid = false;
  } else if (!isNum(pin)) {
    pinErr.textContent = "Only Numbers are allowed";
    isValid = false;
  }
  if (isValid) {
    const user = {
      name: nameInput,
      phoneNo: phoneNo,
      place: place,
      company: company,
      pinNo: pin,
    };
    localStorage.setItem("user", JSON.stringify(user));
    form1.reset();
    populateBtn.disabled = false;
  }
});

if (localStorage.getItem("user")) {
  populateBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const localUser = JSON.parse(localStorage.getItem("user"));
    document.getElementById("name").value = localUser.name;
    document.getElementById("phoneNo").value = localUser.phoneNo;
    document.getElementById("place").value = localUser.place;
    document.getElementById("company").value = localUser.company;
    document.getElementById("pin").value = localUser.pinNo;
  });
}

// 4.Create a form with a text field which when submitted, will change the tab title to whatever is entered, limit the field to 50 characters, otherwise show error message, stay on the same page when submitted(it shouldn't refresh).

const form2 = document.getElementById("form2");
const title = document.getElementById("title");
const titleErr = document.getElementById("titleErr");
const submit2 = document.getElementById("submit2");

submit2.addEventListener("click", function (event) {
  event.preventDefault();
  if (title.value === "") {
    titleErr.textContent = "Title is Required";
  } else if (title.value.length > 50) {
    titleErr.textContent = "Enter only upto 50 characters";
  } else {
    document.title = title.value;
    form2.reset();
  }
});

// 5.When control+enter key is pressed show an alert message.

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "Enter") {
    alert("control + enter key is pressed ");
  }
});
