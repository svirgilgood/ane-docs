
async function loadText(rawMarkdown , setMarkDown) {
  const response = await fetch(rawMarkdown);
  const text = await response.text();
  setMarkDown(text)
}

export {
  loadText
}
