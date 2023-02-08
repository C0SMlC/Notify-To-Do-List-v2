"use strict";

const form = document.querySelector(".input-form");
const value = document.querySelector(".input-text");
const list = document.querySelector(".unordered");
const deletetask = document.querySelectorAll(".delete");
const tab = document.querySelector(".todos");
const done = document.querySelectorAll(".done");
const counthtml = document.querySelector(".value");
const countComplete = document.querySelector(".dashboard-count-complete");
const tasks = document.querySelector(".hidden");
const counttodo = document.querySelector(".dashboard-count-todo");

let count = 0;
let completeCount = 0;
let TodoCount = 0;

class ToDO {
  #movemtnts = [];
  #ids = [];

  constructor() {
    form.addEventListener("submit", this._Eventadder.bind(this));
    tab.addEventListener("click", this._deletetodo.bind(this));
    tab.addEventListener("click", this._donework.bind(this));
    const cc = JSON.parse(localStorage.getItem("todo-complete"));
    completeCount = +cc;
    countComplete.textContent = completeCount;

    const tw = JSON.parse(localStorage.getItem("todo-total"));
    count = +tw;
    counthtml.textContent = count;

    this._getLocalStorage();
    if (!TodoCount) this._taskwindow();
  }

  _donework(e) {
    e.preventDefault();
    if (!e.target.classList.contains("done")) return;
    const clickedEL = e.target.closest(".list");
    clickedEL.style.backgroundColor = "#69F0AE";
    completeCount++;
    countComplete.textContent = completeCount;

    // _setLocalStorage();
    setTimeout(() => {
      clickedEL.style.display = "none";
      clickedEL.remove();
      const index = this.#ids.findIndex((data) => data == clickedEL.dataset.id);
      console.log(this.#ids, this.#movemtnts, index);
      this.#ids.splice(index);
      this.#movemtnts.splice(index, 1);
      this._setLocalStorage();
      localStorage.setItem("todo-total", JSON.stringify(count));
      TodoCount--;
      counttodo.textContent = TodoCount;
      if (!TodoCount) this._taskwindow();
    }, 5000);
  }

  _deletetodo(e) {
    if (!e.target.classList.contains("delete")) return;
    const clickedEL = e.target.closest(".list");
    clickedEL.remove();
    const index = this.#ids.findIndex((data) => data == clickedEL.dataset.id);
    console.log(this.#ids, this.#movemtnts, index);
    this.#ids.splice(index);
    this.#movemtnts.splice(index, 1);
    this._setLocalStorage();
    localStorage.setItem("todo-total", JSON.stringify(count));

    TodoCount--;
    counttodo.textContent = TodoCount;
    if (!TodoCount) this._taskwindow();
  }

  _Eventadder(e) {
    e.preventDefault();
    const id = (Date.now() + "").slice(-10);
    const currvalue = value.value;
    if (!currvalue || currvalue == "") return;
    value.value = "";
    this.#movemtnts.push(currvalue);
    this.#ids.push(id);
    this._setLocalStorage();
    this._Add(id, currvalue);
  }

  _Add(id, currvalue) {
    tasks.style.display = "none";
    const currdate = new Date();
    const html = `
            <div data-id=${id} class="list">
            <div class="main">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="arrow"
              >
                <path
                  d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"
                />
              </svg>

              <li class="todo">${currvalue}</li>
            </div>
            <div class="entry">Entry On ${currdate.getDate()}-${
      currdate.getMonth() + 1
    }-${currdate.getFullYear()} </div>
            <div class="btns">
              <button class="btn delete">Delete</button>
              <button class="btn done">Done</button>
            </div>
          </div>
  `;
    list.insertAdjacentHTML("beforeend", html);
    count++;
    counthtml.textContent = count;
    TodoCount++;
    counttodo.textContent = TodoCount;
  }

  _setLocalStorage() {
    // this.#movemtnts=[];
    localStorage.setItem("todo", JSON.stringify(this.#movemtnts));
    localStorage.setItem("todo-ids", JSON.stringify(this.#ids));
    // localStorage.setItem("todo-complete", JSON.stringify(countComplete));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todo"));
    const ids = JSON.parse(localStorage.getItem("todo-ids"));
    // countComplete = JSON.parse(localStorage.getItem("todo-complete"));

    if (!data || !ids) return;
    this.#ids = ids;
    this.#movemtnts = data;
    for (let index = 0; index < this.#movemtnts.length; index++) {
      this._Add(this.#ids[index], this.#movemtnts[index]);
    }
  }

  _taskwindow() {
    tasks.style.display = "block";
  }
}

const neww = new ToDO();
