const container = require('markdown-it-container')
let abstract="";

const containBox = md => {
  md
    .use(...createContainer('tip', 'TIP'))
    .use(...createContainer('warning', 'WARNING'))
    .use(...createContainer('danger', 'WARNING'))
    .use(...createContainer('abstract', 'ABSTRACT'))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? `<div v-pre>\n`
        : `</div>\n`
    })
}

function createContainer (klass, defaultTitle) {
  return [container, klass, {
    render (tokens, idx) {
      const token = tokens[idx]
      const info = token.info.trim().slice(klass.length).trim()
      if(klass==="abstract"){
        abstract=info;
      }
      if (token.nesting === 1) {
        return `<div class="${klass} custom-block"><p class="custom-block-title">${info || defaultTitle}</p>\n`
      } else {
        return `</div>\n`
      }
    }
  }]
}
module.exports={
  containBox,
  abstract
}
