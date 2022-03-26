class UserDetails extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["name", "textcolor", "age", "gender", "email", "phone", "img"];
  }

  get name() {
    return this.getAttribute("name");
  }

  get textcolor() {
    return this.getAttribute("textcolor");
  }
  get age() {
    return this.getAttribute("age");
  }
  get gender() {
    return this.getAttribute("gender");
  }
  get email() {
    return this.getAttribute("email");
  }
  get phone() {
    return this.getAttribute("phone");
  }
  get img() {
    return this.getAttribute("img");
  }

  set name(newName) {
    this.setAttribute("name", newName);
  }
  set textcolor(newTextcolor) {
    this.setAttribute("textcolor", newTextcolor);
  }
  set age(newAge) {
    this.setAttribute("age", newAge);
  }
  set gender(newGender) {
    this.setAttribute("gender", newGender);
  }
  set email(newEmail) {
    this.setAttribute("email", newEmail);
  }
  set phone(newPhone) {
    this.setAttribute("phone", newPhone);
  }
  set img(newImg) {
    this.setAttribute("img", newImg);
  }

  connectedCallback() {
    var shadow = this.attachShadow({ mode: "open" });
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    var h3 = document.createElement("h3");
    h3.textContent = "User Details";
    var imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "image");
    var img = document.createElement("img");
    img.src = this.img;
    var detailContainer = document.createElement("div");
    detailContainer.setAttribute("class", "details");
    var name = document.createElement("p");
    name.innerHTML = `<strong>Name : </strong> ${this.name}`;
    var age = document.createElement("p");
    age.innerHTML = `<strong>Age : </strong> ${this.age}`;
    var email = document.createElement("p");
    email.innerHTML = `<strong>Email : </strong> ${this.email}`;
    var gender = document.createElement("p");
    gender.innerHTML = `<strong>Gender : </strong> ${this.gender}`;
    var phone = document.createElement("p");
    phone.innerHTML = `<strong>Phone : </strong> ${this.phone}`;

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
    color:${this.textcolor}
      
}

h3{
      
      text-align: center;
      
}

.image{
      
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
  }
  .image img{
      
      height:100px;
      width:100px;
  }

       `;

    shadow.appendChild(style);
    shadow.appendChild(container);
    container.appendChild(h3);
    container.appendChild(imgContainer);
    imgContainer.appendChild(img);
    container.appendChild(detailContainer);
    detailContainer.appendChild(name);
    detailContainer.appendChild(age);
    detailContainer.appendChild(email);
    detailContainer.appendChild(gender);
    detailContainer.appendChild(phone);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "name":
        if (oldValue != newValue) this.name = newValue;
        break;
      case "age":
        if (oldValue != newValue) this.age = newValue;
        break;
      case "textcolor":
        if (oldValue != newValue) this.textcolor = newValue;
        break;
      case "email":
        if (oldValue != newValue) this.email = newValue;
        break;
      case "gender":
        if (oldValue != newValue) this.gender = newValue;
        break;
      case "img":
        if (oldValue != newValue) this.img = newValue;
        break;
      case "phone":
        if (oldValue != newValue) this.phone = newValue;
        break;
    }
  }
}

customElements.define("user-details", UserDetails);
