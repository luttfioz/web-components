class NumericInputDemo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.container = document.createElement("div");
    this.container.setAttribute("class", "container");
    this.h3 = document.createElement("h3");
    this.h3.textContent = "Numeric Input";

    this.numericInput = this.createElement("numeric-input");
    this.numericInput.setAttribute("name", "stylesheet");
    this.numericInput.setAttribute("value", "style.css");

    var displayValue = this.createElement("p", "displayValue");
    displayValue.innerHTML = `<strong>Value : </strong> ${this._numericInputValue}`;

    var displayValid = this.createElement("p", "displayValid");
    displayValid.innerHTML = `<strong>Valid : </strong> ${this._numericInputValue}`;

    this.br = this.createElement("br");
    this.setValueButton = this.createElement("button");
    this.setValueButton.textContent = "Set Value";

    this.createInput({
      key: "setValueInput",
      type: "text",
      placeholder: "set value input",
      name: "setValueInput",
    });

    this.setTextButton = this.createElement("button");
    this.setTextButton.textContent = "Set Text";

    this.createInput({
      key: "setTextInput",
      type: "text",
      placeholder: "set text input",
      name: "setTextInput",
    });

    const style = document.createElement("style");
    style.textContent = `
      .container{
        border-radius: 5px;
        border: 1px solid black;
        padding: 10px;
        display: inline-block;
        margin: 0 0 0 auto;
        margin-left: 30%;
        width: 300px;
      }

      h3{
        text-align: center;
      }
       `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(this.container);
    this.container.appendChild(this.h3);
    this.container.appendChild(displayValue);
    this.container.appendChild(displayValid);
    this.container.appendChild(this.setValueButton);
    this.container.appendChild(this.setValueInput);
    this.container.appendChild(this.br);
    this.container.appendChild(this.setTextButton);
    this.container.appendChild(this.setTextInput);

    this.container.appendChild(this.numericInput);
    this.bindEvents();
  }

  //helper methods
  bindEvents() {
    this.setValueButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.numericInput.value = this.setValueInput.value;
    });

    this.setTextButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.numericInput.value = this.setTextInput.value;
    });

    this.numericInput.addEventListener("change", (event) => {
      this._numericInputValue = isNaN(event.target.value)
        ? ""
        : Number(event.target.value);

      if (this._numericInputValue) {
        this.inputval = this.container.querySelector(".displayValue");
        this.inputval.innerHTML = `<strong>Value : </strong> ${this._numericInputValue}`;
      }
    });
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  createInput(
    { key, type, placeholder, name } = {
      key: "default",
      type: "text",
      placeholder: "default",
      name: "default",
    }
  ) {
    this[key] = this.createElement("input");
    this[key].type = type;
    this[key].placeholder = placeholder;
    this[key].name = name;
    this[key].id = name;
    this[key].classList.add(name);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }
}

customElements.define("numeric-input-demo", NumericInputDemo);
