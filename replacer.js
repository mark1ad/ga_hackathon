let popupDiv;

const createHeader = () => {
  const div = document.createElement("div");
  div.setAttribute("style", "border-bottom: 1px solid #C6C6C6; padding: 5px; ");

  let element = document.createElement("p");
  element.appendChild(document.createTextNode("Zara SA"));
  element.setAttribute("style", "font-size: larger; margin: 0;");
  div.appendChild(element);

  element = document.createElement("p");
  element.setAttribute("style", "font-size: smaller; margin: 0; ");
  element.appendChild(document.createTextNode("Arteixo, Spain"));
  div.appendChild(element);


  return div;
}

const createCell = (text, color) => {
  let cell = document.createElement("td");
  cell.setAttribute("style", "border: 0; color: " + color + "; padding: 0 .5em; width: auto;");
  cell.appendChild(document.createTextNode(text));
  return cell;
}

const createRow = (cell1, cell2, color) => {
  const row = document.createElement("tr");
  row.setAttribute("style", "border: 0;");
  row.appendChild(createCell(cell1, "#707070"));
  row.appendChild(createCell(cell2, color));
  return row;
}

const createPopupTable = () => {
  const table = document.createElement("table");
  table.setAttribute("style", "font-size: smaller; margin: 1.5em 0; border: 0; padding: 5px; ");

  table.appendChild(createRow("Fair Labor", "73%", "#2CE650"));
  table.appendChild(createRow("Organic", "45%", "#FDC56B"));
  table.appendChild(createRow("Animal Welfare", "40%", "#FDC56B"));
  table.appendChild(createRow("Environmental Impact", "85%", "#2CE650"));

  return table;
}

const createPopupBody = () => {
  const div = document.createElement("div");

  div.appendChild(createPopupTable());


  let element = document.createElement("p");
  element.setAttribute("style", "font-size: x-small; margin: 0; line-height: 1.1em;");
  element.appendChild(document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sodales ante, et tristique diam. Vestibulum vitae risus non massa convallis posuere. Nulla faucibus turpis augue, eu elementum nisl lacinia ut."));
  div.appendChild(element);

  return div;
}

const showPopup = (event) => {
  console.log("Clicked!");
  popupDiv = document.createElement("div");
  const style = "position: absolute; " +
    "border: 1px solid #C6C6C6; " +
    "padding: " + "5px; " +
    "left: " + (event.x - 100).toString() + "px; " +
    "top: " + event.y.toString() + "px; " +
    "background-color: white; " +
    "color: #707070; " +
    "max-width: 200px; ";

  popupDiv.setAttribute("style", style);
  popupDiv.onclick = (event) => {
    console.log("popup clicked!");
    console.log(event);
    // event.target.parentElement.removeChild(event.target);
    document.body.removeChild(popupDiv);
  }
  popupDiv.appendChild(createHeader());
  popupDiv.appendChild(createPopupBody());
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
