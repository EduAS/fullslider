/*
 * Raphael 1.3.0dev - JavaScript Vector Library
 *
 * Copyright (c) 2008 - 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
window.Raphael = (function() {
    var a = /[, ]+/, aK = /^(circle|rect|path|ellipse|text|image)$/, J = document, aq = window, l = {was: "Raphael" in aq, is: aq.Raphael}, al = function() {
        if (al.is(arguments[0], "array")) {
            var d = arguments[0], e = w[aS](al, d.splice(0, 3 + al.is(d[0], aj))), S = e.set();
            for (var R = 0, aW = d[m]; R < aW; R++) {
                var E = d[R] || {};
                aK.test(E.type) && S[f](e[E.type]().attr(E));
            }
            return S;
        }
        return w[aS](al, arguments);
    }, aP = function() {
    }, aH = "appendChild", aS = "apply", aO = "concat", ap = "", ak = " ", z = "split", D = "click dblclick mousedown mousemove mouseout mouseover mouseup"[z](ak), O = "hasOwnProperty", av = "join", m = "length", aU = "prototype", aV = String[aU].toLowerCase, Z = Math, g = Z.max, aE = Z.min, aj = "number", aw = "toString", at = Object[aU][aw], aM = {}, aI = Z.pow, f = "push", aQ = /^(?=[\da-f]$)/, c = /^url\(['"]?([^\)]+)['"]?\)$/i, x = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i, M = Z.round, v = "setAttribute", U = parseFloat, F = parseInt, aJ = String[aU].toUpperCase, j = {"clip-rect": "0 0 10e9 10e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '0.732vw "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://raphaeljs.com/", opacity: 1, path: "M0,0", r: 0, rotation: 0, rx: 0, ry: 0, scale: "1 1", src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", translation: "0 0", width: 0, x: 0, y: 0}, X = {"clip-rect": "csv", cx: aj, cy: aj, fill: "colour", "fill-opacity": aj, "font-size": aj, height: aj, opacity: aj, path: "path", r: aj, rotation: "csv", rx: aj, ry: aj, scale: "csv", stroke: "colour", "stroke-opacity": aj, "stroke-width": aj, translation: "csv", width: aj, x: aj, y: aj}, aL = "replace";
    al.version = "1.3.0dev";
    al.type = (aq.SVGAngle || J.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (al.type == "VML") {
        var ae = document.createElement("div");
        ae.innerHTML = "<!--[if vml]><br><br><![endif]-->";
        if (ae.childNodes[m] != 2) {
            return null;
        }
    }
    al.svg = !(al.vml = al.type == "VML");
    aP[aU] = al[aU];
    al._id = 0;
    al._oid = 0;
    al.fn = {};
    al.is = function(e, d) {
        d = aV.call(d);
        return((d == "object" || d == "undefined") && typeof e == d) || (e == null && d == "null") || aV.call(at.call(e).slice(8, -1)) == d;
    };
    al.setWindow = function(d) {
        aq = d;
        J = aq.document;
    };
    var az = function(e) {
        if (al.vml) {
            var d = /^\s+|\s+$/g;
            az = ah(function(R) {
                var S;
                R = (R + ap)[aL](d, ap);
                try {
                    var aW = new ActiveXObject("htmlfile");
                    aW.write("<body>");
                    aW.close();
                    S = aW.body;
                } catch (aY) {
                    S = createPopup().document.body;
                }
                var i = S.createTextRange();
                try {
                    S.style.color = R;
                    var aX = i.queryCommandValue("ForeColor");
                    aX = ((aX & 255) << 16) | (aX & 65280) | ((aX & 16711680) >>> 16);
                    return"#" + ("000000" + aX[aw](16)).slice(-6);
                } catch (aY) {
                    return"none";
                }
            });
        } else {
            var E = J.createElement("i");
            E.title = "Rapha\xebl Colour Picker";
            E.style.display = "none";
            J.body[aH](E);
            az = ah(function(i) {
                E.style.color = i;
                return J.defaultView.getComputedStyle(E, ap).getPropertyValue("color");
            });
        }
        return az(e);
    };
    al.hsb2rgb = ah(function(aZ, aX, a3) {
        if (al.is(aZ, "object") && "h" in aZ && "s" in aZ && "b" in aZ) {
            a3 = aZ.b;
            aX = aZ.s;
            aZ = aZ.h;
        }
        var R, S, a4;
        if (a3 == 0) {
            return{r: 0, g: 0, b: 0, hex: "#000"};
        }
        if (aZ > 1 || aX > 1 || a3 > 1) {
            aZ /= 255;
            aX /= 255;
            a3 /= 255;
        }
        var aW = ~~(aZ * 6), a0 = (aZ * 6) - aW, E = a3 * (1 - aX), e = a3 * (1 - (aX * a0)), a5 = a3 * (1 - (aX * (1 - a0)));
        R = [a3, e, E, E, a5, a3, a3][aW];
        S = [a5, a3, a3, e, E, E, a5][aW];
        a4 = [E, E, a5, a3, a3, e, E][aW];
        R *= 255;
        S *= 255;
        a4 *= 255;
        var a1 = {r: R, g: S, b: a4}, d = (~~R)[aw](16), aY = (~~S)[aw](16), a2 = (~~a4)[aw](16);
        d = d[aL](aQ, "0");
        aY = aY[aL](aQ, "0");
        a2 = a2[aL](aQ, "0");
        a1.hex = "#" + d + aY + a2;
        return a1;
    }, al);
    al.rgb2hsb = ah(function(d, e, aX) {
        if (al.is(d, "object") && "r" in d && "g" in d && "b" in d) {
            aX = d.b;
            e = d.g;
            d = d.r;
        }
        if (al.is(d, "string")) {
            var aZ = al.getRGB(d);
            d = aZ.r;
            e = aZ.g;
            aX = aZ.b;
        }
        if (d > 1 || e > 1 || aX > 1) {
            d /= 255;
            e /= 255;
            aX /= 255;
        }
        var aW = g(d, e, aX), i = aE(d, e, aX), R, E, S = aW;
        if (i == aW) {
            return{h: 0, s: 0, b: aW};
        } else {
            var aY = (aW - i);
            E = aY / aW;
            if (d == aW) {
                R = (e - aX) / aY;
            } else {
                if (e == aW) {
                    R = 2 + ((aX - d) / aY);
                } else {
                    R = 4 + ((d - e) / aY);
                }
            }
            R /= 6;
            R < 0 && R++;
            R > 1 && R--;
        }
        return{h: R, s: E, b: S};
    }, al);
    var aA = /,?([achlmqrstvxz]),?/gi;
    al._path2string = function() {
        return this.join(",")[aL](aA, "$1");
    };
    function ah(E, e, d) {
        function i() {
            var R = Array[aU].slice.call(arguments, 0), aW = R[av]("\u25ba"), S = i.cache = i.cache || {}, aX = i.count = i.count || [];
            if (S[O](aW)) {
                return d ? d(S[aW]) : S[aW];
            }
            aX[m] >= 1000 && delete S[aX.shift()];
            aX[f](aW);
            S[aW] = E[aS](e, R);
            return d ? d(S[aW]) : S[aW];
        }
        return i;
    }
    al.getRGB = ah(function(d) {
        if (!d || !!((d = d + ap).indexOf("-") + 1)) {
            return{r: -1, g: -1, b: -1, hex: "none", error: 1};
        }
        if (d == "none") {
            return{r: -1, g: -1, b: -1, hex: "none"};
        }
        !(({hs: 1, rg: 1})[O](d.substring(0, 2)) || d.charAt() == "#") && (d = az(d));
        var S, i, E, aY, aZ, aW = d.match(x);
        if (aW) {
            if (aW[2]) {
                aY = F(aW[2].substring(5), 16);
                E = F(aW[2].substring(3, 5), 16);
                i = F(aW[2].substring(1, 3), 16);
            }
            if (aW[3]) {
                aY = F((aZ = aW[3].charAt(3)) + aZ, 16);
                E = F((aZ = aW[3].charAt(2)) + aZ, 16);
                i = F((aZ = aW[3].charAt(1)) + aZ, 16);
            }
            if (aW[4]) {
                aW = aW[4][z](/\s*,\s*/);
                i = U(aW[0]);
                E = U(aW[1]);
                aY = U(aW[2]);
            }
            if (aW[5]) {
                aW = aW[5][z](/\s*,\s*/);
                i = U(aW[0]) * 2.55;
                E = U(aW[1]) * 2.55;
                aY = U(aW[2]) * 2.55;
            }
            if (aW[6]) {
                aW = aW[6][z](/\s*,\s*/);
                i = U(aW[0]);
                E = U(aW[1]);
                aY = U(aW[2]);
                return al.hsb2rgb(i, E, aY);
            }
            if (aW[7]) {
                aW = aW[7][z](/\s*,\s*/);
                i = U(aW[0]) * 2.55;
                E = U(aW[1]) * 2.55;
                aY = U(aW[2]) * 2.55;
                return al.hsb2rgb(i, E, aY);
            }
            aW = {r: i, g: E, b: aY};
            var e = (~~i)[aw](16), R = (~~E)[aw](16), aX = (~~aY)[aw](16);
            e = e[aL](aQ, "0");
            R = R[aL](aQ, "0");
            aX = aX[aL](aQ, "0");
            aW.hex = "#" + e + R + aX;
            return aW;
        }
        return{r: -1, g: -1, b: -1, hex: "none", error: 1};
    }, al);
    al.getColor = function(e) {
        var i = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: e || 0.75}, d = this.hsb2rgb(i.h, i.s, i.b);
        i.h += 0.075;
        if (i.h > 1) {
            i.h = 0;
            i.s -= 0.2;
            i.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: i.b});
        }
        return d.hex;
    };
    al.getColor.reset = function() {
        delete this.start;
    };
    al.parsePathString = ah(function(d) {
        if (!d) {
            return null;
        }
        var i = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0}, e = [];
        if (al.is(d, "array") && al.is(d[0], "array")) {
            e = ar(d);
        }
        if (!e[m]) {
            (d + ap)[aL](/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig, function(R, E, aX) {
                var aW = [], S = aV.call(E);
                aX[aL](/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig, function(aZ, aY) {
                    aY && aW[f](+aY);
                });
                while (aW[m] >= i[S]) {
                    e[f]([E][aO](aW.splice(0, i[S])));
                    if (!i[S]) {
                        break;
                    }
                }
            });
        }
        e[aw] = al._path2string;
        return e;
    });
    al.findDotsAtSegment = function(e, d, ba, a8, aW, R, aY, aX, a4) {
        var a2 = 1 - a4, a1 = aI(a2, 3) * e + aI(a2, 2) * 3 * a4 * ba + a2 * 3 * a4 * a4 * aW + aI(a4, 3) * aY, aZ = aI(a2, 3) * d + aI(a2, 2) * 3 * a4 * a8 + a2 * 3 * a4 * a4 * R + aI(a4, 3) * aX, a6 = e + 2 * a4 * (ba - e) + a4 * a4 * (aW - 2 * ba + e), a5 = d + 2 * a4 * (a8 - d) + a4 * a4 * (R - 2 * a8 + d), a9 = ba + 2 * a4 * (aW - ba) + a4 * a4 * (aY - 2 * aW + ba), a7 = a8 + 2 * a4 * (R - a8) + a4 * a4 * (aX - 2 * R + a8), a3 = (1 - a4) * e + a4 * ba, a0 = (1 - a4) * d + a4 * a8, E = (1 - a4) * aW + a4 * aY, i = (1 - a4) * R + a4 * aX, S = (90 - Z.atan((a6 - a9) / (a5 - a7)) * 180 / Z.PI) % 360;
        return{x: a1, y: aZ, m: {x: a6, y: a5}, n: {x: a9, y: a7}, start: {x: a3, y: a0}, end: {x: E, y: i}, alpha: S};
    };
    var Q = ah(function(a1) {
        if (!a1) {
            return{x: 0, y: 0, width: 0, height: 0};
        }
        a1 = G(a1);
        var aY = 0, aX = 0, R = [], e = [], E;
        for (var S = 0, a0 = a1[m]; S < a0; S++) {
            E = a1[S];
            if (E[0] == "M") {
                aY = E[1];
                aX = E[2];
                R[f](aY);
                e[f](aX);
            } else {
                var aW = ay(aY, aX, E[1], E[2], E[3], E[4], E[5], E[6]);
                R = R[aO](aW.min.x, aW.max.x);
                e = e[aO](aW.min.y, aW.max.y);
                aY = E[5];
                aX = E[6];
            }
        }
        var d = aE[aS](0, R), aZ = aE[aS](0, e);
        return{x: d, y: aZ, width: g[aS](0, R) - d, height: g[aS](0, e) - aZ};
    }), ar = function(aW) {
        var E = [];
        if (!al.is(aW, "array") || !al.is(aW && aW[0], "array")) {
            aW = al.parsePathString(aW);
        }
        for (var e = 0, R = aW[m]; e < R; e++) {
            E[e] = [];
            for (var d = 0, S = aW[e][m]; d < S; d++) {
                E[e][d] = aW[e][d];
            }
        }
        E[aw] = al._path2string;
        return E;
    }, ab = ah(function(R) {
        if (!al.is(R, "array") || !al.is(R && R[0], "array")) {
            R = al.parsePathString(R);
        }
        var a0 = [], a2 = 0, a1 = 0, a5 = 0, a4 = 0, E = 0;
        if (R[0][0] == "M") {
            a2 = R[0][1];
            a1 = R[0][2];
            a5 = a2;
            a4 = a1;
            E++;
            a0[f](["M", a2, a1]);
        }
        for (var aX = E, a6 = R[m]; aX < a6; aX++) {
            var d = a0[aX] = [], a3 = R[aX];
            if (a3[0] != aV.call(a3[0])) {
                d[0] = aV.call(a3[0]);
                switch (d[0]) {
                    case"a":
                        d[1] = a3[1];
                        d[2] = a3[2];
                        d[3] = a3[3];
                        d[4] = a3[4];
                        d[5] = a3[5];
                        d[6] = +(a3[6] - a2).toFixed(3);
                        d[7] = +(a3[7] - a1).toFixed(3);
                        break;
                    case"v":
                        d[1] = +(a3[1] - a1).toFixed(3);
                        break;
                    case"m":
                        a5 = a3[1];
                        a4 = a3[2];
                    default:
                        for (var aW = 1, aY = a3[m]; aW < aY; aW++) {
                            d[aW] = +(a3[aW] - ((aW % 2) ? a2 : a1)).toFixed(3);
                        }
                    }
            } else {
                d = a0[aX] = [];
                if (a3[0] == "m") {
                    a5 = a3[1] + a2;
                    a4 = a3[2] + a1;
                }
                for (var S = 0, e = a3[m]; S < e; S++) {
                    a0[aX][S] = a3[S];
                }
            }
            var aZ = a0[aX][m];
            switch (a0[aX][0]) {
                case"z":
                    a2 = a5;
                    a1 = a4;
                    break;
                case"h":
                    a2 += +a0[aX][aZ - 1];
                    break;
                case"v":
                    a1 += +a0[aX][aZ - 1];
                    break;
                default:
                    a2 += +a0[aX][aZ - 2];
                    a1 += +a0[aX][aZ - 1];
                }
        }
        a0[aw] = al._path2string;
        return a0;
    }, 0, ar), r = ah(function(R) {
        if (!al.is(R, "array") || !al.is(R && R[0], "array")) {
            R = al.parsePathString(R);
        }
        var aZ = [], a1 = 0, a0 = 0, a4 = 0, a3 = 0, E = 0;
        if (R[0][0] == "M") {
            a1 = +R[0][1];
            a0 = +R[0][2];
            a4 = a1;
            a3 = a0;
            E++;
            aZ[0] = ["M", a1, a0];
        }
        for (var aX = E, a5 = R[m]; aX < a5; aX++) {
            var d = aZ[aX] = [], a2 = R[aX];
            if (a2[0] != aJ.call(a2[0])) {
                d[0] = aJ.call(a2[0]);
                switch (d[0]) {
                    case"A":
                        d[1] = a2[1];
                        d[2] = a2[2];
                        d[3] = a2[3];
                        d[4] = a2[4];
                        d[5] = a2[5];
                        d[6] = +(a2[6] + a1);
                        d[7] = +(a2[7] + a0);
                        break;
                    case"V":
                        d[1] = +a2[1] + a0;
                        break;
                    case"H":
                        d[1] = +a2[1] + a1;
                        break;
                    case"M":
                        a4 = +a2[1] + a1;
                        a3 = +a2[2] + a0;
                    default:
                        for (var aW = 1, aY = a2[m]; aW < aY; aW++) {
                            d[aW] = +a2[aW] + ((aW % 2) ? a1 : a0);
                        }
                    }
            } else {
                for (var S = 0, e = a2[m]; S < e; S++) {
                    aZ[aX][S] = a2[S];
                }
            }
            switch (d[0]) {
                case"Z":
                    a1 = a4;
                    a0 = a3;
                    break;
                case"H":
                    a1 = d[1];
                    break;
                case"V":
                    a0 = d[1];
                    break;
                default:
                    a1 = aZ[aX][aZ[aX][m] - 2];
                    a0 = aZ[aX][aZ[aX][m] - 1];
                }
        }
        aZ[aw] = al._path2string;
        return aZ;
    }, null, ar), aT = function(e, E, d, i) {
        return[e, E, d, i, d, i];
    }, aG = function(e, E, aW, R, d, i) {
        var S = 1 / 3, aX = 2 / 3;
        return[S * e + aX * aW, S * E + aX * R, S * d + aX * aW, S * i + aX * R, d, i];
    }, I = function(a5, bz, be, bc, a6, a0, S, a4, by, a7) {
        var R = Z.PI, bb = R * 120 / 180, d = R / 180 * (+a6 || 0), bi = [], bf, bv = ah(function(bA, bD, i) {
            var bC = bA * Z.cos(i) - bD * Z.sin(i), bB = bA * Z.sin(i) + bD * Z.cos(i);
            return{x: bC, y: bB};
        });
        if (!a7) {
            bf = bv(a5, bz, -d);
            a5 = bf.x;
            bz = bf.y;
            bf = bv(a4, by, -d);
            a4 = bf.x;
            by = bf.y;
            var e = Z.cos(R / 180 * a6), a2 = Z.sin(R / 180 * a6), bk = (a5 - a4) / 2, bj = (bz - by) / 2;
            be = g(be, Z.abs(bk));
            bc = g(bc, Z.abs(bj));
            var E = be * be, bn = bc * bc, bp = (a0 == S ? -1 : 1) * Z.sqrt(Z.abs((E * bn - E * bj * bj - bn * bk * bk) / (E * bj * bj + bn * bk * bk))), a9 = bp * be * bj / bc + (a5 + a4) / 2, a8 = bp * -bc * bk / be + (bz + by) / 2, aZ = Z.asin(((bz - a8) / bc).toFixed(7)), aY = Z.asin(((by - a8) / bc).toFixed(7));
            aZ = a5 < a9 ? R - aZ : aZ;
            aY = a4 < a9 ? R - aY : aY;
            aZ < 0 && (aZ = R * 2 + aZ);
            aY < 0 && (aY = R * 2 + aY);
            if (S && aZ > aY) {
                aZ = aZ - R * 2;
            }
            if (!S && aY > aZ) {
                aY = aY - R * 2;
            }
        } else {
            aZ = a7[0];
            aY = a7[1];
            a9 = a7[2];
            a8 = a7[3];
        }
        var a3 = aY - aZ;
        if (Z.abs(a3) > bb) {
            var ba = aY, bd = a4, a1 = by;
            aY = aZ + bb * (S && aY > aZ ? 1 : -1);
            a4 = a9 + be * Z.cos(aY);
            by = a8 + bc * Z.sin(aY);
            bi = I(a4, by, be, bc, a6, 0, S, bd, a1, [aY, ba, a9, a8]);
        }
        a3 = aY - aZ;
        var aX = Z.cos(aZ), bx = Z.sin(aZ), aW = Z.cos(aY), bw = Z.sin(aY), bl = Z.tan(a3 / 4), bo = 4 / 3 * be * bl, bm = 4 / 3 * bc * bl, bu = [a5, bz], bt = [a5 + bo * bx, bz - bm * aX], bs = [a4 + bo * bw, by - bm * aW], bq = [a4, by];
        bt[0] = 2 * bu[0] - bt[0];
        bt[1] = 2 * bu[1] - bt[1];
        if (a7) {
            return[bt, bs, bq][aO](bi);
        } else {
            bi = [bt, bs, bq][aO](bi)[av]()[z](",");
            var bg = [];
            for (var br = 0, bh = bi[m]; br < bh; br++) {
                bg[br] = br % 2 ? bv(bi[br - 1], bi[br], d).y : bv(bi[br], bi[br + 1], d).x;
            }
            return bg;
        }
    }, K = function(e, d, E, i, aY, aX, aW, S, aZ) {
        var R = 1 - aZ;
        return{x: aI(R, 3) * e + aI(R, 2) * 3 * aZ * E + R * 3 * aZ * aZ * aY + aI(aZ, 3) * aW, y: aI(R, 3) * d + aI(R, 2) * 3 * aZ * i + R * 3 * aZ * aZ * aX + aI(aZ, 3) * S};
    }, ay = ah(function(i, d, R, E, a5, a4, a1, aY) {
        var a3 = (a5 - 2 * R + i) - (a1 - 2 * a5 + R), a0 = 2 * (R - i) - 2 * (a5 - R), aX = i - R, aW = (-a0 + Z.sqrt(a0 * a0 - 4 * a3 * aX)) / 2 / a3, S = (-a0 - Z.sqrt(a0 * a0 - 4 * a3 * aX)) / 2 / a3, aZ = [d, aY], a2 = [i, a1], e;
        Z.abs(aW) > 1000000000000 && (aW = 0.5);
        Z.abs(S) > 1000000000000 && (S = 0.5);
        if (aW > 0 && aW < 1) {
            e = K(i, d, R, E, a5, a4, a1, aY, aW);
            a2[f](e.x);
            aZ[f](e.y);
        }
        if (S > 0 && S < 1) {
            e = K(i, d, R, E, a5, a4, a1, aY, S);
            a2[f](e.x);
            aZ[f](e.y);
        }
        a3 = (a4 - 2 * E + d) - (aY - 2 * a4 + E);
        a0 = 2 * (E - d) - 2 * (a4 - E);
        aX = d - E;
        aW = (-a0 + Z.sqrt(a0 * a0 - 4 * a3 * aX)) / 2 / a3;
        S = (-a0 - Z.sqrt(a0 * a0 - 4 * a3 * aX)) / 2 / a3;
        Z.abs(aW) > 1000000000000 && (aW = 0.5);
        Z.abs(S) > 1000000000000 && (S = 0.5);
        if (aW > 0 && aW < 1) {
            e = K(i, d, R, E, a5, a4, a1, aY, aW);
            a2[f](e.x);
            aZ[f](e.y);
        }
        if (S > 0 && S < 1) {
            e = K(i, d, R, E, a5, a4, a1, aY, S);
            a2[f](e.x);
            aZ[f](e.y);
        }
        return{min: {x: aE[aS](0, a2), y: aE[aS](0, aZ)}, max: {x: g[aS](0, a2), y: g[aS](0, aZ)}};
    }), G = ah(function(a5, a0) {
        var R = r(a5), a1 = a0 && r(a0), a2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, d = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, aW = function(a6, a7) {
            var i, a8;
            if (!a6) {
                return["C", a7.x, a7.y, a7.x, a7.y, a7.x, a7.y];
            }
            !(a6[0] in {T: 1, Q: 1}) && (a7.qx = a7.qy = null);
            switch (a6[0]) {
                case"M":
                    a7.X = a6[1];
                    a7.Y = a6[2];
                    break;
                case"A":
                    a6 = ["C"][aO](I[aS](0, [a7.x, a7.y][aO](a6.slice(1))));
                    break;
                case"S":
                    i = a7.x + (a7.x - (a7.bx || a7.x));
                    a8 = a7.y + (a7.y - (a7.by || a7.y));
                    a6 = ["C", i, a8][aO](a6.slice(1));
                    break;
                case"T":
                    a7.qx = a7.x + (a7.x - (a7.qx || a7.x));
                    a7.qy = a7.y + (a7.y - (a7.qy || a7.y));
                    a6 = ["C"][aO](aG(a7.x, a7.y, a7.qx, a7.qy, a6[1], a6[2]));
                    break;
                case"Q":
                    a7.qx = a6[1];
                    a7.qy = a6[2];
                    a6 = ["C"][aO](aG(a7.x, a7.y, a6[1], a6[2], a6[3], a6[4]));
                    break;
                case"L":
                    a6 = ["C"][aO](aT(a7.x, a7.y, a6[1], a6[2]));
                    break;
                case"H":
                    a6 = ["C"][aO](aT(a7.x, a7.y, a6[1], a7.y));
                    break;
                case"V":
                    a6 = ["C"][aO](aT(a7.x, a7.y, a7.x, a6[1]));
                    break;
                case"Z":
                    a6 = ["C"][aO](aT(a7.x, a7.y, a7.X, a7.Y));
                    break;
            }
            return a6;
        }, e = function(a6, a7) {
            if (a6[a7][m] > 7) {
                a6[a7].shift();
                var a8 = a6[a7];
                while (a8[m]) {
                    a6.splice(a7++, 0, ["C"][aO](a8.splice(0, 6)));
                }
                a6.splice(a7, 1);
                a3 = g(R[m], a1 && a1[m] || 0);
            }
        }, E = function(ba, a9, a7, a6, a8) {
            if (ba && a9 && ba[a8][0] == "M" && a9[a8][0] != "M") {
                a9.splice(a8, 0, ["M", a6.x, a6.y]);
                a7.bx = 0;
                a7.by = 0;
                a7.x = ba[a8][1];
                a7.y = ba[a8][2];
                a3 = g(R[m], a1 && a1[m] || 0);
            }
        };
        for (var aY = 0, a3 = g(R[m], a1 && a1[m] || 0); aY < a3; aY++) {
            R[aY] = aW(R[aY], a2);
            e(R, aY);
            a1 && (a1[aY] = aW(a1[aY], d));
            a1 && e(a1, aY);
            E(R, a1, a2, d, aY);
            E(a1, R, d, a2, aY);
            var aX = R[aY], a4 = a1 && a1[aY], S = aX[m], aZ = a1 && a4[m];
            a2.x = aX[S - 2];
            a2.y = aX[S - 1];
            a2.bx = U(aX[S - 4]) || a2.x;
            a2.by = U(aX[S - 3]) || a2.y;
            d.bx = a1 && (U(a4[aZ - 4]) || d.x);
            d.by = a1 && (U(a4[aZ - 3]) || d.y);
            d.x = a1 && a4[aZ - 2];
            d.y = a1 && a4[aZ - 1];
        }
        return a1 ? [R, a1] : R;
    }, null, ar), p = ah(function(a0) {
        var aZ = [];
        for (var aW = 0, a1 = a0[m]; aW < a1; aW++) {
            var e = {}, aY = a0[aW].match(/^([^:]*):?([\d\.]*)/);
            e.color = al.getRGB(aY[1]);
            if (e.color.error) {
                return null;
            }
            e.color = e.color.hex;
            aY[2] && (e.offset = aY[2] + "%");
            aZ[f](e);
        }
        for (var aW = 1, a1 = aZ[m] - 1; aW < a1; aW++) {
            if (!aZ[aW].offset) {
                var E = U(aZ[aW - 1].offset || 0), R = 0;
                for (var S = aW + 1; S < a1; S++) {
                    if (aZ[S].offset) {
                        R = aZ[S].offset;
                        break;
                    }
                }
                if (!R) {
                    R = 100;
                    S = a1;
                }
                R = U(R);
                var aX = (R - E) / (S - aW + 1);
                for (; aW < S; aW++) {
                    E += aX;
                    aZ[aW].offset = E + "%";
                }
            }
        }
        return aZ;
    }), am = function() {
        var i, e, R, E, d;
        if (al.is(arguments[0], "string") || al.is(arguments[0], "object")) {
            if (al.is(arguments[0], "string")) {
                i = J.getElementById(arguments[0]);
            } else {
                i = arguments[0];
            }
            if (i.tagName) {
                if (arguments[1] == null) {
                    return{container: i, width: i.style.pixelWidth || i.offsetWidth, height: i.style.pixelHeight || i.offsetHeight};
                } else {
                    return{container: i, width: arguments[1], height: arguments[2]};
                }
            }
        } else {
            if (al.is(arguments[0], aj) && arguments[m] > 3) {
                return{container: 1, x: arguments[0], y: arguments[1], width: arguments[2], height: arguments[3]};
            }
        }
    }, aC = function(d, i) {
        var e = this;
        for (var E in i) {
            if (i[O](E) && !(E in d)) {
                switch (typeof i[E]) {
                    case"function":
                        (function(R) {
                            d[E] = d === e ? R : function() {
                                return R[aS](e, arguments);
                            };
                        })(i[E]);
                        break;
                    case"object":
                        d[E] = d[E] || {};
                        aC.call(this, d[E], i[E]);
                        break;
                    default:
                        d[E] = i[E];
                        break;
                    }
            }
        }
    }, ai = function(d, e) {
        d == e.top && (e.top = d.prev);
        d == e.bottom && (e.bottom = d.next);
        d.next && (d.next.prev = d.prev);
        d.prev && (d.prev.next = d.next);
    }, W = function(d, e) {
        if (e.top === d) {
            return;
        }
        ai(d, e);
        d.next = null;
        d.prev = e.top;
        e.top.next = d;
        e.top = d;
    }, k = function(d, e) {
        if (e.bottom === d) {
            return;
        }
        ai(d, e);
        d.next = e.bottom;
        d.prev = null;
        e.bottom.prev = d;
        e.bottom = d;
    }, A = function(e, d, i) {
        ai(e, i);
        d == i.top && (i.top = e);
        d.next && (d.next.prev = e);
        e.next = d.next;
        e.prev = d;
        d.next = e;
    }, an = function(e, d, i) {
        ai(e, i);
        d == i.bottom && (i.bottom = e);
        d.prev && (d.prev.next = e);
        e.prev = d.prev;
        d.prev = e;
        e.next = d;
    }, s = function(d) {
        return function() {
            throw new Error("Rapha\xebl: you are calling to method \u201c" + d + "\u201d of removed object");
        };
    }, ao = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;
    if (al.svg) {
        aP[aU].svgns = "http://www.w3.org/2000/svg";
        aP[aU].xlink = "http://www.w3.org/1999/xlink";
        var M = function(d) {
            return +d + (~~d === d) * 0.5;
        }, T = function(S) {
            for (var e = 0, E = S[m]; e < E; e++) {
                if (aV.call(S[e][0]) != "a") {
                    for (var d = 1, R = S[e][m]; d < R; d++) {
                        S[e][d] = M(S[e][d]);
                    }
                } else {
                    S[e][6] = M(S[e][6]);
                    S[e][7] = M(S[e][7]);
                }
            }
            return S;
        }, aF = function(i, d) {
            if (d) {
                for (var e in d) {
                    if (d[O](e)) {
                        i[v](e, d[e]);
                    }
                }
            } else {
                return J.createElementNS(aP[aU].svgns, i);
            }
        };
        al[aw] = function() {
            return"Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
        };
        var q = function(d, E) {
            var e = aF("path");
            E.canvas && E.canvas[aH](e);
            var i = new au(e, E);
            i.type = "path";
            Y(i, {fill: "none", stroke: "#000", path: d});
            return i;
        };
        var b = function(E, a3, d) {
            var a0 = "linear", aX = 0.5, S = 0.5, a5 = E.style;
            a3 = (a3 + ap)[aL](ao, function(a7, i, a8) {
                a0 = "radial";
                if (i && a8) {
                    aX = U(i);
                    S = U(a8);
                    var a6 = ((S > 0.5) * 2 - 1);
                    aI(aX - 0.5, 2) + aI(S - 0.5, 2) > 0.25 && (S = Z.sqrt(0.25 - aI(aX - 0.5, 2)) * a6 + 0.5) && S != 0.5 && (S = S.toFixed(5) - 0.00001 * a6);
                }
                return ap;
            });
            a3 = a3[z](/\s*\-\s*/);
            if (a0 == "linear") {
                var aW = a3.shift();
                aW = -U(aW);
                if (isNaN(aW)) {
                    return null;
                }
                var R = [0, 0, Z.cos(aW * Z.PI / 180), Z.sin(aW * Z.PI / 180)], a2 = 1 / (g(Z.abs(R[2]), Z.abs(R[3])) || 1);
                R[2] *= a2;
                R[3] *= a2;
                if (R[2] < 0) {
                    R[0] = -R[2];
                    R[2] = 0;
                }
                if (R[3] < 0) {
                    R[1] = -R[3];
                    R[3] = 0;
                }
            }
            var aZ = p(a3);
            if (!aZ) {
                return null;
            }
            var e = aF(a0 + "Gradient");
            e.id = "r" + (al._id++)[aw](36);
            aF(e, a0 == "radial" ? {fx: aX, fy: S} : {x1: R[0], y1: R[1], x2: R[2], y2: R[3]});
            d.defs[aH](e);
            for (var aY = 0, a4 = aZ[m]; aY < a4; aY++) {
                var a1 = aF("stop");
                aF(a1, {offset: aZ[aY].offset ? aZ[aY].offset : !aY ? "0%" : "100%", "stop-color": aZ[aY].color || "#fff"});
                e[aH](a1);
            }
            aF(E, {fill: "url(#" + e.id + ")", opacity: 1, "fill-opacity": 1});
            a5.fill = ap;
            a5.opacity = 1;
            a5.fillOpacity = 1;
            return 1;
        };
        var L = function(e) {
            var d = e.getBBox();
            aF(e.pattern, {patternTransform: al.format("translate({0},{1})", d.x, d.y)});
        };
        var Y = function(a2, bb) {
            var a5 = {"": [0], none: [0], "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3], "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3]}, a7 = a2.node, a3 = a2.attrs, aZ = a2.rotate(), S = function(bi, bh) {
                bh = a5[aV.call(bh)];
                if (bh) {
                    var bf = bi.attrs["stroke-width"] || "1", bd = {round: bf, square: bf, butt: 0}[bi.attrs["stroke-linecap"] || bb["stroke-linecap"]] || 0, bg = [];
                    var be = bh[m];
                    while (be--) {
                        bg[be] = bh[be] * bf + ((be % 2) ? 1 : -1) * bd;
                    }
                    aF(a7, {"stroke-dasharray": bg[av](",")});
                }
            };
            bb[O]("rotation") && (aZ = bb.rotation);
            var aY = (aZ + ap)[z](a);
            if (!(aY.length - 1)) {
                aY = null;
            } else {
                aY[1] = +aY[1];
                aY[2] = +aY[2];
            }
            U(aZ) && a2.rotate(0, true);
            for (var a6 in bb) {
                if (bb[O](a6)) {
                    if (!j[O](a6)) {
                        continue;
                    }
                    var a4 = bb[a6];
                    a3[a6] = a4;
                    switch (a6) {
                        case"rotation":
                            a2.rotate(a4, true);
                            break;
                        case"href":
                        case"title":
                        case"target":
                            var a9 = a7.parentNode;
                            if (aV.call(a9.tagName) != "a") {
                                var E = aF("a");
                                a9.insertBefore(E, a7);
                                E[aH](a7);
                                a9 = E;
                            }
                            a9.setAttributeNS(a2.Paper[aU].xlink, a6, a4);
                            break;
                        case"cursor":
                            a7.style.cursor = a4;
                            break;
                        case"clip-rect":
                            var e = (a4 + ap)[z](a);
                            if (e[m] == 4) {
                                a2.clip && a2.clip.parentNode.parentNode.removeChild(a2.clip.parentNode);
                                var i = aF("clipPath"), a8 = aF("rect");
                                i.id = "r" + (al._id++)[aw](36);
                                aF(a8, {x: e[0], y: e[1], width: e[2], height: e[3]});
                                i[aH](a8);
                                a2.paper.defs[aH](i);
                                aF(a7, {"clip-path": "url(#" + i.id + ")"});
                                a2.clip = a8;
                            }
                            if (!a4) {
                                var ba = J.getElementById(a7.getAttribute("clip-path")[aL](/(^url\(#|\)$)/g, ap));
                                ba && ba.parentNode.removeChild(ba);
                                aF(a7, {"clip-path": ap});
                                delete a2.clip;
                            }
                            break;
                        case"path":
                            if (a4 && a2.type == "path") {
                                a3.path = T(r(a4));
                                aF(a7, {d: a3.path});
                            }
                            break;
                        case"width":
                            a7[v](a6, a4);
                            if (a3.fx) {
                                a6 = "x";
                                a4 = a3.x;
                            } else {
                                break;
                            }
                        case"x":
                            if (a3.fx) {
                                a4 = -a3.x - (a3.width || 0);
                            }
                        case"rx":
                            if (a6 == "rx" && a2.type == "rect") {
                                break;
                            }
                        case"cx":
                            aY && (a6 == "x" || a6 == "cx") && (aY[1] += a4 - a3[a6]);
                            a7[v](a6, M(a4));
                            a2.pattern && L(a2);
                            break;
                        case"height":
                            a7[v](a6, a4);
                            if (a3.fy) {
                                a6 = "y";
                                a4 = a3.y;
                            } else {
                                break;
                            }
                        case"y":
                            if (a3.fy) {
                                a4 = -a3.y - (a3.height || 0);
                            }
                        case"ry":
                            if (a6 == "ry" && a2.type == "rect") {
                                break;
                            }
                        case"cy":
                            aY && (a6 == "y" || a6 == "cy") && (aY[2] += a4 - a3[a6]);
                            a7[v](a6, M(a4));
                            a2.pattern && L(a2);
                            break;
                        case"r":
                            if (a2.type == "rect") {
                                aF(a7, {rx: a4, ry: a4});
                            } else {
                                a7[v](a6, a4);
                            }
                            break;
                        case"src":
                            if (a2.type == "image") {
                                a7.setAttributeNS(a2.paper.xlink, "href", a4);
                            }
                            break;
                        case"stroke-width":
                            a7.style.strokeWidth = a4;
                            a7[v](a6, a4);
                            if (a3["stroke-dasharray"]) {
                                S(a2, a3["stroke-dasharray"]);
                            }
                            break;
                        case"stroke-dasharray":
                            S(a2, a4);
                            break;
                        case"translation":
                            var aW = (a4 + ap)[z](a);
                            aW[0] = +aW[0] || 0;
                            aW[1] = +aW[1] || 0;
                            if (aY) {
                                aY[1] += aW[0];
                                aY[2] += aW[1];
                            }
                            t.call(a2, aW[0], aW[1]);
                            break;
                        case"scale":
                            var aW = (a4 + ap)[z](a);
                            a2.scale(+aW[0] || 1, +aW[1] || +aW[0] || 1, +aW[2] || null, +aW[3] || null);
                            break;
                        case"fill":
                            var R = (a4 + ap).match(c);
                            if (R) {
                                var i = aF("pattern"), a1 = aF("image");
                                i.id = "r" + (al._id++)[aw](36);
                                aF(i, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                                aF(a1, {x: 0, y: 0});
                                a1.setAttributeNS(a2.paper.xlink, "href", R[1]);
                                i[aH](a1);
                                var bc = J.createElement("img");
                                bc.style.cssText = "position:absolute;left:-9999em;top-9999em";
                                bc.onload = function() {
                                    aF(i, {width: this.offsetWidth, height: this.offsetHeight});
                                    aF(a1, {width: this.offsetWidth, height: this.offsetHeight});
                                    J.body.removeChild(this);
                                    a2.paper.safari();
                                };
                                J.body[aH](bc);
                                bc.src = R[1];
                                a2.paper.defs[aH](i);
                                a7.style.fill = "url(#" + i.id + ")";
                                aF(a7, {fill: "url(#" + i.id + ")"});
                                a2.pattern = i;
                                a2.pattern && L(a2);
                                break;
                            }
                            if (!al.getRGB(a4).error) {
                                delete bb.gradient;
                                delete a3.gradient;
                                !al.is(a3.opacity, "undefined") && al.is(bb.opacity, "undefined") && aF(a7, {opacity: a3.opacity});
                                !al.is(a3["fill-opacity"], "undefined") && al.is(bb["fill-opacity"], "undefined") && aF(a7, {"fill-opacity": a3["fill-opacity"]});
                            } else {
                                if ((({circle: 1, ellipse: 1})[O](a2.type) || (a4 + ap).charAt() != "r") && b(a7, a4, a2.paper)) {
                                    a3.gradient = a4;
                                    a3.fill = "none";
                                    break;
                                }
                            }
                        case"stroke":
                            a7[v](a6, al.getRGB(a4).hex);
                            break;
                        case"gradient":
                            (({circle: 1, ellipse: 1})[O](a2.type) || (a4 + ap).charAt() != "r") && b(a7, a4, a2.paper);
                            break;
                        case"opacity":
                        case"fill-opacity":
                            if (a3.gradient) {
                                var d = J.getElementById(a7.getAttribute("fill")[aL](/^url\(#|\)$/g, ap));
                                if (d) {
                                    var aX = d.getElementsByTagName("stop");
                                    aX[aX[m] - 1][v]("stop-opacity", a4);
                                }
                                break;
                            }
                        default:
                            a6 == "font-size" && (a4 = F(a4, 10) + "px");
                            var a0 = a6[aL](/(\-.)/g, function(bd) {
                                return aJ.call(bd.substring(1));
                            });
                            a7.style[a0] = a4;
                            a7[v](a6, a4);
                            break;
                        }
                }
            }
            C(a2, bb);
            if (aY) {
                a2.rotate(aY.join(ak));
            } else {
                U(aZ) && a2.rotate(aZ, true);
            }
        };
        var h = 1.2;
        var C = function(d, R) {
            if (d.type != "text" || !(R[O]("text") || R[O]("font") || R[O]("font-size") || R[O]("x") || R[O]("y"))) {
                return;
            }
            var aZ = d.attrs, e = d.node, a1 = e.firstChild ? F(J.defaultView.getComputedStyle(e.firstChild, ap).getPropertyValue("font-size"), 10) : 10;
            if (R[O]("text")) {
                aZ.text = R.text;
                while (e.firstChild) {
                    e.removeChild(e.firstChild);
                }
                var E = (R.text + ap)[z]("\n");
                for (var S = 0, a0 = E[m]; S < a0; S++) {
                    if (E[S]) {
                        var aX = aF("tspan");
                        S && aF(aX, {dy: a1 * h, x: aZ.x});
                        aX[aH](J.createTextNode(E[S]));
                        e[aH](aX);
                    }
                }
            } else {
                var E = e.getElementsByTagName("tspan");
                for (var S = 0, a0 = E[m]; S < a0; S++) {
                    S && aF(E[S], {dy: a1 * h, x: aZ.x});
                }
            }
            aF(e, {y: aZ.y});
            var aW = d.getBBox(), aY = aZ.y - (aW.y + aW.height / 2);
            aY && isFinite(aY) && aF(e, {y: aZ.y + aY});
        };
        var au = function(e, d) {
            var E = 0, i = 0;
            this[0] = e;
            this.id = al._oid++;
            this.node = e;
            e.raphael = this;
            this.paper = d;
            this.attrs = this.attrs || {};
            this.transformations = [];
            this._ = {tx: 0, ty: 0, rt: {deg: 0, cx: 0, cy: 0}, sx: 1, sy: 1};
            !d.bottom && (d.bottom = this);
            this.prev = d.top;
            d.top && (d.top.next = this);
            d.top = this;
            this.next = null;
        };
        au[aU].rotate = function(e, d, E) {
            if (this.removed) {
                return this;
            }
            if (e == null) {
                if (this._.rt.cx) {
                    return[this._.rt.deg, this._.rt.cx, this._.rt.cy][av](ak);
                }
                return this._.rt.deg;
            }
            var i = this.getBBox();
            e = (e + ap)[z](a);
            if (e[m] - 1) {
                d = U(e[1]);
                E = U(e[2]);
            }
            e = U(e[0]);
            if (d != null) {
                this._.rt.deg = e;
            } else {
                this._.rt.deg += e;
            }
            (E == null) && (d = null);
            this._.rt.cx = d;
            this._.rt.cy = E;
            d = d == null ? i.x + i.width / 2 : d;
            E = E == null ? i.y + i.height / 2 : E;
            if (this._.rt.deg) {
                this.transformations[0] = al.format("rotate({0} {1} {2})", this._.rt.deg, d, E);
                this.clip && aF(this.clip, {transform: al.format("rotate({0} {1} {2})", -this._.rt.deg, d, E)});
            } else {
                this.transformations[0] = ap;
                this.clip && aF(this.clip, {transform: ap});
            }
            aF(this.node, {transform: this.transformations[av](ak)});
            return this;
        };
        au[aU].hide = function() {
            !this.removed && (this.node.style.display = "none");
            return this;
        };
        au[aU].show = function() {
            !this.removed && (this.node.style.display = "");
            return this;
        };
        au[aU].remove = function() {
            if (this.removed) {
                return;
            }
            ai(this, this.paper);
            this.node.parentNode.removeChild(this.node);
            for (var d in this) {
                delete this[d];
            }
            this.removed = true;
        };
        au[aU].getBBox = function() {
            if (this.removed) {
                return this;
            }
            if (this.type == "path") {
                return Q(this.attrs.path);
            }
            if (this.node.style.display == "none") {
                this.show();
                var E = true;
            }
            var aX = {};
            try {
                aX = this.node.getBBox();
            } catch (S) {
            } finally {
                aX = aX || {};
            }
            if (this.type == "text") {
                aX = {x: aX.x, y: Infinity, width: 0, height: 0};
                for (var d = 0, R = this.node.getNumberOfChars(); d < R; d++) {
                    var aW = this.node.getExtentOfChar(d);
                    (aW.y < aX.y) && (aX.y = aW.y);
                    (aW.y + aW.height - aX.y > aX.height) && (aX.height = aW.y + aW.height - aX.y);
                    (aW.x + aW.width - aX.x > aX.width) && (aX.width = aW.x + aW.width - aX.x);
                }
            }
            E && this.hide();
            return aX;
        };
        au[aU].attr = function() {
            if (this.removed) {
                return this;
            }
            if (arguments[m] == 0) {
                var R = {};
                for (var E in this.attrs) {
                    if (this.attrs[O](E)) {
                        R[E] = this.attrs[E];
                    }
                }
                this._.rt.deg && (R.rotation = this.rotate());
                (this._.sx != 1 || this._.sy != 1) && (R.scale = this.scale());
                R.gradient && R.fill == "none" && (R.fill = R.gradient) && delete R.gradient;
                return R;
            }
            if (arguments[m] == 1 && al.is(arguments[0], "string")) {
                if (arguments[0] == "translation") {
                    return t.call(this);
                }
                if (arguments[0] == "rotation") {
                    return this.rotate();
                }
                if (arguments[0] == "scale") {
                    return this.scale();
                }
                if (arguments[0] == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                    return this.attrs.gradient;
                }
                return this.attrs[arguments[0]];
            }
            if (arguments[m] == 1 && al.is(arguments[0], "array")) {
                var d = {};
                for (var e in arguments[0]) {
                    if (arguments[0][O](e)) {
                        d[arguments[0][e]] = this.attrs[arguments[0][e]];
                    }
                }
                return d;
            }
            if (arguments[m] == 2) {
                var S = {};
                S[arguments[0]] = arguments[1];
                Y(this, S);
            } else {
                if (arguments[m] == 1 && al.is(arguments[0], "object")) {
                    Y(this, arguments[0]);
                }
            }
            return this;
        };
        au[aU].toFront = function() {
            if (this.removed) {
                return this;
            }
            this.node.parentNode[aH](this.node);
            var d = this.paper;
            d.top != this && W(this, d);
            return this;
        };
        au[aU].toBack = function() {
            if (this.removed) {
                return this;
            }
            if (this.node.parentNode.firstChild != this.node) {
                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
                k(this, this.paper);
                var d = this.paper;
            }
            return this;
        };
        au[aU].insertAfter = function(e) {
            if (this.removed) {
                return this;
            }
            var d = this.paper, i = e.node;
            if (i.nextSibling) {
                i.parentNode.insertBefore(this.node, i.nextSibling);
            } else {
                i.parentNode[aH](this.node);
            }
            A(this, e, this.paper);
            return this;
        };
        au[aU].insertBefore = function(d) {
            if (this.removed) {
                return this;
            }
            var e = d.node;
            e.parentNode.insertBefore(this.node, e);
            an(this, d, this.paper);
            return this;
        };
        var N = function(e, d, S, R) {
            d = M(d);
            S = M(S);
            var E = aF("circle");
            e.canvas && e.canvas[aH](E);
            var i = new au(E, e);
            i.attrs = {cx: d, cy: S, r: R, fill: "none", stroke: "#000"};
            i.type = "circle";
            aF(E, i.attrs);
            return i;
        };
        var aB = function(i, d, aX, e, S, aW) {
            d = M(d);
            aX = M(aX);
            var R = aF("rect");
            i.canvas && i.canvas[aH](R);
            var E = new au(R, i);
            E.attrs = {x: d, y: aX, width: e, height: S, r: aW || 0, rx: aW || 0, ry: aW || 0, fill: "none", stroke: "#000"};
            E.type = "rect";
            aF(R, E.attrs);
            return E;
        };
        var ag = function(e, d, aW, S, R) {
            d = M(d);
            aW = M(aW);
            var E = aF("ellipse");
            e.canvas && e.canvas[aH](E);
            var i = new au(E, e);
            i.attrs = {cx: d, cy: aW, rx: S, ry: R, fill: "none", stroke: "#000"};
            i.type = "ellipse";
            aF(E, i.attrs);
            return i;
        };
        var o = function(i, aW, d, aX, e, S) {
            var R = aF("image");
            aF(R, {x: d, y: aX, width: e, height: S, preserveAspectRatio: "none"});
            R.setAttributeNS(i.xlink, "href", aW);
            i.canvas && i.canvas[aH](R);
            var E = new au(R, i);
            E.attrs = {x: d, y: aX, width: e, height: S, src: aW};
            E.type = "image";
            return E;
        };
        var V = function(e, d, S, R) {
            var E = aF("text");
            aF(E, {x: d, y: S, "text-anchor": "middle"});
            e.canvas && e.canvas[aH](E);
            var i = new au(E, e);
            i.attrs = {x: d, y: S, "text-anchor": "middle", text: R, font: j.font, stroke: "none", fill: "#000"};
            i.type = "text";
            Y(i, i.attrs);
            return i;
        };
        var aR = function(e, d) {
            this.width = e || this.width;
            this.height = d || this.height;
            this.canvas[v]("width", this.width);
            this.canvas[v]("height", this.height);
            return this;
        };
        var w = function() {
            var E = am[aS](null, arguments), i = E && E.container, e = E.x, aW = E.y, R = E.width, d = E.height;
            if (!i) {
                throw new Error("SVG container not found.");
            }
            var S = aF("svg");
            R = R || 512;
            d = d || 342;
            aF(S, {xmlns: "http://www.w3.org/2000/svg", version: 1.1, width: R, height: d});
            if (i == 1) {
                S.style.cssText = "position:absolute;left:" + e + "px;top:" + aW + "px";
                J.body[aH](S);
            } else {
                if (i.firstChild) {
                    i.insertBefore(S, i.firstChild);
                } else {
                    i[aH](S);
                }
            }
            i = new aP;
            i.width = R;
            i.height = d;
            i.canvas = S;
            aC.call(i, i, al.fn);
            i.clear();
            return i;
        };
        aP[aU].clear = function() {
            var d = this.canvas;
            while (d.firstChild) {
                d.removeChild(d.firstChild);
            }
            this.bottom = this.top = null;;
        };
        aP[aU].remove = function() {
            this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            for (var d in this) {
                this[d] = s(d);
            }
        };
    }
    if (al.vml) {
        var aD = function(a4) {
            var a1 = /[ahqtv]/ig, aW = r;
            (a4 + ap).match(a1) && (aW = G);
            a1 = /[clmz]/g;
            if (aW == r && !(a4 + ap).match(a1)) {
                var e = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"}, R = /([clmz]),?([^clmz]*)/gi, S = /-?[^,\s-]+/g;
                var a0 = (a4 + ap)[aL](R, function(a5, a7, i) {
                    var a6 = [];
                    i[aL](S, function(a8) {
                        a6[f](M(a8));
                    });
                    return e[a7] + a6;
                });
                return a0;
            }
            var a2 = aW(a4), E, a0 = [], d;
            for (var aY = 0, a3 = a2[m]; aY < a3; aY++) {
                E = a2[aY];
                d = aV.call(a2[aY][0]);
                d == "z" && (d = "x");
                for (var aX = 1, aZ = E[m]; aX < aZ; aX++) {
                    d += M(E[aX]) + (aX != aZ - 1 ? "," : ap);
                }
                a0[f](d);
            }
            return a0[av](ak);
        };
        al[aw] = function() {
            return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
        };
        var q = function(d, S) {
            var E = af("group");
            E.style.cssText = "position:absolute;left:0;top:0;width:" + S.width + "px;height:" + S.height + "px";
            E.coordsize = S.coordsize;
            E.coordorigin = S.coordorigin;
            var i = af("shape"), e = i.style;
            e.width = S.width + "px";
            e.height = S.height + "px";
            i.coordsize = this.coordsize;
            i.coordorigin = this.coordorigin;
            E[aH](i);
            var R = new au(i, E, S);
            R.isAbsolute = true;
            R.type = "path";
            R.path = [];
            R.Path = ap;
            d && Y(R, {fill: "none", stroke: "#000", path: d});
            S.canvas[aH](E);
            return R;
        };
        var Y = function(aZ, a4) {
            aZ.attrs = aZ.attrs || {};
            var a2 = aZ.node, a5 = aZ.attrs, aW = a2.style, E, a9 = aZ;
            for (var aX in a4) {
                if (a4[O](aX)) {
                    a5[aX] = a4[aX];
                }
            }
            a4.href && (a2.href = a4.href);
            a4.title && (a2.title = a4.title);
            a4.target && (a2.target = a4.target);
            a4.cursor && (aW.cursor = a4.cursor);
            if (a4.path && aZ.type == "path") {
                a5.path = a4.path;
                a2.path = aD(a5.path);
            }
            if (a4.rotation != null) {
                aZ.rotate(a4.rotation, true);
            }
            if (a4.translation) {
                E = (a4.translation + ap)[z](a);
                t.call(aZ, E[0], E[1]);
                if (aZ._.rt.cx != null) {
                    aZ._.rt.cx += +E[0];
                    aZ._.rt.cy += +E[1];
                    aZ.setBox(aZ.attrs, E[0], E[1]);
                }
            }
            if (a4.scale) {
                E = (a4.scale + ap)[z](a);
                aZ.scale(+E[0] || 1, +E[1] || +E[0] || 1, +E[2] || null, +E[3] || null);
            }
            if ("clip-rect" in a4) {
                var d = (a4["clip-rect"] + ap)[z](a);
                if (d[m] == 4) {
                    d[2] = +d[2] + (+d[0]);
                    d[3] = +d[3] + (+d[1]);
                    var aY = a2.clipRect || J.createElement("div"), a8 = aY.style, S = a2.parentNode;
                    a8.clip = al.format("rect({1}px {2}px {3}px {0}px)", d);
                    if (!a2.clipRect) {
                        a8.position = "absolute";
                        a8.top = 0;
                        a8.left = 0;
                        a8.width = aZ.paper.width + "px";
                        a8.height = aZ.paper.height + "px";
                        S.parentNode.insertBefore(aY, S);
                        aY[aH](S);
                        a2.clipRect = aY;
                    }
                }
                if (!a4["clip-rect"]) {
                    a2.clipRect && (a2.clipRect.style.clip = ap);
                }
            }
            if (aZ.type == "image" && a4.src) {
                a2.src = a4.src;
            }
            if (aZ.type == "image" && a4.opacity) {
                a2.filterOpacity = " progid:DXImageTransform.Microsoft.Alpha(opacity=" + (a4.opacity * 100) + ")";
                aW.filter = (a2.filterMatrix || ap) + (a2.filterOpacity || ap);
            }
            a4.font && (aW.font = a4.font);
            a4["font-family"] && (aW.fontFamily = '"' + a4["font-family"][z](",")[0][aL](/^['"]+|['"]+$/g, ap) + '"');
            a4["font-size"] && (aW.fontSize = a4["font-size"]);
            a4["font-weight"] && (aW.fontWeight = a4["font-weight"]);
            a4["font-style"] && (aW.fontStyle = a4["font-style"]);
            if (a4.opacity != null || a4["stroke-width"] != null || a4.fill != null || a4.stroke != null || a4["stroke-width"] != null || a4["stroke-opacity"] != null || a4["fill-opacity"] != null || a4["stroke-dasharray"] != null || a4["stroke-miterlimit"] != null || a4["stroke-linejoin"] != null || a4["stroke-linecap"] != null) {
                a2 = aZ.shape || a2;
                var a3 = (a2.getElementsByTagName("fill") && a2.getElementsByTagName("fill")[0]), a6 = false;
                !a3 && (a6 = a3 = af("fill"));
                if ("fill-opacity" in a4 || "opacity" in a4) {
                    var e = ((+a5["fill-opacity"] + 1 || 2) - 1) * ((+a5.opacity + 1 || 2) - 1);
                    e < 0 && (e = 0);
                    e > 1 && (e = 1);
                    a3.opacity = e;
                }
                a4.fill && (a3.on = true);
                if (a3.on == null || a4.fill == "none") {
                    a3.on = false;
                }
                if (a3.on && a4.fill) {
                    var i = a4.fill.match(c);
                    if (i) {
                        a3.src = i[1];
                        a3.type = "tile";
                    } else {
                        a3.color = al.getRGB(a4.fill).hex;
                        a3.src = ap;
                        a3.type = "solid";
                        if (al.getRGB(a4.fill).error && (a9.type in {circle: 1, ellipse: 1} || (a4.fill + ap).charAt() != "r") && b(a9, a4.fill)) {
                            a5.fill = "none";
                            a5.gradient = a4.fill;
                        }
                    }
                }
                a6 && a2[aH](a3);
                var R = (a2.getElementsByTagName("stroke") && a2.getElementsByTagName("stroke")[0]), a7 = false;
                !R && (a7 = R = af("stroke"));
                if ((a4.stroke && a4.stroke != "none") || a4["stroke-width"] || a4["stroke-opacity"] != null || a4["stroke-dasharray"] || a4["stroke-miterlimit"] || a4["stroke-linejoin"] || a4["stroke-linecap"]) {
                    R.on = true;
                }
                (a4.stroke == "none" || R.on == null || a4.stroke == 0 || a4["stroke-width"] == 0) && (R.on = false);
                R.on && a4.stroke && (R.color = al.getRGB(a4.stroke).hex);
                var e = ((+a5["stroke-opacity"] + 1 || 2) - 1) * ((+a5.opacity + 1 || 2) - 1), a0 = (U(a4["stroke-width"]) || 1) * 0.75;
                e < 0 && (e = 0);
                e > 1 && (e = 1);
                a4["stroke-width"] == null && (a0 = a5["stroke-width"]);
                a4["stroke-width"] && (R.weight = a0);
                a0 && a0 < 1 && (e *= a0) && (R.weight = 1);
                R.opacity = e;
                a4["stroke-linejoin"] && (R.joinstyle = a4["stroke-linejoin"] || "miter");
                R.miterlimit = a4["stroke-miterlimit"] || 8;
                a4["stroke-linecap"] && (R.endcap = a4["stroke-linecap"] == "butt" ? "flat" : a4["stroke-linecap"] == "square" ? "square" : "round");
                if (a4["stroke-dasharray"]) {
                    var a1 = {"-": "shortdash", ".": "shortdot", "-.": "shortdashdot", "-..": "shortdashdotdot", ". ": "dot", "- ": "dash", "--": "longdash", "- .": "dashdot", "--.": "longdashdot", "--..": "longdashdotdot"};
                    R.dashstyle = a1[O](a4["stroke-dasharray"]) ? a1[a4["stroke-dasharray"]] : ap;
                }
                a7 && a2[aH](R);
            }
            if (a9.type == "text") {
                var aW = a9.paper.span.style;
                a5.font && (aW.font = a5.font);
                a5["font-family"] && (aW.fontFamily = a5["font-family"]);
                a5["font-size"] && (aW.fontSize = a5["font-size"]);
                a5["font-weight"] && (aW.fontWeight = a5["font-weight"]);
                a5["font-style"] && (aW.fontStyle = a5["font-style"]);
                a9.node.string && (a9.paper.span.innerHTML = (a9.node.string + ap)[aL](/</g, "&#60;")[aL](/&/g, "&#38;")[aL](/\n/g, "<br>"));
                a9.W = a5.w = a9.paper.span.offsetWidth;
                a9.H = a5.h = a9.paper.span.offsetHeight;
                a9.X = a5.x;
                a9.Y = a5.y + M(a9.H / 2);
                switch (a5["text-anchor"]) {
                    case"start":
                        a9.node.style["v-text-align"] = "left";
                        a9.bbx = M(a9.W / 2);
                        break;
                    case"end":
                        a9.node.style["v-text-align"] = "right";
                        a9.bbx = -M(a9.W / 2);
                        break;
                    default:
                        a9.node.style["v-text-align"] = "center";
                        break;
                    }
            }
        };
        var b = function(d, aX) {
            d.attrs = d.attrs || {};
            var aY = d.attrs, a0 = d.node.getElementsByTagName("fill"), S = "linear", aW = ".5 .5";
            d.attrs.gradient = aX;
            aX = (aX + ap)[aL](ao, function(a2, a3, i) {
                S = "radial";
                if (a3 && i) {
                    a3 = U(a3);
                    i = U(i);
                    aI(a3 - 0.5, 2) + aI(i - 0.5, 2) > 0.25 && (i = Z.sqrt(0.25 - aI(a3 - 0.5, 2)) * ((i > 0.5) * 2 - 1) + 0.5);
                    aW = a3 + ak + i;
                }
                return ap;
            });
            aX = aX[z](/\s*\-\s*/);
            if (S == "linear") {
                var e = aX.shift();
                e = -U(e);
                if (isNaN(e)) {
                    return null;
                }
            }
            var R = p(aX);
            if (!R) {
                return null;
            }
            d = d.shape || d.node;
            a0 = a0[0] || af("fill");
            if (R[m]) {
                a0.on = true;
                a0.method = "none";
                a0.type = (S == "radial") ? "gradientradial" : "gradient";
                a0.color = R[0].color;
                a0.color2 = R[R[m] - 1].color;
                var a1 = [];
                for (var E = 0, aZ = R[m]; E < aZ; E++) {
                    R[E].offset && a1[f](R[E].offset + ak + R[E].color);
                }
                a0.colors && (a0.colors.value = a1[m] ? a1[av](",") : "0% " + a0.color);
                if (S == "radial") {
                    a0.focus = "100%";
                    a0.focussize = aW;
                    a0.focusposition = aW;
                } else {
                    a0.angle = (270 - e) % 360;
                }
            }
            return 1;
        };
        var au = function(R, aW, d) {
            var S = 0, i = 0, e = 0, E = 1;
            this[0] = R;
            this.id = al._oid++;
            this.node = R;
            R.raphael = this;
            this.X = 0;
            this.Y = 0;
            this.attrs = {};
            this.Group = aW;
            this.paper = d;
            this._ = {tx: 0, ty: 0, rt: {deg: 0}, sx: 1, sy: 1};
            !d.bottom && (d.bottom = this);
            this.prev = d.top;
            d.top && (d.top.next = this);
            d.top = this;
            this.next = null;
        };
        au[aU].rotate = function(e, d, i) {
            if (this.removed) {
                return this;
            }
            if (e == null) {
                if (this._.rt.cx) {
                    return[this._.rt.deg, this._.rt.cx, this._.rt.cy][av](ak);
                }
                return this._.rt.deg;
            }
            e = (e + ap)[z](a);
            if (e[m] - 1) {
                d = U(e[1]);
                i = U(e[2]);
            }
            e = U(e[0]);
            if (d != null) {
                this._.rt.deg = e;
            } else {
                this._.rt.deg += e;
            }
            i == null && (d = null);
            this._.rt.cx = d;
            this._.rt.cy = i;
            this.setBox(this.attrs, d, i);
            this.Group.style.rotation = this._.rt.deg;
            return this;
        };
        au[aU].setBox = function(a7, e, d) {
            if (this.removed) {
                return this;
            }
            var a1 = this.Group.style, R = (this.shape && this.shape.style) || this.node.style;
            a7 = a7 || {};
            for (var a5 in a7) {
                if (a7[O](a5)) {
                    this.attrs[a5] = a7[a5];
                }
            }
            e = e || this._.rt.cx;
            d = d || this._.rt.cy;
            var a3 = this.attrs, aX, aW, aY, a6;
            switch (this.type) {
                case"circle":
                    aX = a3.cx - a3.r;
                    aW = a3.cy - a3.r;
                    aY = a6 = a3.r * 2;
                    break;
                case"ellipse":
                    aX = a3.cx - a3.rx;
                    aW = a3.cy - a3.ry;
                    aY = a3.rx * 2;
                    a6 = a3.ry * 2;
                    break;
                case"rect":
                case"image":
                    aX = +a3.x;
                    aW = +a3.y;
                    aY = a3.width || 0;
                    a6 = a3.height || 0;
                    break;
                case"text":
                    this.textpath.v = ["m", M(a3.x), ", ", M(a3.y - 2), "l", M(a3.x) + 1, ", ", M(a3.y - 2)][av](ap);
                    aX = a3.x - M(this.W / 2);
                    aW = a3.y - this.H / 2;
                    aY = this.W;
                    a6 = this.H;
                    break;
                case"path":
                    if (!this.attrs.path) {
                        aX = 0;
                        aW = 0;
                        aY = this.paper.width;
                        a6 = this.paper.height;
                    } else {
                        var a4 = Q(this.attrs.path);
                        aX = a4.x;
                        aW = a4.y;
                        aY = a4.width;
                        a6 = a4.height;
                    }
                    break;
                default:
                    aX = 0;
                    aW = 0;
                    aY = this.paper.width;
                    a6 = this.paper.height;
                    break;
            }
            e = (e == null) ? aX + aY / 2 : e;
            d = (d == null) ? aW + a6 / 2 : d;
            var E = e - this.paper.width / 2, a0 = d - this.paper.height / 2;
            if (this.type == "path" || this.type == "text") {
                (a1.left != E + "px") && (a1.left = E + "px");
                (a1.top != a0 + "px") && (a1.top = a0 + "px");
                this.X = this.type == "text" ? aX : -E;
                this.Y = this.type == "text" ? aW : -a0;
                this.W = aY;
                this.H = a6;
                (R.left != -E + "px") && (R.left = -E + "px");
                (R.top != -a0 + "px") && (R.top = -a0 + "px");
            } else {
                (a1.left != E + "px") && (a1.left = E + "px");
                (a1.top != a0 + "px") && (a1.top = a0 + "px");
                this.X = aX;
                this.Y = aW;
                this.W = aY;
                this.H = a6;
                (a1.width != this.paper.width + "px") && (a1.width = this.paper.width + "px");
                (a1.height != this.paper.height + "px") && (a1.height = this.paper.height + "px");
                (R.left != aX - E + "px") && (R.left = aX - E + "px");
                (R.top != aW - a0 + "px") && (R.top = aW - a0 + "px");
                (R.width != aY + "px") && (R.width = aY + "px");
                (R.height != a6 + "px") && (R.height = a6 + "px");
                var S = (+a7.r || 0) / aE(aY, a6);
                if (this.type == "rect" && this.arcsize.toFixed(4) != S.toFixed(4) && (S || this.arcsize)) {
                    var a2 = af("roundrect"), a8 = {}, a5 = 0, aZ = this.events && this.events[m];
                    a2.arcsize = S;
                    a2.raphael = this;
                    this.Group[aH](a2);
                    this.Group.removeChild(this.node);
                    this[0] = this.node = a2;
                    this.arcsize = S;
                    for (var a5 in a3) {
                        a8[a5] = a3[a5];
                    }
                    delete a8.scale;
                    this.attr(a8);
                    if (this.events) {
                        for (; a5 < aZ; a5++) {
                            this.events[a5].unbind = ac(this.node, this.events[a5].name, this.events[a5].f, this);
                        }
                    }
                }
            }
        };
        au[aU].hide = function() {
            !this.removed && (this.Group.style.display = "none");
            return this;
        };
        au[aU].show = function() {
            !this.removed && (this.Group.style.display = "block");
            return this;
        };
        au[aU].getBBox = function() {
            if (this.removed) {
                return this;
            }
            if (this.type == "path") {
                return Q(this.attrs.path);
            }
            return{x: this.X + (this.bbx || 0), y: this.Y, width: this.W, height: this.H};
        };
        au[aU].remove = function() {
            if (this.removed) {
                return;
            }
            ai(this, this.paper);
            this.node.parentNode.removeChild(this.node);
            this.Group.parentNode.removeChild(this.Group);
            this.shape && this.shape.parentNode.removeChild(this.shape);
            for (var d in this) {
                delete this[d];
            }
            this.removed = true;
        };
        au[aU].attr = function() {
            if (this.removed) {
                return this;
            }
            if (arguments[m] == 0) {
                var E = {};
                for (var e in this.attrs) {
                    if (this.attrs[O](e)) {
                        E[e] = this.attrs[e];
                    }
                }
                this._.rt.deg && (E.rotation = this.rotate());
                (this._.sx != 1 || this._.sy != 1) && (E.scale = this.scale());
                E.gradient && E.fill == "none" && (E.fill = E.gradient) && delete E.gradient;
                return E;
            }
            if (arguments[m] == 1 && al.is(arguments[0], "string")) {
                if (arguments[0] == "translation") {
                    return t.call(this);
                }
                if (arguments[0] == "rotation") {
                    return this.rotate();
                }
                if (arguments[0] == "scale") {
                    return this.scale();
                }
                if (arguments[0] == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                    return this.attrs.gradient;
                }
                return this.attrs[arguments[0]];
            }
            if (this.attrs && arguments[m] == 1 && al.is(arguments[0], "array")) {
                var d = {};
                for (var e = 0, R = arguments[0][m]; e < R; e++) {
                    d[arguments[0][e]] = this.attrs[arguments[0][e]];
                }
                return d;
            }
            var S;
            if (arguments[m] == 2) {
                S = {};
                S[arguments[0]] = arguments[1];
            }
            arguments[m] == 1 && al.is(arguments[0], "object") && (S = arguments[0]);
            if (S) {
                if (S.text && this.type == "text") {
                    this.node.string = S.text;
                }
                Y(this, S);
                if (S.gradient && (({circle: 1, ellipse: 1})[O](this.type) || (S.gradient + ap).charAt() != "r")) {
                    b(this, S.gradient);
                }
                (this.type != "path" || this._.rt.deg) && this.setBox(this.attrs);
            }
            return this;
        };
        au[aU].toFront = function() {
            !this.removed && this.Group.parentNode[aH](this.Group);
            this.paper.top != this && W(this, this.paper);
            return this;
        };
        au[aU].toBack = function() {
            if (this.removed) {
                return this;
            }
            if (this.Group.parentNode.firstChild != this.Group) {
                this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
                k(this, this.paper);
            }
            return this;
        };
        au[aU].insertAfter = function(d) {
            if (this.removed) {
                return this;
            }
            if (d.Group.nextSibling) {
                d.Group.parentNode.insertBefore(this.Group, d.Group.nextSibling);
            } else {
                d.Group.parentNode[aH](this.Group);
            }
            A(this, d, this.paper);
            return this;
        };
        au[aU].insertBefore = function(d) {
            if (this.removed) {
                return this;
            }
            d.Group.parentNode.insertBefore(this.Group, d.Group);
            an(this, d, this.paper);
            return this;
        };
        var N = function(e, d, aX, S) {
            var R = af("group"), aW = af("oval"), i = aW.style;
            R.style.cssText = "position:absolute;left:0;top:0;width:" + e.width + "px;height:" + e.height + "px";
            R.coordsize = e.coordsize;
            R.coordorigin = e.coordorigin;
            R[aH](aW);
            var E = new au(aW, R, e);
            E.type = "circle";
            Y(E, {stroke: "#000", fill: "none"});
            E.attrs.cx = d;
            E.attrs.cy = aX;
            E.attrs.r = S;
            E.setBox({x: d - S, y: aX - S, width: S * 2, height: S * 2});
            e.canvas[aH](R);
            return E;
        }, aB = function(e, aX, aW, aY, E, d) {
            var R = af("group"), i = af("roundrect"), aZ = (+d || 0) / (aE(aY, E));
            R.style.cssText = "position:absolute;left:0;top:0;width:" + e.width + "px;height:" + e.height + "px";
            R.coordsize = e.coordsize;
            R.coordorigin = e.coordorigin;
            R[aH](i);
            i.arcsize = aZ;
            var S = new au(i, R, e);
            S.type = "rect";
            Y(S, {stroke: "#000"});
            S.arcsize = aZ;
            S.setBox({x: aX, y: aW, width: aY, height: E, r: d});
            e.canvas[aH](R);
            return S;
        }, ag = function(d, aY, aX, i, e) {
            var R = af("group"), E = af("oval"), aW = E.style;
            R.style.cssText = "position:absolute;left:0;top:0;width:" + d.width + "px;height:" + d.height + "px";
            R.coordsize = d.coordsize;
            R.coordorigin = d.coordorigin;
            R[aH](E);
            var S = new au(E, R, d);
            S.type = "ellipse";
            Y(S, {stroke: "#000"});
            S.attrs.cx = aY;
            S.attrs.cy = aX;
            S.attrs.rx = i;
            S.attrs.ry = e;
            S.setBox({x: aY - i, y: aX - e, width: i * 2, height: e * 2});
            d.canvas[aH](R);
            return S;
        }, o = function(e, d, aY, aX, aZ, E) {
            var R = af("group"), i = af("image"), aW = i.style;
            R.style.cssText = "position:absolute;left:0;top:0;width:" + e.width + "px;height:" + e.height + "px";
            R.coordsize = e.coordsize;
            R.coordorigin = e.coordorigin;
            i.src = d;
            R[aH](i);
            var S = new au(i, R, e);
            S.type = "image";
            S.attrs.src = d;
            S.attrs.x = aY;
            S.attrs.y = aX;
            S.attrs.w = aZ;
            S.attrs.h = E;
            S.setBox({x: aY, y: aX, width: aZ, height: E});
            e.canvas[aH](R);
            return S;
        }, V = function(e, aY, aX, aZ) {
            var R = af("group"), E = af("shape"), aW = E.style, a0 = af("path"), d = a0.style, i = af("textpath");
            R.style.cssText = "position:absolute;left:0;top:0;width:" + e.width + "px;height:" + e.height + "px";
            R.coordsize = e.coordsize;
            R.coordorigin = e.coordorigin;
            a0.v = al.format("m{0},{1}l{2},{1}", M(aY), M(aX), M(aY) + 1);
            a0.textpathok = true;
            aW.width = e.width;
            aW.height = e.height;
            i.string = aZ + ap;
            i.on = true;
            E[aH](i);
            E[aH](a0);
            R[aH](E);
            var S = new au(i, R, e);
            S.shape = E;
            S.textpath = a0;
            S.type = "text";
            S.attrs.text = aZ;
            S.attrs.x = aY;
            S.attrs.y = aX;
            S.attrs.w = 1;
            S.attrs.h = 1;
            Y(S, {font: j.font, stroke: "none", fill: "#000"});
            S.setBox();
            e.canvas[aH](R);
            return S;
        }, aR = function(i, d) {
            var e = this.canvas.style;
            i == +i && (i += "px");
            d == +d && (d += "px");
            e.width = i;
            e.height = d;
            e.clip = "rect(0 " + i + " " + d + " 0)";
            return this;
        }, af;
        J.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            !J.namespaces.rvml && J.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            af = function(d) {
                return J.createElement("<rvml:" + d + ' class="rvml">');
            };
        } catch (ad) {
            af = function(d) {
                return J.createElement("<" + d + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
        }
        var w = function() {
            var i = am[aS](null, arguments), d = i.container, aY = i.height, aZ, e = i.width, aX = i.x, aW = i.y;
            if (!d) {
                throw new Error("VML container not found.");
            }
            var R = new aP, S = R.canvas = J.createElement("div"), E = S.style;
            e = e || 512;
            aY = aY || 342;
            e == +e && (e += "px");
            aY == +aY && (aY += "px");
            R.width = 1000;
            R.height = 1000;
            R.coordsize = "1000 1000";
            R.coordorigin = "0 0";
            R.span = J.createElement("span");
            R.span.style.cssText = "position:absolute;left:-732vw;top:-732vw;padding:0;margin:0;line-height:1;display:inline;";
            S[aH](R.span);
            E.cssText = al.format("width:{0};height:{1};position:absolute;clip:rect(0 {0} {1} 0);overflow:hidden", e, aY);
            if (d == 1) {
                J.body[aH](S);
                E.left = aX + "px";
                E.top = aW + "px";
            } else {
                d.style.width = e;
                d.style.height = aY;
                if (d.firstChild) {
                    d.insertBefore(S, d.firstChild);
                } else {
                    d[aH](S);
                }
            }
            aC.call(R, R, al.fn);
            return R;
        };
        aP[aU].clear = function() {
            this.canvas.innerHTML = ap;
            this.span = J.createElement("span");
            this.span.style.cssText = "position:absolute;left:-732vw;top:-732vw;padding:0;margin:0;line-height:1;display:inline;";
            this.canvas[aH](this.span);
            this.bottom = this.top = null;
        };
        aP[aU].remove = function() {
            this.canvas.parentNode.removeChild(this.canvas);
            for (var d in this) {
                this[d] = s(d);
            }
        };
    }
    if ((/^Apple|^Google/).test(navigator.vendor) && !(navigator.userAgent.indexOf("Version/4.0") + 1)) {
        aP[aU].safari = function() {
            var d = this.rect(-99, -99, this.width + 99, this.height + 99);
            setTimeout(function() {
                d.remove();
            });
        };
    } else {
        aP[aU].safari = function() {
        };
    }
    var ac = (function() {
        if (J.addEventListener) {
            return function(R, i, e, d) {
                var E = function(S) {
                    return e.call(d, S);
                };
                R.addEventListener(i, E, false);
                return function() {
                    R.removeEventListener(i, E, false);
                    return true;
                };
            };
        } else {
            if (J.attachEvent) {
                return function(S, E, i, e) {
                    var R = function(aW) {
                        return i.call(e, aW || aq.event);
                    };
                    S.attachEvent("on" + E, R);
                    var d = function() {
                        S.detachEvent("on" + E, R);
                        return true;
                    };
                    return d;
                };
            }
        }
    })();
    for (var aa = D[m]; aa--; ) {
        (function(d) {
            au[aU][d] = function(e) {
                if (al.is(e, "function")) {
                    this.events = this.events || [];
                    this.events.push({name: d, f: e, unbind: ac(this.shape || this.node, d, e, this)});
                }
                return this;
            };
            au[aU]["un" + d] = function(E) {
                var i = this.events, e = i[m];
                while (e--) {
                    if (i[e].name == d && i[e].f == E) {
                        i[e].unbind();
                        i.splice(e, 1);
                        !i.length && delete this.events;
                        return this;
                    }
                }
                return this;
            };
        })(D[aa]);
    }
    au[aU].hover = function(e, d) {
        return this.mouseover(e).mouseout(d);
    };
    au[aU].unhover = function(e, d) {
        return this.unmouseover(e).unmouseout(d);
    };
    aP[aU].circle = function(d, i, e) {
        return N(this, d || 0, i || 0, e || 0);
    };
    aP[aU].rect = function(d, R, e, i, E) {
        return aB(this, d || 0, R || 0, e || 0, i || 0, E || 0);
    };
    aP[aU].ellipse = function(d, E, i, e) {
        return ag(this, d || 0, E || 0, i || 0, e || 0);
    };
    aP[aU].path = function(d) {
        d && !al.is(d, "string") && !al.is(d[0], "array") && (d += ap);
        return q(al.format[aS](al, arguments), this);
    };
    aP[aU].image = function(E, d, R, e, i) {
        return o(this, E || "about:blank", d || 0, R || 0, e || 0, i || 0);
    };
    aP[aU].text = function(d, i, e) {
        return V(this, d || 0, i || 0, e || ap);
    };
    aP[aU].set = function(d) {
        arguments[m] > 1 && (d = Array[aU].splice.call(arguments, 0, arguments[m]));
        return new P(d);
    };
    aP[aU].setSize = aR;
    aP[aU].top = aP[aU].bottom = null;
    aP[aU].raphael = al;
    function u() {
        return this.x + ak + this.y;
    }
    au[aU].scale = function(a2, a1, E, e) {
        if (a2 == null && a1 == null) {
            return{x: this._.sx, y: this._.sy, toString: u};
        }
        a1 = a1 || a2;
        !+a1 && (a1 = a2);
        var a6, a4, a5, a3, bi = this.attrs;
        if (a2 != 0) {
            var a0 = this.getBBox(), aX = a0.x + a0.width / 2, R = a0.y + a0.height / 2, bh = a2 / this._.sx, bg = a1 / this._.sy;
            E = (+E || E == 0) ? E : aX;
            e = (+e || e == 0) ? e : R;
            var aZ = ~~(a2 / Z.abs(a2)), aW = ~~(a1 / Z.abs(a1)), a8 = this.node.style, bk = E + (aX - E) * bh, bj = e + (R - e) * bg;
            switch (this.type) {
                case"rect":
                case"image":
                    var aY = bi.width * aZ * bh, bc = bi.height * aW * bg;
                    this.attr({height: newh, r: bi.r * aE(aZ * bh, aW * bg), width: aY, x: bk - aY / 2, y: bj - newh / 2});
                    break;
                case"circle":
                case"ellipse":
                    this.attr({rx: bi.rx * aZ * bh, ry: bi.ry * aW * bg, r: bi.r * aE(aZ * bh, aW * bg), cx: bk, cy: bj});
                    break;
                case"path":
                    var ba = ab(bi.path), bd = true;
                    for (var bf = 0, a7 = ba[m]; bf < a7; bf++) {
                        var a9 = ba[bf], be, S = aJ.call(a9[0]);
                        if (S == "M" && bd) {
                            continue;
                        } else {
                            bd = false;
                        }
                        if (S == "A") {
                            a9[ba[bf][m] - 2] *= bh;
                            a9[ba[bf][m] - 1] *= bg;
                            a9[1] *= aZ * bh;
                            a9[2] *= aW * bg;
                            a9[5] = +(aZ + aW ? !!+a9[5] : !+a9[5]);
                        } else {
                            if (S == "H") {
                                for (be = 1, jj = a9[m]; be < jj; be++) {
                                    a9[be] *= bh;
                                }
                            } else {
                                if (S == "V") {
                                    for (be = 1, jj = a9[m]; be < jj; be++) {
                                        a9[be] *= bg;
                                    }
                                } else {
                                    for (be = 1, jj = a9[m]; be < jj; be++) {
                                        a9[be] *= (be % 2) ? bh : bg;
                                    }
                                }
                            }
                        }
                    }
                    var d = Q(ba), a6 = bk - d.x - d.width / 2, a4 = bj - d.y - d.height / 2;
                    ba[0][1] += a6;
                    ba[0][2] += a4;
                    this.attr({path: ba});
                    break;
            }
            if (this.type in {text: 1, image: 1} && (aZ != 1 || aW != 1)) {
                if (this.transformations) {
                    this.transformations[2] = "scale("[aO](aZ, ",", aW, ")");
                    this.node[v]("transform", this.transformations[av](ak));
                    a6 = (aZ == -1) ? -bi.x - (aY || 0) : bi.x;
                    a4 = (aW == -1) ? -bi.y - (newh || 0) : bi.y;
                    this.attr({x: a6, y: a4});
                    bi.fx = aZ - 1;
                    bi.fy = aW - 1;
                } else {
                    this.node.filterMatrix = " progid:DXImageTransform.Microsoft.Matrix(M11="[aO](aZ, ", M12=0, M21=0, M22=", aW, ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
                    a8.filter = (this.node.filterMatrix || ap) + (this.node.filterOpacity || ap);
                }
            } else {
                if (this.transformations) {
                    this.transformations[2] = ap;
                    this.node[v]("transform", this.transformations[av](ak));
                    bi.fx = 0;
                    bi.fy = 0;
                } else {
                    this.node.filterMatrix = ap;
                    a8.filter = (this.node.filterMatrix || ap) + (this.node.filterOpacity || ap);
                }
            }
            bi.scale = [a2, a1, E, e][av](ak);
            this._.sx = a2;
            this._.sy = a1;
        }
        return this;
    };
    au[aU].clone = function() {
        var d = this.attr();
        delete d.scale;
        delete d.translation;
        return this.paper[this.type]().attr(d);
    };
    var ax = function(d) {
        return function(E) {
            if (this.type != "path") {
                return -1;
            }
            var a0 = G(this.attrs.path), aY, aX, e, R, aW = 0;
            for (var S = 0, aZ = a0.length; S < aZ; S++) {
                e = a0[S];
                if (e[0] == "M") {
                    aY = +e[1];
                    aX = +e[2];
                } else {
                    R = n(aY, aX, e[1], e[2], e[3], e[4], e[5], e[6]);
                    if (!d && aW + R > E) {
                        return al.findDotsAtSegment(aY, aX, e[1], e[2], e[3], e[4], e[5], e[6], (E - aW) / R);
                    }
                    aW += R;
                    aY = +e[5];
                    aX = +e[6];
                }
            }
            return d ? aW : al.findDotsAtSegment(aY, aX, e[1], e[2], e[3], e[4], e[5], e[6], 1);
        };
    }, n = function(E, d, aW, S, a2, a1, a0, aZ) {
        var R = {x: 0, y: 0}, aY = 0;
        for (var aX = 0; aX < 1.01; aX += 0.01) {
            var e = K(E, d, aW, S, a2, a1, a0, aZ, aX);
            aX && (aY += Z.sqrt(aI(R.x - e.x, 2) + aI(R.y - e.y, 2)));
            R = e;
        }
        return aY;
    };
    au[aU].getTotalLength = ax(1);
    au[aU].getPointAtLength = ax();
    al.easing_formulas = {linear: function(d) {
            return d;
        }, "<": function(d) {
            return aI(d, 3);
        }, ">": function(d) {
            return aI(d - 1, 3) + 1;
        }, "<>": function(d) {
            d = d * 2;
            if (d < 1) {
                return aI(d, 3) / 2;
            }
            d -= 2;
            return(aI(d, 3) + 2) / 2;
        }, backIn: function(e) {
            var d = 1.70158;
            return e * e * ((d + 1) * e - d);
        }, backOut: function(e) {
            e = e - 1;
            var d = 1.70158;
            return e * e * ((d + 1) * e + d) + 1;
        }, elastic: function(i) {
            if (i == 0 || i == 1) {
                return i;
            }
            var e = 0.3, d = e / 4;
            return aI(2, -10 * i) * Z.sin((i - d) * (2 * Z.PI) / e) + 1;
        }, bounce: function(E) {
            var e = 7.5625, i = 2.75, d;
            if (E < (1 / i)) {
                d = e * E * E;
            } else {
                if (E < (2 / i)) {
                    E -= (1.5 / i);
                    d = e * E * E + 0.75;
                } else {
                    if (E < (2.5 / i)) {
                        E -= (2.25 / i);
                        d = e * E * E + 0.9375;
                    } else {
                        E -= (2.625 / i);
                        d = e * E * E + 0.984375;
                    }
                }
            }
            return d;
        }};
    var H = {length: 0}, aN = function() {
        var aY = +new Date;
        for (var a9 in H) {
            if (a9 != "length" && H[O](a9)) {
                var be = H[a9];
                if (be.stop) {
                    delete H[a9];
                    H[m]--;
                    continue;
                }
                var aW = aY - be.start, a7 = be.ms, a6 = be.easing, ba = be.from, a3 = be.diff, E = be.to, a2 = be.t, a5 = be.prev || 0, aX = be.el, R = be.callback, a4 = {}, d;
                if (aW < a7) {
                    var S = al.easing_formulas[a6] ? al.easing_formulas[a6](aW / a7) : aW / a7;
                    for (var a8 in ba) {
                        if (ba[O](a8)) {
                            switch (X[a8]) {
                                case"number":
                                    d = +ba[a8] + S * a7 * a3[a8];
                                    break;
                                case"colour":
                                    d = "rgb(" + [B(M(ba[a8].r + S * a7 * a3[a8].r)), B(M(ba[a8].g + S * a7 * a3[a8].g)), B(M(ba[a8].b + S * a7 * a3[a8].b))][av](",") + ")";
                                    break;
                                case"path":
                                    d = [];
                                    for (var bc = 0, a1 = ba[a8][m]; bc < a1; bc++) {
                                        d[bc] = [ba[a8][bc][0]];
                                        for (var bb = 1, bd = ba[a8][bc][m]; bb < bd; bb++) {
                                            d[bc][bb] = +ba[a8][bc][bb] + S * a7 * a3[a8][bc][bb];
                                        }
                                        d[bc] = d[bc][av](ak);
                                    }
                                    d = d[av](ak);
                                    break;
                                case"csv":
                                    switch (a8) {
                                        case"translation":
                                            var a0 = a3[a8][0] * (aW - a5), aZ = a3[a8][1] * (aW - a5);
                                            a2.x += a0;
                                            a2.y += aZ;
                                            d = a0 + ak + aZ;
                                            break;
                                        case"rotation":
                                            d = +ba[a8][0] + S * a7 * a3[a8][0];
                                            ba[a8][1] && (d += "," + ba[a8][1] + "," + ba[a8][2]);
                                            break;
                                        case"scale":
                                            d = [+ba[a8][0] + S * a7 * a3[a8][0], +ba[a8][1] + S * a7 * a3[a8][1], (2 in E[a8] ? E[a8][2] : ap), (3 in E[a8] ? E[a8][3] : ap)][av](ak);
                                            break;
                                        case"clip-rect":
                                            d = [];
                                            var bc = 4;
                                            while (bc--) {
                                                d[bc] = +ba[a8][bc] + S * a7 * a3[a8][bc];
                                            }
                                            break;
                                    }
                                    break;
                            }
                            a4[a8] = d;
                        }
                    }
                    aX.attr(a4);
                    aX._run && aX._run.call(aX);
                } else {
                    (a2.x || a2.y) && aX.translate(-a2.x, -a2.y);
                    E.scale && (E.scale = E.scale + ap);
                    aX.attr(E);
                    delete H[a9];
                    H[m]--;
                    aX.in_animation = null;
                    al.is(R, "function") && R.call(aX);
                }
                be.prev = aW;
            }
        }
        al.svg && aX.paper.safari();
        H[m] && setTimeout(aN);
    }, B = function(d) {
        return d > 255 ? 255 : (d < 0 ? 0 : d);
    }, t = function(d, i) {
        if (d == null) {
            return{x: this._.tx, y: this._.ty, toString: u};
        }
        this._.tx += +d;
        this._.ty += +i;
        switch (this.type) {
            case"circle":
            case"ellipse":
                this.attr({cx: +d + this.attrs.cx, cy: +i + this.attrs.cy});
                break;
            case"rect":
            case"image":
            case"text":
                this.attr({x: +d + this.attrs.x, y: +i + this.attrs.y});
                break;
            case"path":
                var e = ab(this.attrs.path);
                e[0][1] += +d;
                e[0][2] += +i;
                this.attr({path: e});
                break;
        }
        return this;
    };
    au[aU].animateWith = function(e, i, d, R, E) {
        H[e.id] && (i.start = H[e.id].start);
        return this.animate(i, d, R, E);
    };
    au[aU].onAnimation = function(d) {
        this._run = d || null;
        return this;
    };
    au[aU].animate = function(R, d, a1, a7) {
        if (al.is(a1, "function") || !a1) {
            a7 = a1 || null;
        }
        var a2 = {}, a3 = {}, a4 = {};
        for (var a0 in R) {
            if (R[O](a0)) {
                if (X[O](a0)) {
                    a2[a0] = this.attr(a0);
                    (a2[a0] == null) && (a2[a0] = j[a0]);
                    a3[a0] = R[a0];
                    switch (X[a0]) {
                        case"number":
                            a4[a0] = (a3[a0] - a2[a0]) / d;
                            break;
                        case"colour":
                            a2[a0] = al.getRGB(a2[a0]);
                            var aY = al.getRGB(a3[a0]);
                            a4[a0] = {r: (aY.r - a2[a0].r) / d, g: (aY.g - a2[a0].g) / d, b: (aY.b - a2[a0].b) / d};
                            break;
                        case"path":
                            var e = G(a2[a0], a3[a0]);
                            a2[a0] = e[0];
                            var E = e[1];
                            a4[a0] = [];
                            for (var aX = 0, a6 = a2[a0][m]; aX < a6; aX++) {
                                a4[a0][aX] = [0];
                                for (var S = 1, aZ = a2[a0][aX][m]; S < aZ; S++) {
                                    a4[a0][aX][S] = (E[aX][S] - a2[a0][aX][S]) / d;
                                }
                            }
                            break;
                        case"csv":
                            var a5 = (R[a0] + ap)[z](a), aW = (a2[a0] + ap)[z](a);
                            switch (a0) {
                                case"translation":
                                    a2[a0] = [0, 0];
                                    a4[a0] = [a5[0] / d, a5[1] / d];
                                    break;
                                case"rotation":
                                    a2[a0] = (aW[1] == a5[1] && aW[2] == a5[2]) ? aW : [0, a5[1], a5[2]];
                                    a4[a0] = [(a5[0] - a2[a0][0]) / d, 0, 0];
                                    break;
                                case"scale":
                                    R[a0] = a5;
                                    a2[a0] = (a2[a0] + ap)[z](a);
                                    a4[a0] = [(a5[0] - a2[a0][0]) / d, (a5[1] - a2[a0][1]) / d, 0, 0];
                                    break;
                                case"clip-rect":
                                    a2[a0] = (a2[a0] + ap)[z](a);
                                    a4[a0] = [];
                                    var aX = 4;
                                    while (aX--) {
                                        a4[a0][aX] = (a5[aX] - a2[a0][aX]) / d;
                                    }
                                    break;
                            }
                            a3[a0] = a5;
                        }
                }
            }
        }
        this.stop();
        this.in_animation = 1;
        H[this.id] = {start: R.start || +new Date, ms: d, easing: a1, from: a2, diff: a4, to: a3, el: this, callback: a7, t: {x: 0, y: 0}};
        ++H[m] == 1 && aN();
        return this;
    };
    au[aU].stop = function() {
        H[this.id] && H[m]--;
        delete H[this.id];
        return this;
    };
    au[aU].translate = function(d, e) {
        return this.attr({translation: d + " " + e});
    };
    au[aU][aw] = function() {
        return"Rapha\xebl\u2019s object";
    };
    al.ae = H;
    var P = function(d) {
        this.items = [];
        this[m] = 0;
        if (d) {
            for (var e = 0, E = d[m]; e < E; e++) {
                if (d[e] && (d[e].constructor == au || d[e].constructor == P)) {
                    this[this.items[m]] = this.items[this.items[m]] = d[e];
                    this[m]++;
                }
            }
        }
    };
    P[aU][f] = function() {
        var R, d;
        for (var e = 0, E = arguments[m]; e < E; e++) {
            R = arguments[e];
            if (R && (R.constructor == au || R.constructor == P)) {
                d = this.items[m];
                this[d] = this.items[d] = R;
                this[m]++;
            }
        }
        return this;
    };
    P[aU].pop = function() {
        delete this[this[m]--];
        return this.items.pop();
    };
    for (var y in au[aU]) {
        if (au[aU][O](y)) {
            P[aU][y] = (function(d) {
                return function() {
                    for (var e = 0, E = this.items[m]; e < E; e++) {
                        this.items[e][d][aS](this.items[e], arguments);
                    }
                    return this;
                };
            })(y);
        }
    }
    P[aU].attr = function(e, aW) {
        if (e && al.is(e, "array") && al.is(e[0], "object")) {
            for (var d = 0, S = e[m]; d < S; d++) {
                this.items[d].attr(e[d]);
            }
        } else {
            for (var E = 0, R = this.items[m]; E < R; E++) {
                this.items[E].attr[aS](this.items[E], arguments);
            }
        }
        return this;
    };
    P[aU].animate = function(S, e, aY, aX) {
        (al.is(aY, "function") || !aY) && (aX = aY || null);
        var d = this.items[m], E = d, aW = this, R;
        aX && (R = function() {
            !--d && aX.call(aW);
        });
        this.items[--E].animate(S, e, aY || R, R);
        while (E--) {
            this.items[E].animateWith(this.items[d - 1], S, e, aY || R, R);
        }
        return this;
    };
    P[aU].insertAfter = function(e) {
        var d = this.items[m];
        while (d--) {
            this.items[d].insertAfter(e);
        }
        return this;
    };
    P[aU].getBBox = function() {
        var d = [], aW = [], e = [], R = [];
        for (var E = this.items[m]; E--; ) {
            var S = this.items[E].getBBox();
            d[f](S.x);
            aW[f](S.y);
            e[f](S.x + S.width);
            R[f](S.y + S.height);
        }
        d = aE[aS](0, d);
        aW = aE[aS](0, aW);
        return{x: d, y: aW, width: g[aS](0, e) - d, height: g[aS](0, R) - aW};
    };
    al.registerFont = function(e) {
        if (!e.face) {
            return e;
        }
        this.fonts = this.fonts || {};
        var E = {w: e.w, face: {}, glyphs: {}}, i = e.face["font-family"];
        for (var aW in e.face) {
            if (e.face[O](aW)) {
                E.face[aW] = e.face[aW];
            }
        }
        if (this.fonts[i]) {
            this.fonts[i][f](E);
        } else {
            this.fonts[i] = [E];
        }
        if (!e.svg) {
            E.face["units-per-em"] = F(e.face["units-per-em"], 10);
            for (var R in e.glyphs) {
                if (e.glyphs[O](R)) {
                    var S = e.glyphs[R];
                    E.glyphs[R] = {w: S.w, k: {}, d: S.d && "M" + S.d[aL](/[mlcxtrv]/g, function(aX) {
                            return{l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[aX] || "M";
                        }) + "z"};
                    if (S.k) {
                        for (var d in S.k) {
                            if (S[O](d)) {
                                E.glyphs[R].k[d] = S.k[d];
                            }
                        }
                    }
                }
            }
        }
        return e;
    };
    aP[aU].getFont = function(aY, aZ, e, R) {
        R = R || "normal";
        e = e || "normal";
        aZ = +aZ || {normal: 400, bold: 700, lighter: 300, bolder: 800}[aZ] || 400;
        var S = al.fonts[aY];
        if (!S) {
            var E = new RegExp("(^|\\s)" + aY[aL](/[^\w\d\s+!~.:_-]/g, ap) + "(\\s|$)", "i");
            for (var d in al.fonts) {
                if (al.fonts[O](d)) {
                    if (E.test(d)) {
                        S = al.fonts[d];
                        break;
                    }
                }
            }
        }
        var aW;
        if (S) {
            for (var aX = 0, a0 = S[m]; aX < a0; aX++) {
                aW = S[aX];
                if (aW.face["font-weight"] == aZ && (aW.face["font-style"] == e || !aW.face["font-style"]) && aW.face["font-stretch"] == R) {
                    break;
                }
            }
        }
        return aW;
    };
    aP[aU].print = function(R, E, d, aX, aY, a7) {
        a7 = a7 || "middle";
        var a3 = this.set(), a6 = (d + ap)[z](ap), a4 = 0, a0 = ap, a8;
        al.is(aX, "string") && (aX = this.getFont(aX));
        if (aX) {
            a8 = (aY || 16) / aX.face["units-per-em"];
            var e = aX.face.bbox.split(a), aW = +e[0], aZ = +e[1] + (a7 == "baseline" ? e[3] - e[1] + (+aX.face.descent) : (e[3] - e[1]) / 2);
            for (var a2 = 0, S = a6[m]; a2 < S; a2++) {
                var a1 = a2 && aX.glyphs[a6[a2 - 1]] || {}, a5 = aX.glyphs[a6[a2]];
                a4 += a2 ? (a1.w || aX.w) + (a1.k && a1.k[a6[a2]] || 0) : 0;
                a5 && a5.d && a3[f](this.path(a5.d).attr({fill: "#000", stroke: "none", translation: [a4, 0]}));
            }
            a3.scale(a8, a8, aW, aZ).translate(R - aW, E - aZ);
        }
        return a3;
    };
    al.format = function(i) {
        var e = al.is(arguments[1], "array") ? [0][aO](arguments[1]) : arguments, d = /\{(\d+)\}/g;
        i && al.is(i, "string") && e[m] - 1 && (i = i[aL](d, function(R, E) {
            return e[++E] == null ? ap : e[E];
        }));
        return i || ap;
    };
    al.ninja = function() {
        var i = aq.Raphael, d;
        if (l.was) {
            aq.Raphael = l.is;
        } else {
            try {
                delete aq.Raphael;
            } catch (E) {
                aq.Raphael = d;
            }
        }
        return i;
    };
    al.el = au[aU];
    return al;
})();

//Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
//var linePath = this.path("M" + x1 + "," + y1);
//// assuming path is at least 5 points length
//var point = linePath.getPointAtLength(linePath.getTotalLength()-5);
//var angle = point.alpha+180;
//var arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2 - size) + " " + (y2 - size) + " L" + (x2 - size) + " " + (y2 + size) + " L" + x2 + " " + y2 ).attr("fill","black").rotate((angle),x2,y2);
//return [linePath,arrowPath];
//};

Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
    var angle = Math.atan2(x1-x2,y2-y1);
    angle = (angle / (2 * Math.PI)) * 360;
    var arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2 - size) + " " + (y2 - size) + " L" + (x2 - size) + " " + (y2 + size) + " L" + x2 + " " + y2 ).attr("fill","black").rotate((90+angle),x2,y2);
    var linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);
    return [linePath,arrowPath];
};

Raphael.fn.dblarrow = function(x, y) {
    return this.path(["M", x, y] + "m-10-10l20,0 0-6 10,16 -10,16 0-6 -20,0 0,6 -10-16 10-16z").attr({
        stroke: "none",
        opacity: 1
    });
};