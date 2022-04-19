class CalcInput extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value"];
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(newValue) {
    this.setAttribute("value", isNaN(newValue) ? "" : Number(newValue));
  }

  get _calcInputValue() {
    return this.calcInput.value;
  }

  set _calcInputValue(newValue) {
    this.calcInput.value = isNaN(newValue) ? "" : Number(newValue);
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.container = document.createElement("div");
    this.container.setAttribute("class", "container");
    this.createInput({
      key: "calcInput",
      type: "text",
      placeholder: "Calc Value",
    });
    this.calcInput.setAttribute("value", this.value ? this.value : "");
    this.result = this.createElement("span", "result");

    const style = document.createElement("style");
    style.textContent = `
      .container{
        border-radius: 5px;
        border: 1px solid black;
        padding: 10px;
        display: inline-block;
        margin: 0 0 0 auto;
      }
      span {
        background-color:gray;
        padding:3px;
        width: 40px;
      }
       `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(this.container);
    this.container.appendChild(this.calcInput);
    this.container.appendChild(this.result);
    this.bindEvents();
  }

  attributeChangedCallback(value, oldValue, newValue) {
    switch (value) {
      case "value":
        if (oldValue != newValue) {
          this.value = newValue;

          this._calcInputValue = newValue;
          debugger;
          this.result.innerHTML = ` ${this._calcInputValue}`;
        }
        break;
    }
  }

  //helper methods
  bindEvents() {
    this.calcInput.addEventListener("change", (event) => {
      this._calcInputValue = isNaN(event.target.value)
        ? ""
        : Number(event.target.value);

      this.value = this._calcInputValue;

      let change = new CustomEvent("change");
      this.dispatchEvent(change);
    });
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

customElements.define("calc-input", CalcInput);
