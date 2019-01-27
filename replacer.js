const createHeader = () => {
  const div = document.createElement("div");
  div.setAttribute("style", "border-bottom: 1px solid #C6C6C6; ");

  let element = document.createElement("p");
  element.appendChild(document.createTextNode("Zara SA"));
  element.setAttribute("style", "font-size: larger; margin: 0;");
  div.appendChild(element);

  element = document.createElement("p");
  element.setAttribute("style", "font-size: smaller; margin: 0;");
  element.appendChild(document.createTextNode("Arteixo, Spain"));
  div.appendChild(element);


  return div;
}


const showPopup = (event) => {
  console.log("Clicked!");
  const popupDiv = document.createElement("div");
  const style = "position: absolute; " +
    "border: 1px solid #C6C6C6; " +
    "padding: " + "20px; " +
    "left: " + event.x.toString() + "px; " +
    "top: " + event.y.toString() + "px; " +
    "background-color: white; " +
    "color: #707070; ";

  popupDiv.setAttribute("style", style);
  popupDiv.onclick = (event) => {
    console.log("popup clicked!");
    console.log(event);
    event.target.parentElement.removeChild(event.target);
  }
  popupDiv.appendChild(createHeader());
  popupDiv.appendChild(document.createTextNode("Hi"));
  document.body.append(popupDiv);
}

let treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  null,
  false
);

while (treeWalker.nextNode()) {
  let currentNode = treeWalker.currentNode;
  let text = currentNode.nodeValue;
  let results = text.replace(/\n/g, " ").match(/(.*)(tailor)(.*)/);
  if (results) {
    let parent = currentNode.parentNode;

    // Create a new span to replace the existing text node
    let span = document.createElement("span");

    // Add the text before the found word to the span
    span.appendChild(document.createTextNode(results[1]));

    // Replace the found word with a new element
    let innerSpan = document.createElement("span");
    innerSpan.onclick = showPopup;
    innerSpan.setAttribute("href", "#");
    innerSpan.setAttribute("style", "background-color: #e0e0e0; color: green; font-size: x-large;");
    innerSpan.appendChild(document.createTextNode(results[2]));
    span.appendChild(innerSpan);

    // Add the text after the found word to the span
    span.appendChild(document.createTextNode(results[3]));

    parent.replaceChild(span, treeWalker.currentNode);
    break;
  }
}
