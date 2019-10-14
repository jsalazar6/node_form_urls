const serverUrl= "http://localhost:3000";

const contentElement = document.getElementById("content");

const createLinkElement = link =>{

    const titleElement = document.createElement("a");
    titleElement.href = link.url;
    titleElement.classList.add("linkTitle");
    titleElement.appendChild(document.createTextNode(link.title));

    const urlElement = document.createElement("span");
    urlElement.classList.add("linkUrl");
    urlElement.appendChild(document.createTextNode(link.url));

    const headlineElement = document.createElement("h4");
    headlineElement.classList.add("linkHeadline");
    headlineElement.appendChild(titleElement);
    headlineElement.appendChild(urlElement);

    const authorElement = document.createElement("span");
    authorElement.classList.add("linkAuthor");
    authorElement.appendChild(
        document.createTextNode(`Submitted by ${link.author}`)
    );

    const  linkElement = document.createElement("div");
    linkElement.classList.add("link");
    linkElement.appendChild(headlineElement);
    linkElement.appendChild(authorElement);

    return linkElement;
};

const createInputElement = (name, placeholder, size) => {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.setAttribute("name", name);
    inputElement.setAttribute("placeholder", placeholder);
    inputElement.setAttribute("size", size);
    inputElement.setAttribute("required", "true");
    inputElement.classList.add("form-control");
    return inputElement;
};

const submitLink = e => {

    e.preventDefault();

    const formData = new FormData(e.target);

    fetch(`${serverUrl}/links`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(newLink => {
        const newLinkElement = createLinkElement(newLink);
        contentElement.replaceChild(newLinkElement, e.target);

        const infoElement = document.createElement("div");
        infoElement.classList.add("alert");
        infoElement.classList.add("alert-sucess");
        infoElement.textContent = `This link ${newLink.title} has been succesfully
        added!`;
        contentElement.insertBefore(infoElement, newLinkElement);

        setTimeout(() =>{
            contentElement.removeChild(infoElement);
        }, 2000);
    })
    .catch(err =>{
        console.error(err.message);
    });
};

const createLinkForm = () =>{

    const authorElement = createInputElement("author", "Enter author", 20);
    const titleElement = createInputElement("title", "Enter link title", 40);
    const urlElement = createInputElement("url", "Enter link URL", 40);

    const submitElement = document.createElement("input");
    submitElement.type = "submit";
    submitElement.value = "Add Link";
    submitElement.classList.add("btn");
    submitElement.classList.add("btn-primary");

    const linkFormElement = document.createElement("form");
    linkFormElement.classList.add("linkForm");
    linkFormElement.classList.add("form-inline");
    linkFormElement.appendChild(authorElement);
    linkFormElement.appendChild(titleElement);
    linkFormElement.appendChild(urlElement);
    linkFormElement.appendChild(submitElement);

    linkFormElement.addEventListener("submit", submitLink);

    return linkFormElement;
};

fetch(`${serverUrl}/api/links`)
.then(response => response.json())
.then(links => {
    links.forEach(link => {
        const linkElement = createLinkElement (link);
        contentElement.appendChild(linkElement);
    });
})
.catch(err => {
    console.error (err.message);
});
    document.getElementById("submitButton").addEventListener("click", () => {
        const formElement = createLinkForm();

        contentElement.insertBefore(formElement, document.querySelector(".link"));
    });


