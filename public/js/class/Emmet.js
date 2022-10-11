(function () {
    const indexesRe = /(.+?)(>|\+|\^|$)/g,
          escapeRe = /("|')([^\1]*?)\1/g,
          innerTextRe = /\{([^}]*?)}/g,
          excludes = "([^\\.#\\(\\{*]+)",
          attrsRe = /\(([^\)]*)\)/g,
          tagRe = new RegExp("^" + excludes),
          idRe = new RegExp("#" + excludes, "g"),
          classesRe = new RegExp("\\." + excludes, "g"),
          totalRe = new RegExp("\\*" + excludes, "g");

    let escaped = [],
        innerTexts = [];

    function unescape(text) {
        return text.replace(/""/g, function () {
            return "\"" + escaped.shift() + "\"";
        });
    }

    function element(textParam) {
        const text = textParam || "",

              tag = text.match(tagRe),
              id = text.match(idRe),
              classes = text.match(classesRe),
              attrs = text.match(attrsRe),
              innerText = text.match(innerTextRe),
              total = text.match(totalRe),

              el = document.createElement(tag ? tag[0] : "div");
        
        if (id) el.id = id.pop().replace(idRe, "$1");
        if (classes) {
            el.className = classes.map( className => {
                return className.slice(1);
            }).join(" ");
        }
        if (innerText) {
            el.innerHTML += innerText.map( () => {
                return unescape(innerTexts.shift());
            }).join(" ");
        }

        if (attrs) {
            attrs.map( chunkParam => {
                const chunk = chunkParam.replace(attrsRe, "$1").split(",");
                chunk.map( attrParam => {
                    const attr = attrParam.split("="),
                          key = attr.shift(),
                          value = JSON.parse(unescape(attr.join("=")));

                    el.setAttribute(key, value);
                });
            });
        }

        if(total) {
            const length = parseInt(total.pop().slice(1));
            const documentFragment = document.createDocumentFragment();

            for (let i = 0; i < length; i++) {
                let clone = el.cloneNode(true);
                documentFragment.appendChild(clone);
            }
            return documentFragment;
        }

        return el;
    }

    function emmet(text, htmlOnly, args) {
        const tree = element();
        
        let currentElement = tree,
            lastElement = tree,
            usedText = text || "",
            returnValue;

        if (text === void 0) throw new Error("There should be a string to parse.");

        escaped = [];
        innerTexts = [];

        if (args) usedText = emmet.templatedString(text, args);

        usedText
            .replace(escapeRe,  (full, quotes, escape) => {
                escaped.push(escape);
                return "\"\"";
            })
            .replace(innerTextRe, (full, innerText) => {
                innerTexts.push(innerText);
                return "{}";
            })
            .replace(/\s+/g, "")
            .replace(indexesRe, (full, elementText, splitter) => {
                currentElement.appendChild(lastElement = element(elementText));
                if (splitter === ">") currentElement = lastElement;
                else if (splitter === "^") currentElement = currentElement.parentNode;
            });
        
        returnValue = tree.children.length > 1 ? tree.children : tree.children[0];
        return htmlOnly ? tree.innerHTML : returnValue;
    }

    emmet.templatedString = (text, args) => {
        return args.reduce( (str, el, i) => {
            return str.replace(new RegExp("\\{" + i + "\\}", "g"), () => {
                return el;
            });
        }, text);
    };

    emmet.template = (text, htmlOnly, args) => {
        if (text === void 0) throw new Error("There should be a template string to parse.");
        return () => {
            return emmet(text, htmlOnly, [].concat.apply(args || [], arguments));
        };
    };

    window.Emmet = emmet;

    if (window.jQuery) {
        window.jQuery.emmet = (text, htmlOnly, args) => {
            const el = emmet(text, htmlOnly, args);
            return htmlOnly ? el : window.jQuery(el);
        };
        window.jQuery.emmet.template = (text, htmlOnly, args) => {
            const template = emmet.template(text, htmlOnly, args);
            return () => {
                const el = template.apply(null, arguments);
                return htmlOnly ? el : window.jQuery(el);
            };
        };
    }
})();