export function createElement(type, attributes = {}, content = '', parentElement = null) {
    const element = document.createElement(type);
  
    // Set attributes
    for (const key in attributes) {
      if (Object.hasOwnProperty.call(attributes, key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
  
    // Set content
    if (content) {
      element.textContent = content;
    }
  
    // Append to parent element
    if (parentElement) {
      parentElement.appendChild(element);
    }
  
    return element;
  }

export function createElement2(type, attributes = {}, content = '', parentElement = null) {
    const element = document.createElement(type);
  
    // Set attributes
    for (const key in attributes) {
      if (Object.hasOwnProperty.call(attributes, key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
  
    // Set content
    if (content) {
      element.innerHTML = content;
    }
  
    // Append to parent element
    if (parentElement) {
      parentElement.appendChild(element);
    }
  
    return element;
  }
