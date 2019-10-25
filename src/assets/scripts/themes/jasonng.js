let JasonNGTheme = {
  BASE: {
    "text-align": "left",
    "color": "#333",
    "line-height": "1.75em",
    "letter-spacing": "0.08em"
  },
  BASE_BLOCK: {
    "margin": "1em"
  },
  block: {
    h1: {
      "font-size": "1.4em",
      "text-align": "center",
      "font-weight": "bold",
      "display": "table !important",
      "margin": "2em auto 1em auto",
      "padding": "0 1em",
      "border-bottom": "1px solid #99DDD9"
    },
    h2: {
      "font-size": "1.3em",
      "text-align": "center",
      "font-weight": "bold",
      "display": "table !important",
      "margin": "4em auto 2em auto",
      "padding": "0 1em",
      "border-bottom": "1px solid #99DDD9"
    },
    h3: {
      "font-weight": "bold",
      "font-size": "1.2em",
      "margin": "2em 8px 0 0",
      "display": "table",
      // "border-bottom": "1px solid #eaecef",
      "border-bottom-width": "0.75em",
      "border-image": "linear-gradient(to right, rgb(41, 148, 128) 40%, rgb(73, 200, 149) 10%)"
    },
    h4: {
      "font-weight": "bold",
      "font-size": "1.1em",
      "margin": "2em 8px 0.5em 8px",
    },
    p: {
      "margin": "1.5em 8px",
      "letter-spacing": "0.1em"
    },
    blockquote: {
      "font-style": "normal",
      "border-left": "none",
      "padding": "1em",
      "border-radius": "4px",
      "color": "#FEEEED",
      "background": "rgba(27,31,35,.05)",
      "margin": "2em 8px"
    },
    blockquote_p: {
      "letter-spacing": "0.1em",
      "color": "rgb(80, 80, 80)",
      "font-family": "PingFangSC-light, PingFangTC-light, Open Sans, Helvetica Neue, sans-serif",
      "font-size": "1em",
      "display": "inline",
    },
    code: {
      "font-size": "80%",
      "overflow": "auto",
      "color": "#333",
      "background": "rgb(247, 247, 247)",
      "border-radius": "2px",
      "padding": "10px",
      "line-height": "1.5",
      "border": "1px solid rgb(236,236,236)",
      "margin": "20px 0",
    },
    image: {
      "border-radius": "4px",
      "display": "block",
      "margin": "0.5em auto",
      "width": "100%"
    },
    image_org: {
      "border-radius": "4px",
      "display": "block"
    },
    ol: {
      "margin-left": "0",
      "padding-left": "1em"
    },
    ul: {
      "margin-left": "0",
      "padding-left": "1em",
      "list-style": "circle"
    },
    footnotes: {
      "margin": "0.5em 8px",
      "font-size": "80%"
    },
    figure: {
      "margin": "1.5em 8px",
    }
  },
  inline: {
    // inline element
    listitem: {
      "text-indent": "-1em",
      "display": "block",
      "margin": "0.5em 8px"
    },
    codespan: {
      "font-size": "90%",
      "color": "#d14",
      "background": "rgba(27,31,35,.05)",
      "padding": "3px 5px",
      "border-radius": "4px",
    },
    link: {
      "color": "#009926"
    },
    wx_link: {
      "color": "#0080ff",
      "text-decoration": "none",
      "border-bottom": "1px solid #d1e9ff"
    },
    strong: {
      "color": "#ff5f2e",
      "font-weight": "bold",
    },
    table: {
      "border-collapse": "collapse",
      "text-align": "center",
      "margin": "1em 8px"
    },
    thead: {
      "background": "rgba(0, 0, 0, 0.05)"
    },
    td: {
      "font-size": "80%",
      "border": "1px solid #dfdfdf",
      "padding": "0.25em 0.5em"
    },
    footnote: {
      "font-size": "12px"
    },
    figcaption: {
      "text-align": "center",
      "color": "#888",
      "font-size": "0.8em"
    }
  },

  afterRender: function(html) {
    // count the h3 header number
    let h3count = html.match(new RegExp('<h3 ', 'g')).length;
    let h3cursor = 1;

    let h3regx = /<h3([^>]*?)>(.+?)<\/h3>/gm;
    let subst = `<h3$1><span style="color:rgb(41, 148, 128);margin-right:0.5em;" class="h3-spanner">&nbsp;</span>$2</h3><div class="h3-border" style="clear:both;width:100%;height:0.25em;line-height:0.25em;background-image:linear-gradient(to right, rgb(41, 148, 128) 37%, rgb(73, 200, 149) 10%);border-radius: 0.25em;"></div>`;
    //let subst = `<h3$1>$2</h3><div class="h3-border" style="clear:both;width:100%;height:0.25em;line-height:0.25em;background-image:linear-gradient(to right, rgb(41, 148, 128) 20%, rgb(73, 200, 149) 10%);border-radius: 0.25em;"></div>`;
    html = String(html).replace(h3regx, subst);

    let match, index = 0, regex = /class="h3-spanner">&nbsp;<\/span>/gm,
        regex2, match2;

    while ((match = regex.exec(html)) !== null) {
      html = [html.substring(0, match.index),
          `class="h3-spanner">${++index}</span>`,
          html.substring(match.index + match[0].length)].join('');
    }
    while ((match = /rgb\(41, 148, 128\) 37%/gm.exec(html)) !== null) {
      let pos = Math.ceil((h3cursor++ / h3count) * 100);
      html = [html.substring(0, match.index),
          `rgb(41, 148, 128) ${pos}%`,
          html.substring(match.index + match[0].length)].join('');
    }

    // fix backquote's break line
    regex = /<blockquote(.+?)>(.+?)<\/blockquote>/gis;
    regex2 = /<p(.+?)>(.+?)<\/p>/gis;
    let p_style_fixed, d = `<div style="clear:both;height:1.5em;line-height:1.5em;"></div>`;
    while ((match = regex.exec(html)) !== null) {
      let paragraph = match[2];
      while ((match2 = regex2.exec(paragraph)) !== null) {
        p_style_fixed = p_style_fixed == null ? match2[1] : p_style_fixed;
        paragraph = [paragraph.substring(0, match2.index),
            `<p${p_style_fixed}>`, match2[2].replace(/\n/g, "<br/>\n"), `</p>`,
            paragraph.substring(match2.index + match2[0].length)].join('');
      }
      html = [html.substring(0, match.index),
          `<blockquote${match[1]}>`,
          paragraph.replace(/<\/p><p /gi, `</p>${d}<p `),
          `</blockquote>`,
          html.substring(match.index + match[0].length)].join('');
    }

    return html;
  }
}