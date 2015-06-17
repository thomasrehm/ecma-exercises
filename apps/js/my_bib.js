var dom = (function (win) {
    'use strict';
    var win = window,
        doc = win.document,
        popup_win = null,
        gespeicherte_strings = {};

    // === von app1 ===
    // Einfache Anzeige von str in alert-Box
    function show(str) {
        win.alert(str);
    }


    // Funktionen für locale Speicherungen ( Daten, Strings, Objekte, usw.)
    function get_store_str(key) {
        return gespeicherte_strings[key];
    }

    function set_store_str(key, val) {
        gespeicherte_strings[key] = val;
    }

    set_store_str("beispiel_mit_title", "%7B%22title%22%3A%22Balkendiagramm%20zur%20Wahl%22%7D%2C%0A%7B%22name%22%3A%22CDU%22%2C%20%22value%22%3A%20300%2C%20%22color%22%3A%22green%22%20%7D%2C%0A%7B%22name%22%3A%22FDP%22%2C%20%22value%22%3A%2079%2C%20%22color%22%3A%22yellow%22%20%7D%2C%0A%7B%22name%22%3A%22SPD%22%2C%20%22value%22%3A%2050%2C%20%22color%22%3A%22red%22%20%7D%0A");

    set_store_str("beispiel_ohne_title", "%7B%22name%22%3A%22CDU%22%2C%20%22value%22%3A%20300%2C%20%22color%22%3A%22green%22%20%7D%2C%0A%7B%22name%22%3A%22FDP%22%2C%20%22value%22%3A%2079%2C%20%22color%22%3A%22yellow%22%20%7D%2C%0A%7B%22name%22%3A%22SPD%22%2C%20%22value%22%3A%2050%2C%20%22color%22%3A%22red%22%20%7D%0A");

    set_store_str("beispiele_viele_elemente", "%7B%22title%22%3A%22Die%20Hochschulfamilie%20in%20Zahlen%22%7D%2C%0A%7B%22name%22%3A%22Studenten%20w%22%2C%20%22value%22%3A%203000%2C%20%22color%22%3A%22blue%22%20%7D%2C%0A%7B%22name%22%3A%22Studenten%20m%22%2C%20%22value%22%3A%202500%2C%20%22color%22%3A%22lightblue%22%20%7D%2C%0A%7B%22name%22%3A%22Dozenten%20w%22%2C%20%22value%22%3A%20300%2C%20%22color%22%3A%22green%22%20%7D%2C%0A%7B%22name%22%3A%22Dozenten%20m%22%2C%20%22value%22%3A%2079%2C%20%22color%22%3A%22lightgreen%22%20%7D%2C%0A%7B%22name%22%3A%22Mitarbeiter%20w%22%2C%20%22value%22%3A%2030%2C%20%22color%22%3A%22pink%22%20%7D%2C%0A%7B%22name%22%3A%22Mitarbeiter%20m%22%2C%20%22value%22%3A%2039%2C%20%22color%22%3A%22purple%22%20%7D%2C%0A%7B%22name%22%3A%22Professoren%20w%22%2C%20%22value%22%3A%20179%2C%20%22color%22%3A%22red%22%20%7D%2C%0A%7B%22name%22%3A%22Professoren%20m%22%2C%20%22value%22%3A%20150%2C%20%22color%22%3A%22orange%22%20%7D");



    // Zeige str als Vorschau im popup-Fenster an
    // Bsp:  popup(str) oder popup(null,url)
    function popup(str, url, o) {
            var o = o || {
                top: 20,
                left: 150,
                width: 800,
                height: 600
            };
            var flags;
            flags = "resizable=yes,scrollbars=yes,top=" + o.top + ",left=" + o.left + ",width=" + o.width + ",height=" + o.height;
            if (popup_win) {
                popup_win.close();
            }
            popup_win = null;
            if (url) {
                popup_win = window.open(url, "popup", flags);
            } else { // global: popup_win
                popup_win = win.open("", "popup", flags);
                popup_win.document.write(str);
            }
            if (popup_win.opener) {
                popup_win.opener = self;
            }
            if (popup_win.focus) {
                popup_win.focus();
            }
            return popup_win;
        }
        // DOM-Zugriffe
        // get str vom DOM-Elementes; Bsp: var id = "my_id", str = get_dom_str(id);
    function get_dom_str(id) {
            var node = doc.getElementById(id),
                tn = node.tagName.toLowerCase(),
                r = "";
            if (tn == 'input' || tn === 'textarea') {
                r = node.value;
            } else {
                r = node.innerHTML;
            }
            return r; // liefert String zurück
        }
        function dom_str_to_int(id){
            var num = get_dom_str(id);
            num = parseInt(num);
            return num;

        }
        // DOM-Zugriffe
        // set innerHTML-str des DOM-Elementes;  Bsp: var id = "my_id", str="Hallo Welt", set_dom_str(id,str);
    function set_dom_str(id, str) {
        var node = doc.getElementById(id),
            tn = node.tagName.toLowerCase();
        if (tn === 'input' || tn === 'textarea') {
            node.value = str;
        } else {
            node.innerHTML = str;
        }
    }

    function do_set_store_str(id_src, id_dst) {
            var pre = 'set_store_str("mein-str-name","',
                post = '");',
                txt = get_dom_str(id_src);
            set_dom_str(id_dst, pre + escape(txt) + post);
        }
        // === ende von app1 ===

    // === startAt von app2 ===
    function extract_a_tag(id_src, id_dst) {
            var src = get_dom_str(id_src);
            var a_tags = /.*?<a.*?href=[\"\']([^\"\']+)[\"\'].*?>([\s\S]*?)<\/a>.*?/gi;
            var atag = src.match(a_tags) + '\n';
            var linkTitle = atag.replace(a_tags, 'Link zu: $2 (Link: $1)\n');
            // var taglink = "href=[\"\']([^\"\']+)[\"\']";
            //  var link = title.replace(taglink, '$1');
            var str = linkTitle; // + " Link: " + link + "\n";
            // var str = src.replace(atag, '$1');
            set_dom_str(id_dst, str);
        }
        // === ende von app2 ===
        // === startAt von app3 ===

    function get_split_obj(src) {
        "use strict";
        var i, j, k, l, m, n, v, t, av, ak, av_len, ak_len, a, r = {},
            del_comments = /\/\/[^\n]*/g,
            re_src = /\s*~\s*/,
            re_keys = ":",
            re_num1g = /[\;\,\|\s\/\(\)]+/g, //(1/1), (1|-0.1e1),
            re_num2g = /[^ +-\.e\d]+/g,
            re_num2 = /[^ +-\.e\d]/,
            re_num3 = / +/;
        src = src.replace(/\r/g, '').replace(del_comments, '').trim();
        a = src.split(re_src);
        a.shift(1);
        if (a.length % 2) {
            show(" keine gerade Anzahl von ~");
        }
        for (i = 0; i < a.length - 1; i += 2) {
            k = a[i].replace(/\s+/g, "").trim();
            v = a[i + 1].trim();
            t = v.replace(re_num1g, " ").trim();
            if (re_num2.test(t.replace(re_num1g, ""))) {
                r[k] = v; // string
            } else { // numbers
                av = t.split(re_num3);
                av_len = av.length;
                ak = k.split(re_keys);
                ak_len = ak.length;
                if (ak_len && ak_len !== av_len) {
                    for (j = 0; j < av_len; j += 1) {
                        av[j] = parseFloat(av[j]);
                    }
                    r[k] = av;
                } else {
                    for (j = 0; j < ak_len; j += 1) {
                        r[ak[j]] = parseFloat(av[j]);
                    }
                }
            }
        }
        return r;
    }



    // === ende von app3 ===




    return {
        doc: doc,
        win: win,
        show: show,
        popup: popup,
        get_dom_str: get_dom_str,
        set_dom_str: set_dom_str,
        get_store_str: get_store_str,
        do_set_store_str: do_set_store_str,
        extract_a_tag: extract_a_tag,
        dom_str_to_int: dom_str_to_int


    };
}(window))
