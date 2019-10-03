function eval() {
    // Do not use eval!!!
    return;
}

function applySign(sign, a, b){
      let sum = sign === "*" ? a * b: 
                sign === "/" ? a / b:
                sign === "+" ? a + b : 
                sign === "-" ? a - b : 
                null;
      return sum
}

function countBySign(elems, [...sign]){
      let counted = [];
      for(let i = 0; i <= elems.length - 1 ; i += 1) {
            let el = elems[i];

            if(sign.indexOf(el) >= 0){
                  counted[counted.length - 1] = applySign(el, counted[counted.length - 1], elems[i + 1]);
                  elems[i] = elems[i + 1] = elems[i - 1] = null;
            } else if(el !== null) {
                  counted.push(el) 
            }

      }
      return counted
}

function getSum(elements){
      let multiplied = countBySign(elements.slice(), ['*', '/']);

      let sum = countBySign(multiplied, ['+', '-']);

      return sum[0]

}


function anwrapingCalculator(elements) {
      let sum,
          elems = elements.slice();

      if(elems.indexOf('(') >= 0){
            let x = null,
                y = null;

            for(let i = 0; !y ; i++) {
                  x = elems[i] === '(' ? i : x;
                  y = elems[i] === ')' ? i : y;
            }

            let elemsInsideBracket = elems.slice(x + 1, y);
            
            sum = getSum(elemsInsideBracket);

            elems.splice(x, y - x + 1, sum);

            return anwrapingCalculator(elems)

      } else {
            sum = getSum(elems)
      }
      return sum;
}


function expressionCalculator(expr) {
    // write your solution here
    let sum = 0;

    let witoutSpace = expr.replace(/\s/g, '');
    let openBrackets = witoutSpace.split('').filter(n => n === '(').length;
    let closeBrackets = witoutSpace.split('').filter(n => n === ')').length;

    if((/\/0/).test(witoutSpace)){
        throw new Error('TypeError: Division by zero.');

    } if (openBrackets !== closeBrackets) {
        throw new Error('ExpressionError: Brackets must be paired');

    } else {

      let exprElements = witoutSpace
          .split(/([^0-9])/)
          .filter(n => n !== "")
          .map(n => isNaN(parseInt(n)) ? n : parseFloat(n));

      sum = anwrapingCalculator(exprElements);

    }

    return parseFloat(sum.toFixed(4));

}

module.exports = {
    expressionCalculator
}