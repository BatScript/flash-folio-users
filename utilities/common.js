export const textToHtmlId = (str) => {
  // Input : About Me
  // Output : #about-me
  let strArr = str.split(' ')
  let finalStr = '#'
  strArr.forEach((element, index) => {
    finalStr = finalStr + `${index === 0 ? '' : '-'}${element.toLowerCase()}`
  })
  return finalStr
}

export const debounce = (func, timeout) => {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
