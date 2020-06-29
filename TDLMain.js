import * as elements from "./TDLELEMENTS.js";
import { sendData, showLocal, clearLocal } from "./TDLLOCALSTORAGE.js";

// ADDITEM FUNCTION THAT PRINTS ITEMS TO THE WINDOW,
// AND SENDS THE INPUT AS A KEY FOR LOCAL STORAGE.
let addItem = () => {
  let userInput = elements.USER_INPUT.value;
  let h2 = document.createElement("h2");
  let listItem = document.createTextNode(userInput);
  let deleteBtn = document.createElement("button");

  deleteBtn.appendChild(document.createTextNode("X"));
  deleteBtn.classList = "btn btn-danger";
  h2.append(listItem);
  h2.append(deleteBtn);
  let h2Inner = h2.innerText.slice(0, -1);
  if (h2Inner.length >= 1) {
    // sends the user Input to the local storage object using sendData
    sendData(userInput);
    elements.LIST_DIV.appendChild(h2);
    // CLEARS THE USER_INPUT VALUE SO NEW TEXT CAN BE ENTERED EASILY.
    elements.USER_INPUT.value = "";
  }
  let removeH2 = () => {
    let h2Inner = h2.innerText.slice(0, -1);
    for (let i = 0; i < localStorage.length; i++) {
      let eachElement = localStorage.getItem(localStorage.key(i));
      if (eachElement == h2Inner) {
        console.log(`storageItem -> ${eachElement} current h2 -> ${h2Inner}`);
        localStorage.removeItem(h2Inner);
      }
    }
    h2.remove();
  };

  deleteBtn.addEventListener("click", removeH2);
};

let checkConfirm = () => {
  if (localStorage.length > 0) {
    loadList();
  }
};

let loadList = () => {
  for (let i = 0; i < localStorage.length; i++) {
    console.log(
      "Load old storage  ->" + localStorage.getItem(localStorage.key(i))
    );
    let h2 = document.createElement("h2");
    let listItem = document.createTextNode(
      localStorage.getItem(localStorage.key(i))
    );
    let deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("X"));
    deleteBtn.classList = "btn btn-danger";
    console.log(listItem);
    h2.append(listItem);
    h2.append(deleteBtn);
    elements.LIST_DIV.appendChild(h2);
    let removeH2 = () => {
      let h2Inner = h2.innerText.slice(0, -1);
      for (let i = 0; i < localStorage.length; i++) {
        let eachElement = localStorage.getItem(localStorage.key(i));
        if (eachElement == h2Inner) {
          console.log(`storageItem -> ${eachElement} current h2 -> ${h2Inner}`);
          localStorage.removeItem(h2Inner);
        }
      }
      h2.remove();
    };
    deleteBtn.addEventListener("click", removeH2);
  }
};

// EVENT LISTENERS
document.getElementsByTagName("body").onload = checkConfirm();

elements.USER_BUTTON.addEventListener("click", addItem);
elements.CLEAR_BUTTON.addEventListener("click", clearLocal);
