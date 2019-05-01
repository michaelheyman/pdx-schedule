(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done(elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done(elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done(elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? elm$http$Http$GoodStatus_ : elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return elm$core$Dict$empty;
	}

	var headers = elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? elm$core$Maybe$Just(event.total) : elm$core$Maybe$Nothing
		}))));
	});
}



// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var author$project$Model$Course = F4(
	function (id, name, number, discipline) {
		return {discipline: discipline, id: id, name: name, number: number};
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm_community$json_extra$Json$Decode$Extra$andMap = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var author$project$Decode$courseDecoder = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'discipline', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'number', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
				elm$json$Json$Decode$succeed(author$project$Model$Course)))));
var author$project$Model$Instructor = F7(
	function (id, fullName, firstName, lastName, rating, url, timestamp) {
		return {firstName: firstName, fullName: fullName, id: id, lastName: lastName, rating: rating, timestamp: timestamp, url: url};
	});
var elm$json$Json$Decode$float = _Json_decodeFloat;
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$Decode$instructorDecoder = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'timestamp', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		elm$json$Json$Decode$maybe(
			A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string)),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			elm$json$Json$Decode$maybe(
				A2(elm$json$Json$Decode$field, 'rating', elm$json$Json$Decode$float)),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				elm$json$Json$Decode$maybe(
					A2(elm$json$Json$Decode$field, 'lastName', elm$json$Json$Decode$string)),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					elm$json$Json$Decode$maybe(
						A2(elm$json$Json$Decode$field, 'firstName', elm$json$Json$Decode$string)),
					A2(
						elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(elm$json$Json$Decode$field, 'fullName', elm$json$Json$Decode$string),
						A2(
							elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
							elm$json$Json$Decode$succeed(author$project$Model$Instructor))))))));
var author$project$Model$Term = F2(
	function (date, description) {
		return {date: date, description: description};
	});
var author$project$Decode$termDecoder = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'description', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'date', elm$json$Json$Decode$int),
		elm$json$Json$Decode$succeed(author$project$Model$Term)));
var author$project$Model$Class = F9(
	function (id, credits, days, time, crn, timestamp, course, instructor, term) {
		return {course: course, credits: credits, crn: crn, days: days, id: id, instructor: instructor, term: term, time: time, timestamp: timestamp};
	});
var author$project$Decode$classDecoder = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'term', author$project$Decode$termDecoder),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		elm$json$Json$Decode$maybe(
			A2(elm$json$Json$Decode$field, 'instructor', author$project$Decode$instructorDecoder)),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'course', author$project$Decode$courseDecoder),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'timestamp', elm$json$Json$Decode$string),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(elm$json$Json$Decode$field, 'crn', elm$json$Json$Decode$int),
					A2(
						elm_community$json_extra$Json$Decode$Extra$andMap,
						elm$json$Json$Decode$maybe(
							A2(elm$json$Json$Decode$field, 'time', elm$json$Json$Decode$string)),
						A2(
							elm_community$json_extra$Json$Decode$Extra$andMap,
							elm$json$Json$Decode$maybe(
								A2(elm$json$Json$Decode$field, 'days', elm$json$Json$Decode$string)),
							A2(
								elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(elm$json$Json$Decode$field, 'credits', elm$json$Json$Decode$int),
								A2(
									elm_community$json_extra$Json$Decode$Extra$andMap,
									A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
									elm$json$Json$Decode$succeed(author$project$Model$Class))))))))));
var elm$json$Json$Decode$list = _Json_decodeList;
var author$project$Decode$classListDecoder = elm$json$Json$Decode$list(author$project$Decode$classDecoder);
var author$project$Model$GotClassList = function (a) {
	return {$: 'GotClassList', a: a};
};
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var elm$http$Http$Timeout_ = {$: 'Timeout_'};
var elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			elm$core$Basics$identity,
			A2(elm$core$Basics$composeR, toResult, toMsg));
	});
var elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm$http$Http$NetworkError = {$: 'NetworkError'};
var elm$http$Http$Timeout = {$: 'Timeout'};
var elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return elm$core$Result$Err(elm$http$Http$Timeout);
			case 'NetworkError_':
				return elm$core$Result$Err(elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					elm$core$Result$mapError,
					elm$http$Http$BadBody,
					toResult(body));
		}
	});
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			elm$http$Http$expectStringResponse,
			toMsg,
			elm$http$Http$resolve(
				function (string) {
					return A2(
						elm$core$Result$mapError,
						elm$json$Json$Decode$errorToString,
						A2(elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var elm$http$Http$emptyBody = _Http_emptyBody;
var elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var elm$http$Http$init = elm$core$Task$succeed(
	A2(elm$http$Http$State, elm$core$Dict$empty, _List_Nil));
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Process$kill = _Scheduler_kill;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _n2 = A2(elm$core$Dict$get, tracker, reqs);
					if (_n2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _n2.a;
						return A2(
							elm$core$Task$andThen,
							function (_n3) {
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2(elm$core$Dict$remove, tracker, reqs));
							},
							elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						elm$core$Task$andThen,
						function (pid) {
							var _n4 = req.tracker;
							if (_n4.$ === 'Nothing') {
								return A3(elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _n4.a;
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3(elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			elm$core$Task$andThen,
			function (reqs) {
				return elm$core$Task$succeed(
					A2(elm$http$Http$State, reqs, subs));
			},
			A3(elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _n0) {
		var actualTracker = _n0.a;
		var toMsg = _n0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? elm$core$Maybe$Just(
			A2(
				elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : elm$core$Maybe$Nothing;
	});
var elm$http$Http$onSelfMsg = F3(
	function (router, _n0, state) {
		var tracker = _n0.a;
		var progress = _n0.b;
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$filterMap,
					A3(elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var elm$http$Http$subMap = F2(
	function (func, _n0) {
		var tracker = _n0.a;
		var toMsg = _n0.b;
		return A2(
			elm$http$Http$MySub,
			tracker,
			A2(elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager(elm$http$Http$init, elm$http$Http$onEffects, elm$http$Http$onSelfMsg, elm$http$Http$cmdMap, elm$http$Http$subMap);
var elm$http$Http$command = _Platform_leaf('Http');
var elm$http$Http$subscription = _Platform_leaf('Http');
var elm$http$Http$request = function (r) {
	return elm$http$Http$command(
		elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var elm$http$Http$get = function (r) {
	return elm$http$Http$request(
		{body: elm$http$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: elm$core$Maybe$Nothing, tracker: elm$core$Maybe$Nothing, url: r.url});
};
var author$project$Decode$getClassList = function (param) {
	return elm$http$Http$get(
		{
			expect: A2(elm$http$Http$expectJson, author$project$Model$GotClassList, author$project$Decode$classListDecoder),
			url: '/api/classes/' + param
		});
};
var author$project$Decode$termListDecoder = elm$json$Json$Decode$list(author$project$Decode$termDecoder);
var author$project$Model$GotTermList = function (a) {
	return {$: 'GotTermList', a: a};
};
var author$project$Decode$getTermList = elm$http$Http$get(
	{
		expect: A2(elm$http$Http$expectJson, author$project$Model$GotTermList, author$project$Decode$termListDecoder),
		url: '/api/terms'
	});
var author$project$Model$Loading = {$: 'Loading'};
var author$project$Model$NavbarMsg = function (a) {
	return {$: 'NavbarMsg', a: a};
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var rundis$elm_bootstrap$Bootstrap$Dropdown$Closed = {$: 'Closed'};
var rundis$elm_bootstrap$Bootstrap$Dropdown$State = function (a) {
	return {$: 'State', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$Area = F4(
	function (top, left, width, height) {
		return {height: height, left: left, top: top, width: width};
	});
var rundis$elm_bootstrap$Bootstrap$Dropdown$initialState = rundis$elm_bootstrap$Bootstrap$Dropdown$State(
	{
		menuSize: A4(rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$Area, 0, 0, 0, 0),
		status: rundis$elm_bootstrap$Bootstrap$Dropdown$Closed,
		toggleSize: A4(rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$Area, 0, 0, 0, 0)
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$Hidden = {$: 'Hidden'};
var rundis$elm_bootstrap$Bootstrap$Navbar$State = function (a) {
	return {$: 'State', a: a};
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var rundis$elm_bootstrap$Bootstrap$Navbar$mapState = F2(
	function (mapper, _n0) {
		var state = _n0.a;
		return rundis$elm_bootstrap$Bootstrap$Navbar$State(
			mapper(state));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$initWindowSize = F2(
	function (toMsg, state) {
		return A2(
			elm$core$Task$perform,
			function (vp) {
				return toMsg(
					A2(
						rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
						function (s) {
							return _Utils_update(
								s,
								{
									windowWidth: elm$core$Maybe$Just(vp.viewport.width)
								});
						},
						state));
			},
			elm$browser$Browser$Dom$getViewport);
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$initialState = function (toMsg) {
	var state = rundis$elm_bootstrap$Bootstrap$Navbar$State(
		{dropdowns: elm$core$Dict$empty, height: elm$core$Maybe$Nothing, visibility: rundis$elm_bootstrap$Bootstrap$Navbar$Hidden, windowWidth: elm$core$Maybe$Nothing});
	return _Utils_Tuple2(
		state,
		A2(rundis$elm_bootstrap$Bootstrap$Navbar$initWindowSize, toMsg, state));
};
var author$project$Main$init = function (_n0) {
	var _n1 = rundis$elm_bootstrap$Bootstrap$Navbar$initialState(author$project$Model$NavbarMsg);
	var navbarState = _n1.a;
	return _Utils_Tuple2(
		{classes: _List_Nil, currentDiscipline: 'Computer Science', disciplines: _List_Nil, dropdownState: rundis$elm_bootstrap$Bootstrap$Dropdown$initialState, loadingValue: 10, navbarState: navbarState, response: author$project$Model$Loading, search: '', term: '', termSearch: 'latest', terms: _List_Nil},
		elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					author$project$Decode$getClassList('latest'),
					author$project$Decode$getTermList
				])));
};
var author$project$Model$DropdownMsg = function (a) {
	return {$: 'DropdownMsg', a: a};
};
var author$project$Model$IncrementProgressBar = function (a) {
	return {$: 'IncrementProgressBar', a: a};
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var elm$time$Time$init = elm$core$Task$succeed(
	A2(elm$time$Time$State, elm$core$Dict$empty, elm$core$Dict$empty));
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm$core$Dict$get, interval, state);
		if (_n1.$ === 'Nothing') {
			return A3(
				elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _n1.a;
			return A3(
				elm$core$Dict$insert,
				interval,
				A2(elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$setInterval = _Time_setInterval;
var elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = elm$core$Process$spawn(
				A2(
					elm$time$Time$setInterval,
					interval,
					A2(elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					elm$time$Time$spawnHelp,
					router,
					rest,
					A3(elm$core$Dict$insert, interval, id, processes));
			};
			return A2(elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var elm$time$Time$onEffects = F3(
	function (router, subs, _n0) {
		var processes = _n0.processes;
		var rightStep = F3(
			function (_n6, id, _n7) {
				var spawns = _n7.a;
				var existing = _n7.b;
				var kills = _n7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						elm$core$Task$andThen,
						function (_n5) {
							return kills;
						},
						elm$core$Process$kill(id)));
			});
		var newTaggers = A3(elm$core$List$foldl, elm$time$Time$addMySub, elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _n4) {
				var spawns = _n4.a;
				var existing = _n4.b;
				var kills = _n4.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _n3) {
				var spawns = _n3.a;
				var existing = _n3.b;
				var kills = _n3.c;
				return _Utils_Tuple3(
					spawns,
					A3(elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _n1 = A6(
			elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				elm$core$Dict$empty,
				elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _n1.a;
		var existingDict = _n1.b;
		var killTask = _n1.c;
		return A2(
			elm$core$Task$andThen,
			function (newProcesses) {
				return elm$core$Task$succeed(
					A2(elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _n0 = A2(elm$core$Dict$get, interval, state.taggers);
		if (_n0.$ === 'Nothing') {
			return elm$core$Task$succeed(state);
		} else {
			var taggers = _n0.a;
			var tellTaggers = function (time) {
				return elm$core$Task$sequence(
					A2(
						elm$core$List$map,
						function (tagger) {
							return A2(
								elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$succeed(state);
				},
				A2(elm$core$Task$andThen, tellTaggers, elm$time$Time$now));
		}
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$time$Time$subMap = F2(
	function (f, _n0) {
		var interval = _n0.a;
		var tagger = _n0.b;
		return A2(
			elm$time$Time$Every,
			interval,
			A2(elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager(elm$time$Time$init, elm$time$Time$onEffects, elm$time$Time$onSelfMsg, 0, elm$time$Time$subMap);
var elm$time$Time$subscription = _Platform_leaf('Time');
var elm$time$Time$every = F2(
	function (interval, tagger) {
		return elm$time$Time$subscription(
			A2(elm$time$Time$Every, interval, tagger));
	});
var elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var elm$browser$Browser$AnimationManager$init = elm$core$Task$succeed(
	A3(elm$browser$Browser$AnimationManager$State, _List_Nil, elm$core$Maybe$Nothing, 0));
var elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _n0) {
		var request = _n0.request;
		var oldTime = _n0.oldTime;
		var _n1 = _Utils_Tuple2(request, subs);
		if (_n1.a.$ === 'Nothing') {
			if (!_n1.b.b) {
				var _n2 = _n1.a;
				return elm$browser$Browser$AnimationManager$init;
			} else {
				var _n4 = _n1.a;
				return A2(
					elm$core$Task$andThen,
					function (pid) {
						return A2(
							elm$core$Task$andThen,
							function (time) {
								return elm$core$Task$succeed(
									A3(
										elm$browser$Browser$AnimationManager$State,
										subs,
										elm$core$Maybe$Just(pid),
										time));
							},
							elm$browser$Browser$AnimationManager$now);
					},
					elm$core$Process$spawn(
						A2(
							elm$core$Task$andThen,
							elm$core$Platform$sendToSelf(router),
							elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_n1.b.b) {
				var pid = _n1.a.a;
				return A2(
					elm$core$Task$andThen,
					function (_n3) {
						return elm$browser$Browser$AnimationManager$init;
					},
					elm$core$Process$kill(pid));
			} else {
				return elm$core$Task$succeed(
					A3(elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _n0) {
		var subs = _n0.subs;
		var oldTime = _n0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					elm$core$Platform$sendToApp,
					router,
					tagger(
						elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			elm$core$Task$andThen,
			function (pid) {
				return A2(
					elm$core$Task$andThen,
					function (_n1) {
						return elm$core$Task$succeed(
							A3(
								elm$browser$Browser$AnimationManager$State,
								subs,
								elm$core$Maybe$Just(pid),
								newTime));
					},
					elm$core$Task$sequence(
						A2(elm$core$List$map, send, subs)));
			},
			elm$core$Process$spawn(
				A2(
					elm$core$Task$andThen,
					elm$core$Platform$sendToSelf(router),
					elm$browser$Browser$AnimationManager$rAF)));
	});
var elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return elm$browser$Browser$AnimationManager$Time(
				A2(elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return elm$browser$Browser$AnimationManager$Delta(
				A2(elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager(elm$browser$Browser$AnimationManager$init, elm$browser$Browser$AnimationManager$onEffects, elm$browser$Browser$AnimationManager$onSelfMsg, 0, elm$browser$Browser$AnimationManager$subMap);
var elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var elm$browser$Browser$AnimationManager$onAnimationFrame = function (tagger) {
	return elm$browser$Browser$AnimationManager$subscription(
		elm$browser$Browser$AnimationManager$Time(tagger));
};
var elm$browser$Browser$Events$onAnimationFrame = elm$browser$Browser$AnimationManager$onAnimationFrame;
var elm$browser$Browser$Events$Document = {$: 'Document'};
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.key;
		var event = _n0.event;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onClick = A2(elm$browser$Browser$Events$on, elm$browser$Browser$Events$Document, 'click');
var rundis$elm_bootstrap$Bootstrap$Dropdown$ListenClicks = {$: 'ListenClicks'};
var rundis$elm_bootstrap$Bootstrap$Dropdown$updateStatus = F2(
	function (status, _n0) {
		var stateRec = _n0.a;
		return rundis$elm_bootstrap$Bootstrap$Dropdown$State(
			_Utils_update(
				stateRec,
				{status: status}));
	});
var rundis$elm_bootstrap$Bootstrap$Dropdown$subscriptions = F2(
	function (state, toMsg) {
		var status = state.a.status;
		switch (status.$) {
			case 'Open':
				return elm$browser$Browser$Events$onAnimationFrame(
					function (_n1) {
						return toMsg(
							A2(rundis$elm_bootstrap$Bootstrap$Dropdown$updateStatus, rundis$elm_bootstrap$Bootstrap$Dropdown$ListenClicks, state));
					});
			case 'ListenClicks':
				return elm$browser$Browser$Events$onClick(
					elm$json$Json$Decode$succeed(
						toMsg(
							A2(rundis$elm_bootstrap$Bootstrap$Dropdown$updateStatus, rundis$elm_bootstrap$Bootstrap$Dropdown$Closed, state))));
			default:
				return elm$core$Platform$Sub$none;
		}
	});
var elm$browser$Browser$Events$Window = {$: 'Window'};
var elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		elm$browser$Browser$Events$on,
		elm$browser$Browser$Events$Window,
		'resize',
		A2(
			elm$json$Json$Decode$field,
			'target',
			A3(
				elm$json$Json$Decode$map2,
				func,
				A2(elm$json$Json$Decode$field, 'innerWidth', elm$json$Json$Decode$int),
				A2(elm$json$Json$Decode$field, 'innerHeight', elm$json$Json$Decode$int))));
};
var rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingDown = {$: 'AnimatingDown'};
var rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingUp = {$: 'AnimatingUp'};
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2(elm$core$Dict$map, func, left),
				A2(elm$core$Dict$map, func, right));
		}
	});
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$Closed = {$: 'Closed'};
var rundis$elm_bootstrap$Bootstrap$Navbar$ListenClicks = {$: 'ListenClicks'};
var rundis$elm_bootstrap$Bootstrap$Navbar$Open = {$: 'Open'};
var rundis$elm_bootstrap$Bootstrap$Navbar$dropdownSubscriptions = F2(
	function (state, toMsg) {
		var dropdowns = state.a.dropdowns;
		var updDropdowns = A2(
			elm$core$Dict$map,
			F2(
				function (_n2, status) {
					switch (status.$) {
						case 'Open':
							return rundis$elm_bootstrap$Bootstrap$Navbar$ListenClicks;
						case 'ListenClicks':
							return rundis$elm_bootstrap$Bootstrap$Navbar$Closed;
						default:
							return rundis$elm_bootstrap$Bootstrap$Navbar$Closed;
					}
				}),
			dropdowns);
		var updState = A2(
			rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
			function (s) {
				return _Utils_update(
					s,
					{dropdowns: updDropdowns});
			},
			state);
		var needsSub = function (s) {
			return A2(
				elm$core$List$any,
				function (_n1) {
					var status = _n1.b;
					return _Utils_eq(status, s);
				},
				elm$core$Dict$toList(dropdowns));
		};
		return elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					needsSub(rundis$elm_bootstrap$Bootstrap$Navbar$Open) ? elm$browser$Browser$Events$onAnimationFrame(
					function (_n0) {
						return toMsg(updState);
					}) : elm$core$Platform$Sub$none,
					needsSub(rundis$elm_bootstrap$Bootstrap$Navbar$ListenClicks) ? elm$browser$Browser$Events$onClick(
					elm$json$Json$Decode$succeed(
						toMsg(updState))) : elm$core$Platform$Sub$none
				]));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$subscriptions = F2(
	function (state, toMsg) {
		var visibility = state.a.visibility;
		var updState = function (v) {
			return A2(
				rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
				function (s) {
					return _Utils_update(
						s,
						{visibility: v});
				},
				state);
		};
		return elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					function () {
					switch (visibility.$) {
						case 'StartDown':
							return elm$browser$Browser$Events$onAnimationFrame(
								function (_n1) {
									return toMsg(
										updState(rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingDown));
								});
						case 'StartUp':
							return elm$browser$Browser$Events$onAnimationFrame(
								function (_n2) {
									return toMsg(
										updState(rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingUp));
								});
						default:
							return elm$core$Platform$Sub$none;
					}
				}(),
					elm$browser$Browser$Events$onResize(
					F2(
						function (x, _n3) {
							return toMsg(
								A2(
									rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
									function (s) {
										return _Utils_update(
											s,
											{
												windowWidth: elm$core$Maybe$Just(x)
											});
									},
									state));
						})),
					A2(rundis$elm_bootstrap$Bootstrap$Navbar$dropdownSubscriptions, state, toMsg)
				]));
	});
var author$project$Subscriptions$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2(rundis$elm_bootstrap$Bootstrap$Dropdown$subscriptions, model.dropdownState, author$project$Model$DropdownMsg),
				function () {
				var _n0 = model.response;
				if (_n0.$ === 'Loading') {
					return A2(elm$time$Time$every, 10, author$project$Model$IncrementProgressBar);
				} else {
					return elm$core$Platform$Sub$none;
				}
			}(),
				A2(rundis$elm_bootstrap$Bootstrap$Navbar$subscriptions, model.navbarState, author$project$Model$NavbarMsg)
			]));
};
var author$project$Model$Failure = function (a) {
	return {$: 'Failure', a: a};
};
var author$project$Model$Success = {$: 'Success'};
var author$project$Model$NoOp = {$: 'NoOp'};
var elm$browser$Browser$Dom$setViewport = _Browser_setViewport;
var author$project$Update$resetViewport = A2(
	elm$core$Task$perform,
	function (_n0) {
		return author$project$Model$NoOp;
	},
	A2(elm$browser$Browser$Dom$setViewport, 0, 0));
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm$core$Set$empty = elm$core$Set$Set_elm_builtin(elm$core$Dict$empty);
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm$core$Set$Set_elm_builtin(
			A3(elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2(elm$core$Set$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2(elm$core$Set$insert, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2(elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$unique = function (list) {
	return A4(elm_community$list_extra$List$Extra$uniqueHelp, elm$core$Basics$identity, elm$core$Set$empty, list, _List_Nil);
};
var author$project$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'GotClassList':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var value = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								classes: value,
								disciplines: elm_community$list_extra$List$Extra$unique(
									A2(
										elm$core$List$map,
										A2(
											elm$core$Basics$composeR,
											function ($) {
												return $.course;
											},
											function ($) {
												return $.discipline;
											}),
										value)),
								response: author$project$Model$Success,
								term: A2(
									elm$core$Maybe$withDefault,
									'',
									elm$core$List$head(
										A2(
											elm$core$List$map,
											A2(
												elm$core$Basics$composeR,
												function ($) {
													return $.term;
												},
												function ($) {
													return $.description;
												}),
											value)))
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var error = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								classes: _List_Nil,
								disciplines: _List_Nil,
								response: author$project$Model$Failure(error)
							}),
						elm$core$Platform$Cmd$none);
				}
			case 'GotTermList':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var value = result.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{terms: value}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{terms: _List_Nil}),
						elm$core$Platform$Cmd$none);
				}
			case 'MakeApiRequest':
				var param = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{termSearch: param}),
					author$project$Decode$getClassList(param));
			case 'IncrementProgressBar':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{loadingValue: model.loadingValue + 75}),
					elm$core$Platform$Cmd$none);
			case 'Search':
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{search: str}),
					elm$core$Platform$Cmd$none);
			case 'DisciplineFilter':
				var discipline = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{currentDiscipline: discipline}),
					author$project$Update$resetViewport);
			case 'NavbarMsg':
				var state = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{navbarState: state}),
					elm$core$Platform$Cmd$none);
			case 'DropdownMsg':
				var state = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{dropdownState: state}),
					elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Model$MakeApiRequest = function (a) {
	return {$: 'MakeApiRequest', a: a};
};
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring = function (a) {
	return {$: 'Coloring', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Internal$Button$Light = {$: 'Light'};
var rundis$elm_bootstrap$Bootstrap$Internal$Button$Roled = function (a) {
	return {$: 'Roled', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Button$light = rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring(
	rundis$elm_bootstrap$Bootstrap$Internal$Button$Roled(rundis$elm_bootstrap$Bootstrap$Internal$Button$Light));
var rundis$elm_bootstrap$Bootstrap$Internal$Button$Outlined = function (a) {
	return {$: 'Outlined', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Button$outlineLight = rundis$elm_bootstrap$Bootstrap$Internal$Button$Coloring(
	rundis$elm_bootstrap$Bootstrap$Internal$Button$Outlined(rundis$elm_bootstrap$Bootstrap$Internal$Button$Light));
var rundis$elm_bootstrap$Bootstrap$General$Internal$SM = {$: 'SM'};
var rundis$elm_bootstrap$Bootstrap$Internal$Button$Size = function (a) {
	return {$: 'Size', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Button$small = rundis$elm_bootstrap$Bootstrap$Internal$Button$Size(rundis$elm_bootstrap$Bootstrap$General$Internal$SM);
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var rundis$elm_bootstrap$Bootstrap$Dropdown$DropdownItem = function (a) {
	return {$: 'DropdownItem', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Dropdown$buttonItem = F2(
	function (attributes, children) {
		return rundis$elm_bootstrap$Bootstrap$Dropdown$DropdownItem(
			A2(
				elm$html$Html$button,
				_Utils_ap(
					_List_fromArray(
						[
							elm$html$Html$Attributes$type_('button'),
							elm$html$Html$Attributes$class('dropdown-item')
						]),
					attributes),
				children));
	});
var elm$html$Html$div = _VirtualDom_node('div');
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$html$Html$Attributes$classList = function (classes) {
	return elm$html$Html$Attributes$class(
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				elm$core$Tuple$first,
				A2(elm$core$List$filter, elm$core$Tuple$second, classes))));
};
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var rundis$elm_bootstrap$Bootstrap$Dropdown$dropDir = function (maybeDir) {
	var toAttrs = function (dir) {
		return _List_fromArray(
			[
				elm$html$Html$Attributes$class(
				'drop' + function () {
					if (dir.$ === 'Dropleft') {
						return 'left';
					} else {
						return 'right';
					}
				}())
			]);
	};
	return A2(
		elm$core$Maybe$withDefault,
		_List_Nil,
		A2(elm$core$Maybe$map, toAttrs, maybeDir));
};
var rundis$elm_bootstrap$Bootstrap$Dropdown$dropdownAttributes = F2(
	function (status, config) {
		return _Utils_ap(
			_List_fromArray(
				[
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('btn-group', true),
							_Utils_Tuple2(
							'show',
							!_Utils_eq(status, rundis$elm_bootstrap$Bootstrap$Dropdown$Closed)),
							_Utils_Tuple2('dropup', config.isDropUp)
						]))
				]),
			_Utils_ap(
				rundis$elm_bootstrap$Bootstrap$Dropdown$dropDir(config.dropDirection),
				config.attributes));
	});
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$String$fromFloat = _String_fromNumber;
var rundis$elm_bootstrap$Bootstrap$Dropdown$menuStyles = F2(
	function (_n0, config) {
		var status = _n0.a.status;
		var toggleSize = _n0.a.toggleSize;
		var menuSize = _n0.a.menuSize;
		var px = function (n) {
			return elm$core$String$fromFloat(n) + 'px';
		};
		var translate = F3(
			function (x, y, z) {
				return 'translate3d(' + (px(x) + (',' + (px(y) + (',' + (px(z) + ')')))));
			});
		var _default = _List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'top', '0'),
				A2(elm$html$Html$Attributes$style, 'left', '0')
			]);
		var _n1 = _Utils_Tuple2(config.isDropUp, config.dropDirection);
		_n1$0:
		while (true) {
			if (_n1.b.$ === 'Just') {
				if (_n1.b.a.$ === 'Dropright') {
					if (_n1.a) {
						break _n1$0;
					} else {
						var _n2 = _n1.b.a;
						return _default;
					}
				} else {
					if (_n1.a) {
						break _n1$0;
					} else {
						var _n3 = _n1.b.a;
						return _Utils_ap(
							_default,
							_List_fromArray(
								[
									A2(
									elm$html$Html$Attributes$style,
									'transform',
									A3(translate, (-toggleSize.width) - menuSize.width, 0, 0))
								]));
					}
				}
			} else {
				if (_n1.a) {
					break _n1$0;
				} else {
					return _Utils_ap(
						_default,
						_List_fromArray(
							[
								A2(
								elm$html$Html$Attributes$style,
								'transform',
								A3(translate, -toggleSize.width, toggleSize.height, 0))
							]));
				}
			}
		}
		return _Utils_ap(
			_default,
			_List_fromArray(
				[
					A2(
					elm$html$Html$Attributes$style,
					'transform',
					A3(translate, -toggleSize.width, -menuSize.height, 0))
				]));
	});
var rundis$elm_bootstrap$Bootstrap$Dropdown$dropdownMenu = F3(
	function (state, config, items) {
		var status = state.a.status;
		var menuSize = state.a.menuSize;
		var wrapperStyles = _Utils_eq(status, rundis$elm_bootstrap$Bootstrap$Dropdown$Closed) ? _List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'height', '0'),
				A2(elm$html$Html$Attributes$style, 'overflow', 'hidden'),
				A2(elm$html$Html$Attributes$style, 'position', 'relative')
			]) : _List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'position', 'relative')
			]);
		return A2(
			elm$html$Html$div,
			wrapperStyles,
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_Utils_ap(
						_List_fromArray(
							[
								elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('dropdown-menu', true),
										_Utils_Tuple2('dropdown-menu-right', config.hasMenuRight),
										_Utils_Tuple2('show', true)
									]))
							]),
						_Utils_ap(
							A2(rundis$elm_bootstrap$Bootstrap$Dropdown$menuStyles, state, config),
							config.menuAttrs)),
					A2(
						elm$core$List$map,
						function (_n0) {
							var x = _n0.a;
							return x;
						},
						items))
				]));
	});
var rundis$elm_bootstrap$Bootstrap$Dropdown$applyModifier = F2(
	function (option, options) {
		switch (option.$) {
			case 'AlignMenuRight':
				return _Utils_update(
					options,
					{hasMenuRight: true});
			case 'Dropup':
				return _Utils_update(
					options,
					{isDropUp: true});
			case 'Attrs':
				var attrs_ = option.a;
				return _Utils_update(
					options,
					{attributes: attrs_});
			case 'DropToDir':
				var dir = option.a;
				return _Utils_update(
					options,
					{
						dropDirection: elm$core$Maybe$Just(dir)
					});
			default:
				var attrs_ = option.a;
				return _Utils_update(
					options,
					{menuAttrs: attrs_});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Dropdown$defaultOptions = {attributes: _List_Nil, dropDirection: elm$core$Maybe$Nothing, hasMenuRight: false, isDropUp: false, menuAttrs: _List_Nil};
var rundis$elm_bootstrap$Bootstrap$Dropdown$toConfig = function (options) {
	return A3(elm$core$List$foldl, rundis$elm_bootstrap$Bootstrap$Dropdown$applyModifier, rundis$elm_bootstrap$Bootstrap$Dropdown$defaultOptions, options);
};
var rundis$elm_bootstrap$Bootstrap$Dropdown$dropdown = F2(
	function (state, _n0) {
		var status = state.a.status;
		var toggleMsg = _n0.toggleMsg;
		var toggleButton = _n0.toggleButton;
		var items = _n0.items;
		var options = _n0.options;
		var config = rundis$elm_bootstrap$Bootstrap$Dropdown$toConfig(options);
		var _n1 = toggleButton;
		var buttonFn = _n1.a;
		return A2(
			elm$html$Html$div,
			A2(rundis$elm_bootstrap$Bootstrap$Dropdown$dropdownAttributes, status, config),
			_List_fromArray(
				[
					A2(buttonFn, toggleMsg, state),
					A3(rundis$elm_bootstrap$Bootstrap$Dropdown$dropdownMenu, state, config, items)
				]));
	});
var rundis$elm_bootstrap$Bootstrap$Dropdown$DropdownToggle = function (a) {
	return {$: 'DropdownToggle', a: a};
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var rundis$elm_bootstrap$Bootstrap$Dropdown$Open = {$: 'Open'};
var rundis$elm_bootstrap$Bootstrap$Dropdown$nextStatus = function (status) {
	switch (status.$) {
		case 'Open':
			return rundis$elm_bootstrap$Bootstrap$Dropdown$Closed;
		case 'ListenClicks':
			return rundis$elm_bootstrap$Bootstrap$Dropdown$Closed;
		default:
			return rundis$elm_bootstrap$Bootstrap$Dropdown$Open;
	}
};
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$json$Json$Decode$fail = _Json_fail;
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$className = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['className']),
	elm$json$Json$Decode$string);
var rundis$elm_bootstrap$Bootstrap$Dropdown$isToggle = A2(
	elm$json$Json$Decode$andThen,
	function (_class) {
		return A2(elm$core$String$contains, 'dropdown-toggle', _class) ? elm$json$Json$Decode$succeed(true) : elm$json$Json$Decode$succeed(false);
	},
	rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$className);
var rundis$elm_bootstrap$Bootstrap$Dropdown$toggler = F2(
	function (path, decoder) {
		return elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					elm$json$Json$Decode$andThen,
					function (res) {
						return res ? A2(elm$json$Json$Decode$at, path, decoder) : elm$json$Json$Decode$fail('');
					},
					A2(elm$json$Json$Decode$at, path, rundis$elm_bootstrap$Bootstrap$Dropdown$isToggle)),
					A2(
					elm$json$Json$Decode$andThen,
					function (_n0) {
						return A2(
							rundis$elm_bootstrap$Bootstrap$Dropdown$toggler,
							_Utils_ap(
								path,
								_List_fromArray(
									['parentElement'])),
							decoder);
					},
					A2(
						elm$json$Json$Decode$at,
						_Utils_ap(
							path,
							_List_fromArray(
								['parentElement'])),
						rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$className)),
					elm$json$Json$Decode$fail('No toggler found')
				]));
	});
var elm$json$Json$Decode$map3 = _Json_map3;
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetHeight = A2(elm$json$Json$Decode$field, 'offsetHeight', elm$json$Json$Decode$float);
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetWidth = A2(elm$json$Json$Decode$field, 'offsetWidth', elm$json$Json$Decode$float);
var elm$json$Json$Decode$map4 = _Json_map4;
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetLeft = A2(elm$json$Json$Decode$field, 'offsetLeft', elm$json$Json$Decode$float);
var elm$json$Json$Decode$null = _Json_decodeNull;
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetParent = F2(
	function (x, decoder) {
		return elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					elm$json$Json$Decode$field,
					'offsetParent',
					elm$json$Json$Decode$null(x)),
					A2(elm$json$Json$Decode$field, 'offsetParent', decoder)
				]));
	});
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetTop = A2(elm$json$Json$Decode$field, 'offsetTop', elm$json$Json$Decode$float);
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$scrollLeft = A2(elm$json$Json$Decode$field, 'scrollLeft', elm$json$Json$Decode$float);
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$scrollTop = A2(elm$json$Json$Decode$field, 'scrollTop', elm$json$Json$Decode$float);
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$position = F2(
	function (x, y) {
		return A2(
			elm$json$Json$Decode$andThen,
			function (_n0) {
				var x_ = _n0.a;
				var y_ = _n0.b;
				return A2(
					rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetParent,
					_Utils_Tuple2(x_, y_),
					A2(rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$position, x_, y_));
			},
			A5(
				elm$json$Json$Decode$map4,
				F4(
					function (scrollLeft_, scrollTop_, offsetLeft_, offsetTop_) {
						return _Utils_Tuple2((x + offsetLeft_) - scrollLeft_, (y + offsetTop_) - scrollTop_);
					}),
				rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$scrollLeft,
				rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$scrollTop,
				rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetLeft,
				rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetTop));
	});
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$boundingArea = A4(
	elm$json$Json$Decode$map3,
	F3(
		function (_n0, width, height) {
			var x = _n0.a;
			var y = _n0.b;
			return {height: height, left: x, top: y, width: width};
		}),
	A2(rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$position, 0, 0),
	rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetWidth,
	rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$offsetHeight);
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$childNode = function (idx) {
	return elm$json$Json$Decode$at(
		_List_fromArray(
			[
				'childNodes',
				elm$core$String$fromInt(idx)
			]));
};
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$nextSibling = function (decoder) {
	return A2(elm$json$Json$Decode$field, 'nextSibling', decoder);
};
var rundis$elm_bootstrap$Bootstrap$Dropdown$sizeDecoder = A3(
	elm$json$Json$Decode$map2,
	elm$core$Tuple$pair,
	A2(
		rundis$elm_bootstrap$Bootstrap$Dropdown$toggler,
		_List_fromArray(
			['target']),
		rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$boundingArea),
	A2(
		rundis$elm_bootstrap$Bootstrap$Dropdown$toggler,
		_List_fromArray(
			['target']),
		rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$nextSibling(
			A2(rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$childNode, 0, rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$boundingArea))));
var rundis$elm_bootstrap$Bootstrap$Dropdown$clickHandler = F2(
	function (toMsg, state) {
		var status = state.a.status;
		return A2(
			elm$json$Json$Decode$andThen,
			function (_n0) {
				var b = _n0.a;
				var m = _n0.b;
				return elm$json$Json$Decode$succeed(
					toMsg(
						rundis$elm_bootstrap$Bootstrap$Dropdown$State(
							{
								menuSize: m,
								status: rundis$elm_bootstrap$Bootstrap$Dropdown$nextStatus(status),
								toggleSize: b
							})));
			},
			rundis$elm_bootstrap$Bootstrap$Dropdown$sizeDecoder);
	});
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption = function (size) {
	switch (size.$) {
		case 'XS':
			return elm$core$Maybe$Nothing;
		case 'SM':
			return elm$core$Maybe$Just('sm');
		case 'MD':
			return elm$core$Maybe$Just('md');
		case 'LG':
			return elm$core$Maybe$Just('lg');
		default:
			return elm$core$Maybe$Just('xl');
	}
};
var rundis$elm_bootstrap$Bootstrap$Internal$Button$applyModifier = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'Size':
				var size = modifier.a;
				return _Utils_update(
					options,
					{
						size: elm$core$Maybe$Just(size)
					});
			case 'Coloring':
				var coloring = modifier.a;
				return _Utils_update(
					options,
					{
						coloring: elm$core$Maybe$Just(coloring)
					});
			case 'Block':
				return _Utils_update(
					options,
					{block: true});
			case 'Disabled':
				var val = modifier.a;
				return _Utils_update(
					options,
					{disabled: val});
			default:
				var attrs = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Internal$Button$defaultOptions = {attributes: _List_Nil, block: false, coloring: elm$core$Maybe$Nothing, disabled: false, size: elm$core$Maybe$Nothing};
var rundis$elm_bootstrap$Bootstrap$Internal$Button$roleClass = function (role) {
	switch (role.$) {
		case 'Primary':
			return 'primary';
		case 'Secondary':
			return 'secondary';
		case 'Success':
			return 'success';
		case 'Info':
			return 'info';
		case 'Warning':
			return 'warning';
		case 'Danger':
			return 'danger';
		case 'Dark':
			return 'dark';
		case 'Light':
			return 'light';
		default:
			return 'link';
	}
};
var rundis$elm_bootstrap$Bootstrap$Internal$Button$buttonAttributes = function (modifiers) {
	var options = A3(elm$core$List$foldl, rundis$elm_bootstrap$Bootstrap$Internal$Button$applyModifier, rundis$elm_bootstrap$Bootstrap$Internal$Button$defaultOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('btn', true),
						_Utils_Tuple2('btn-block', options.block),
						_Utils_Tuple2('disabled', options.disabled)
					])),
				elm$html$Html$Attributes$disabled(options.disabled)
			]),
		_Utils_ap(
			function () {
				var _n0 = A2(elm$core$Maybe$andThen, rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption, options.size);
				if (_n0.$ === 'Just') {
					var s = _n0.a;
					return _List_fromArray(
						[
							elm$html$Html$Attributes$class('btn-' + s)
						]);
				} else {
					return _List_Nil;
				}
			}(),
			_Utils_ap(
				function () {
					var _n1 = options.coloring;
					if (_n1.$ === 'Just') {
						if (_n1.a.$ === 'Roled') {
							var role = _n1.a.a;
							return _List_fromArray(
								[
									elm$html$Html$Attributes$class(
									'btn-' + rundis$elm_bootstrap$Bootstrap$Internal$Button$roleClass(role))
								]);
						} else {
							var role = _n1.a.a;
							return _List_fromArray(
								[
									elm$html$Html$Attributes$class(
									'btn-outline-' + rundis$elm_bootstrap$Bootstrap$Internal$Button$roleClass(role))
								]);
						}
					} else {
						return _List_Nil;
					}
				}(),
				options.attributes)));
};
var rundis$elm_bootstrap$Bootstrap$Dropdown$togglePrivate = F4(
	function (buttonOptions, children, toggleMsg, state) {
		return A2(
			elm$html$Html$button,
			_Utils_ap(
				rundis$elm_bootstrap$Bootstrap$Internal$Button$buttonAttributes(buttonOptions),
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('dropdown-toggle'),
						elm$html$Html$Attributes$type_('button'),
						A2(
						elm$html$Html$Events$on,
						'click',
						A2(rundis$elm_bootstrap$Bootstrap$Dropdown$clickHandler, toggleMsg, state))
					])),
			children);
	});
var rundis$elm_bootstrap$Bootstrap$Dropdown$toggle = F2(
	function (buttonOptions, children) {
		return rundis$elm_bootstrap$Bootstrap$Dropdown$DropdownToggle(
			A2(rundis$elm_bootstrap$Bootstrap$Dropdown$togglePrivate, buttonOptions, children));
	});
var author$project$View$termDropdown = function (model) {
	return A2(
		rundis$elm_bootstrap$Bootstrap$Dropdown$dropdown,
		model.dropdownState,
		{
			items: A2(
				elm$core$List$map,
				function (term) {
					return A2(
						rundis$elm_bootstrap$Bootstrap$Dropdown$buttonItem,
						_List_fromArray(
							[
								elm$html$Html$Attributes$href('#'),
								elm$html$Html$Events$onClick(
								author$project$Model$MakeApiRequest(
									elm$core$String$fromInt(term.date)))
							]),
						_List_fromArray(
							[
								elm$html$Html$text(term.description)
							]));
				},
				elm$core$List$reverse(model.terms)),
			options: _List_Nil,
			toggleButton: A2(
				rundis$elm_bootstrap$Bootstrap$Dropdown$toggle,
				_List_fromArray(
					[rundis$elm_bootstrap$Bootstrap$Button$light, rundis$elm_bootstrap$Bootstrap$Button$small, rundis$elm_bootstrap$Bootstrap$Button$outlineLight]),
				_List_fromArray(
					[
						elm$html$Html$text(model.term)
					])),
			toggleMsg: author$project$Model$DropdownMsg
		});
};
var avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 'RgbaSpace', a: a, b: b, c: c, d: d};
	});
var avh4$elm_color$Color$rgba = F4(
	function (r, g, b, a) {
		return A4(avh4$elm_color$Color$RgbaSpace, r, g, b, a);
	});
var elm$core$Basics$round = _Basics_round;
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var avh4$elm_color$Color$toCssString = function (_n0) {
	var r = _n0.a;
	var g = _n0.b;
	var b = _n0.c;
	var a = _n0.d;
	var roundTo = function (x) {
		return elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return elm$core$Basics$round(x * 10000) / 100;
	};
	return elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				elm$core$String$fromFloat(
				pct(r)),
				'%,',
				elm$core$String$fromFloat(
				pct(g)),
				'%,',
				elm$core$String$fromFloat(
				pct(b)),
				'%,',
				elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$h6 = _VirtualDom_node('h6');
var rundis$elm_bootstrap$Bootstrap$Grid$Column = function (a) {
	return {$: 'Column', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Grid$col = F2(
	function (options, children) {
		return rundis$elm_bootstrap$Bootstrap$Grid$Column(
			{children: children, options: options});
	});
var rundis$elm_bootstrap$Bootstrap$Grid$containerFluid = F2(
	function (attributes, children) {
		return A2(
			elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('container-fluid')
					]),
				attributes),
			children);
	});
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$Keyed$node = elm$virtual_dom$VirtualDom$keyedNode;
var rundis$elm_bootstrap$Bootstrap$General$Internal$XS = {$: 'XS'};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col = {$: 'Col'};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Width = F2(
	function (screenSize, columnCount) {
		return {columnCount: columnCount, screenSize: screenSize};
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColAlign = F2(
	function (align_, options) {
		var _n0 = align_.screenSize;
		switch (_n0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						alignXs: elm$core$Maybe$Just(align_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						alignSm: elm$core$Maybe$Just(align_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						alignMd: elm$core$Maybe$Just(align_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						alignLg: elm$core$Maybe$Just(align_)
					});
			default:
				return _Utils_update(
					options,
					{
						alignXl: elm$core$Maybe$Just(align_)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOffset = F2(
	function (offset_, options) {
		var _n0 = offset_.screenSize;
		switch (_n0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						offsetXs: elm$core$Maybe$Just(offset_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						offsetSm: elm$core$Maybe$Just(offset_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						offsetMd: elm$core$Maybe$Just(offset_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						offsetLg: elm$core$Maybe$Just(offset_)
					});
			default:
				return _Utils_update(
					options,
					{
						offsetXl: elm$core$Maybe$Just(offset_)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOrder = F2(
	function (order_, options) {
		var _n0 = order_.screenSize;
		switch (_n0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						orderXs: elm$core$Maybe$Just(order_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						orderSm: elm$core$Maybe$Just(order_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						orderMd: elm$core$Maybe$Just(order_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						orderLg: elm$core$Maybe$Just(order_)
					});
			default:
				return _Utils_update(
					options,
					{
						orderXl: elm$core$Maybe$Just(order_)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPull = F2(
	function (pull_, options) {
		var _n0 = pull_.screenSize;
		switch (_n0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						pullXs: elm$core$Maybe$Just(pull_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						pullSm: elm$core$Maybe$Just(pull_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						pullMd: elm$core$Maybe$Just(pull_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						pullLg: elm$core$Maybe$Just(pull_)
					});
			default:
				return _Utils_update(
					options,
					{
						pullXl: elm$core$Maybe$Just(pull_)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPush = F2(
	function (push_, options) {
		var _n0 = push_.screenSize;
		switch (_n0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						pushXs: elm$core$Maybe$Just(push_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						pushSm: elm$core$Maybe$Just(push_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						pushMd: elm$core$Maybe$Just(push_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						pushLg: elm$core$Maybe$Just(push_)
					});
			default:
				return _Utils_update(
					options,
					{
						pushXl: elm$core$Maybe$Just(push_)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColWidth = F2(
	function (width_, options) {
		var _n0 = width_.screenSize;
		switch (_n0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						widthXs: elm$core$Maybe$Just(width_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						widthSm: elm$core$Maybe$Just(width_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						widthMd: elm$core$Maybe$Just(width_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						widthLg: elm$core$Maybe$Just(width_)
					});
			default:
				return _Utils_update(
					options,
					{
						widthXl: elm$core$Maybe$Just(width_)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOption = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'ColAttrs':
				var attrs = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
			case 'ColWidth':
				var width_ = modifier.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColWidth, width_, options);
			case 'ColOffset':
				var offset_ = modifier.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOffset, offset_, options);
			case 'ColPull':
				var pull_ = modifier.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPull, pull_, options);
			case 'ColPush':
				var push_ = modifier.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColPush, push_, options);
			case 'ColOrder':
				var order_ = modifier.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOrder, order_, options);
			case 'ColAlign':
				var align = modifier.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColAlign, align, options);
			default:
				var align = modifier.a;
				return _Utils_update(
					options,
					{
						textAlign: elm$core$Maybe$Just(align)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$columnCountOption = function (size) {
	switch (size.$) {
		case 'Col':
			return elm$core$Maybe$Nothing;
		case 'Col1':
			return elm$core$Maybe$Just('1');
		case 'Col2':
			return elm$core$Maybe$Just('2');
		case 'Col3':
			return elm$core$Maybe$Just('3');
		case 'Col4':
			return elm$core$Maybe$Just('4');
		case 'Col5':
			return elm$core$Maybe$Just('5');
		case 'Col6':
			return elm$core$Maybe$Just('6');
		case 'Col7':
			return elm$core$Maybe$Just('7');
		case 'Col8':
			return elm$core$Maybe$Just('8');
		case 'Col9':
			return elm$core$Maybe$Just('9');
		case 'Col10':
			return elm$core$Maybe$Just('10');
		case 'Col11':
			return elm$core$Maybe$Just('11');
		case 'Col12':
			return elm$core$Maybe$Just('12');
		default:
			return elm$core$Maybe$Just('auto');
	}
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthClass = function (_n0) {
	var screenSize = _n0.screenSize;
	var columnCount = _n0.columnCount;
	return elm$html$Html$Attributes$class(
		'col' + (A2(
			elm$core$Maybe$withDefault,
			'',
			A2(
				elm$core$Maybe$map,
				function (v) {
					return '-' + v;
				},
				rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize))) + A2(
			elm$core$Maybe$withDefault,
			'',
			A2(
				elm$core$Maybe$map,
				function (v) {
					return '-' + v;
				},
				rundis$elm_bootstrap$Bootstrap$Grid$Internal$columnCountOption(columnCount)))));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthsToAttributes = function (widths) {
	var width_ = function (w) {
		return A2(elm$core$Maybe$map, rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthClass, w);
	};
	return A2(
		elm$core$List$filterMap,
		elm$core$Basics$identity,
		A2(elm$core$List$map, width_, widths));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultColOptions = {alignLg: elm$core$Maybe$Nothing, alignMd: elm$core$Maybe$Nothing, alignSm: elm$core$Maybe$Nothing, alignXl: elm$core$Maybe$Nothing, alignXs: elm$core$Maybe$Nothing, attributes: _List_Nil, offsetLg: elm$core$Maybe$Nothing, offsetMd: elm$core$Maybe$Nothing, offsetSm: elm$core$Maybe$Nothing, offsetXl: elm$core$Maybe$Nothing, offsetXs: elm$core$Maybe$Nothing, orderLg: elm$core$Maybe$Nothing, orderMd: elm$core$Maybe$Nothing, orderSm: elm$core$Maybe$Nothing, orderXl: elm$core$Maybe$Nothing, orderXs: elm$core$Maybe$Nothing, pullLg: elm$core$Maybe$Nothing, pullMd: elm$core$Maybe$Nothing, pullSm: elm$core$Maybe$Nothing, pullXl: elm$core$Maybe$Nothing, pullXs: elm$core$Maybe$Nothing, pushLg: elm$core$Maybe$Nothing, pushMd: elm$core$Maybe$Nothing, pushSm: elm$core$Maybe$Nothing, pushXl: elm$core$Maybe$Nothing, pushXs: elm$core$Maybe$Nothing, textAlign: elm$core$Maybe$Nothing, widthLg: elm$core$Maybe$Nothing, widthMd: elm$core$Maybe$Nothing, widthSm: elm$core$Maybe$Nothing, widthXl: elm$core$Maybe$Nothing, widthXs: elm$core$Maybe$Nothing};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetCountOption = function (size) {
	switch (size.$) {
		case 'Offset0':
			return '0';
		case 'Offset1':
			return '1';
		case 'Offset2':
			return '2';
		case 'Offset3':
			return '3';
		case 'Offset4':
			return '4';
		case 'Offset5':
			return '5';
		case 'Offset6':
			return '6';
		case 'Offset7':
			return '7';
		case 'Offset8':
			return '8';
		case 'Offset9':
			return '9';
		case 'Offset10':
			return '10';
		default:
			return '11';
	}
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString = function (screenSize) {
	var _n0 = rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize);
	if (_n0.$ === 'Just') {
		var s = _n0.a;
		return '-' + (s + '-');
	} else {
		return '-';
	}
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetClass = function (_n0) {
	var screenSize = _n0.screenSize;
	var offsetCount = _n0.offsetCount;
	return elm$html$Html$Attributes$class(
		'offset' + (rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetCountOption(offsetCount)));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetsToAttributes = function (offsets) {
	var offset_ = function (m) {
		return A2(elm$core$Maybe$map, rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetClass, m);
	};
	return A2(
		elm$core$List$filterMap,
		elm$core$Basics$identity,
		A2(elm$core$List$map, offset_, offsets));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderColOption = function (size) {
	switch (size.$) {
		case 'OrderFirst':
			return 'first';
		case 'Order1':
			return '1';
		case 'Order2':
			return '2';
		case 'Order3':
			return '3';
		case 'Order4':
			return '4';
		case 'Order5':
			return '5';
		case 'Order6':
			return '6';
		case 'Order7':
			return '7';
		case 'Order8':
			return '8';
		case 'Order9':
			return '9';
		case 'Order10':
			return '10';
		case 'Order11':
			return '11';
		case 'Order12':
			return '12';
		default:
			return 'last';
	}
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderToAttributes = function (orders) {
	var order_ = function (m) {
		if (m.$ === 'Just') {
			var screenSize = m.a.screenSize;
			var moveCount = m.a.moveCount;
			return elm$core$Maybe$Just(
				elm$html$Html$Attributes$class(
					'order' + (rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderColOption(moveCount))));
		} else {
			return elm$core$Maybe$Nothing;
		}
	};
	return A2(
		elm$core$List$filterMap,
		elm$core$Basics$identity,
		A2(elm$core$List$map, order_, orders));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$moveCountOption = function (size) {
	switch (size.$) {
		case 'Move0':
			return '0';
		case 'Move1':
			return '1';
		case 'Move2':
			return '2';
		case 'Move3':
			return '3';
		case 'Move4':
			return '4';
		case 'Move5':
			return '5';
		case 'Move6':
			return '6';
		case 'Move7':
			return '7';
		case 'Move8':
			return '8';
		case 'Move9':
			return '9';
		case 'Move10':
			return '10';
		case 'Move11':
			return '11';
		default:
			return '12';
	}
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$pullsToAttributes = function (pulls) {
	var pull_ = function (m) {
		if (m.$ === 'Just') {
			var screenSize = m.a.screenSize;
			var moveCount = m.a.moveCount;
			return elm$core$Maybe$Just(
				elm$html$Html$Attributes$class(
					'pull' + (rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + rundis$elm_bootstrap$Bootstrap$Grid$Internal$moveCountOption(moveCount))));
		} else {
			return elm$core$Maybe$Nothing;
		}
	};
	return A2(
		elm$core$List$filterMap,
		elm$core$Basics$identity,
		A2(elm$core$List$map, pull_, pulls));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$pushesToAttributes = function (pushes) {
	var push_ = function (m) {
		if (m.$ === 'Just') {
			var screenSize = m.a.screenSize;
			var moveCount = m.a.moveCount;
			return elm$core$Maybe$Just(
				elm$html$Html$Attributes$class(
					'push' + (rundis$elm_bootstrap$Bootstrap$Grid$Internal$screenSizeToPartialString(screenSize) + rundis$elm_bootstrap$Bootstrap$Grid$Internal$moveCountOption(moveCount))));
		} else {
			return elm$core$Maybe$Nothing;
		}
	};
	return A2(
		elm$core$List$filterMap,
		elm$core$Basics$identity,
		A2(elm$core$List$map, push_, pushes));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$verticalAlignOption = function (align) {
	switch (align.$) {
		case 'Top':
			return 'start';
		case 'Middle':
			return 'center';
		default:
			return 'end';
	}
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignClass = F2(
	function (prefix, _n0) {
		var align = _n0.align;
		var screenSize = _n0.screenSize;
		return elm$html$Html$Attributes$class(
			_Utils_ap(
				prefix,
				_Utils_ap(
					A2(
						elm$core$Maybe$withDefault,
						'',
						A2(
							elm$core$Maybe$map,
							function (v) {
								return v + '-';
							},
							rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize))),
					rundis$elm_bootstrap$Bootstrap$Grid$Internal$verticalAlignOption(align))));
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignsToAttributes = F2(
	function (prefix, aligns) {
		var align = function (a) {
			return A2(
				elm$core$Maybe$map,
				rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignClass(prefix),
				a);
		};
		return A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			A2(elm$core$List$map, align, aligns));
	});
var rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignDirOption = function (dir) {
	switch (dir.$) {
		case 'Center':
			return 'center';
		case 'Left':
			return 'left';
		default:
			return 'right';
	}
};
var rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignClass = function (_n0) {
	var dir = _n0.dir;
	var size = _n0.size;
	return elm$html$Html$Attributes$class(
		'text' + (A2(
			elm$core$Maybe$withDefault,
			'-',
			A2(
				elm$core$Maybe$map,
				function (s) {
					return '-' + (s + '-');
				},
				rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(size))) + rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignDirOption(dir)));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes = function (modifiers) {
	var options = A3(elm$core$List$foldl, rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyColOption, rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultColOptions, modifiers);
	var shouldAddDefaultXs = !elm$core$List$length(
		A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[options.widthXs, options.widthSm, options.widthMd, options.widthLg, options.widthXl])));
	return _Utils_ap(
		rundis$elm_bootstrap$Bootstrap$Grid$Internal$colWidthsToAttributes(
			_List_fromArray(
				[
					shouldAddDefaultXs ? elm$core$Maybe$Just(
					A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$Width, rundis$elm_bootstrap$Bootstrap$General$Internal$XS, rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col)) : options.widthXs,
					options.widthSm,
					options.widthMd,
					options.widthLg,
					options.widthXl
				])),
		_Utils_ap(
			rundis$elm_bootstrap$Bootstrap$Grid$Internal$offsetsToAttributes(
				_List_fromArray(
					[options.offsetXs, options.offsetSm, options.offsetMd, options.offsetLg, options.offsetXl])),
			_Utils_ap(
				rundis$elm_bootstrap$Bootstrap$Grid$Internal$pullsToAttributes(
					_List_fromArray(
						[options.pullXs, options.pullSm, options.pullMd, options.pullLg, options.pullXl])),
				_Utils_ap(
					rundis$elm_bootstrap$Bootstrap$Grid$Internal$pushesToAttributes(
						_List_fromArray(
							[options.pushXs, options.pushSm, options.pushMd, options.pushLg, options.pushXl])),
					_Utils_ap(
						rundis$elm_bootstrap$Bootstrap$Grid$Internal$orderToAttributes(
							_List_fromArray(
								[options.orderXs, options.orderSm, options.orderMd, options.orderLg, options.orderXl])),
						_Utils_ap(
							A2(
								rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignsToAttributes,
								'align-self-',
								_List_fromArray(
									[options.alignXs, options.alignSm, options.alignMd, options.alignLg, options.alignXl])),
							_Utils_ap(
								function () {
									var _n0 = options.textAlign;
									if (_n0.$ === 'Just') {
										var a = _n0.a;
										return _List_fromArray(
											[
												rundis$elm_bootstrap$Bootstrap$Internal$Text$textAlignClass(a)
											]);
									} else {
										return _List_Nil;
									}
								}(),
								options.attributes)))))));
};
var rundis$elm_bootstrap$Bootstrap$Grid$renderCol = function (column) {
	switch (column.$) {
		case 'Column':
			var options = column.a.options;
			var children = column.a.children;
			return A2(
				elm$html$Html$div,
				rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes(options),
				children);
		case 'ColBreak':
			var e = column.a;
			return e;
		default:
			var options = column.a.options;
			var children = column.a.children;
			return A3(
				elm$html$Html$Keyed$node,
				'div',
				rundis$elm_bootstrap$Bootstrap$Grid$Internal$colAttributes(options),
				children);
	}
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowHAlign = F2(
	function (align, options) {
		var _n0 = align.screenSize;
		switch (_n0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						hAlignXs: elm$core$Maybe$Just(align)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						hAlignSm: elm$core$Maybe$Just(align)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						hAlignMd: elm$core$Maybe$Just(align)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						hAlignLg: elm$core$Maybe$Just(align)
					});
			default:
				return _Utils_update(
					options,
					{
						hAlignXl: elm$core$Maybe$Just(align)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowVAlign = F2(
	function (align_, options) {
		var _n0 = align_.screenSize;
		switch (_n0.$) {
			case 'XS':
				return _Utils_update(
					options,
					{
						vAlignXs: elm$core$Maybe$Just(align_)
					});
			case 'SM':
				return _Utils_update(
					options,
					{
						vAlignSm: elm$core$Maybe$Just(align_)
					});
			case 'MD':
				return _Utils_update(
					options,
					{
						vAlignMd: elm$core$Maybe$Just(align_)
					});
			case 'LG':
				return _Utils_update(
					options,
					{
						vAlignLg: elm$core$Maybe$Just(align_)
					});
			default:
				return _Utils_update(
					options,
					{
						vAlignXl: elm$core$Maybe$Just(align_)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowOption = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'RowAttrs':
				var attrs = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs)
					});
			case 'RowVAlign':
				var align = modifier.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowVAlign, align, options);
			default:
				var align = modifier.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowHAlign, align, options);
		}
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultRowOptions = {attributes: _List_Nil, hAlignLg: elm$core$Maybe$Nothing, hAlignMd: elm$core$Maybe$Nothing, hAlignSm: elm$core$Maybe$Nothing, hAlignXl: elm$core$Maybe$Nothing, hAlignXs: elm$core$Maybe$Nothing, vAlignLg: elm$core$Maybe$Nothing, vAlignMd: elm$core$Maybe$Nothing, vAlignSm: elm$core$Maybe$Nothing, vAlignXl: elm$core$Maybe$Nothing, vAlignXs: elm$core$Maybe$Nothing};
var rundis$elm_bootstrap$Bootstrap$General$Internal$horizontalAlignOption = function (align) {
	switch (align.$) {
		case 'Left':
			return 'start';
		case 'Center':
			return 'center';
		case 'Right':
			return 'end';
		case 'Around':
			return 'around';
		default:
			return 'between';
	}
};
var rundis$elm_bootstrap$Bootstrap$General$Internal$hAlignClass = function (_n0) {
	var align = _n0.align;
	var screenSize = _n0.screenSize;
	return elm$html$Html$Attributes$class(
		'justify-content-' + (A2(
			elm$core$Maybe$withDefault,
			'',
			A2(
				elm$core$Maybe$map,
				function (v) {
					return v + '-';
				},
				rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(screenSize))) + rundis$elm_bootstrap$Bootstrap$General$Internal$horizontalAlignOption(align)));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$hAlignsToAttributes = function (aligns) {
	var align = function (a) {
		return A2(elm$core$Maybe$map, rundis$elm_bootstrap$Bootstrap$General$Internal$hAlignClass, a);
	};
	return A2(
		elm$core$List$filterMap,
		elm$core$Basics$identity,
		A2(elm$core$List$map, align, aligns));
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowAttributes = function (modifiers) {
	var options = A3(elm$core$List$foldl, rundis$elm_bootstrap$Bootstrap$Grid$Internal$applyRowOption, rundis$elm_bootstrap$Bootstrap$Grid$Internal$defaultRowOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('row')
			]),
		_Utils_ap(
			A2(
				rundis$elm_bootstrap$Bootstrap$Grid$Internal$vAlignsToAttributes,
				'align-items-',
				_List_fromArray(
					[options.vAlignXs, options.vAlignSm, options.vAlignMd, options.vAlignLg, options.vAlignXl])),
			_Utils_ap(
				rundis$elm_bootstrap$Bootstrap$Grid$Internal$hAlignsToAttributes(
					_List_fromArray(
						[options.hAlignXs, options.hAlignSm, options.hAlignMd, options.hAlignLg, options.hAlignXl])),
				options.attributes)));
};
var rundis$elm_bootstrap$Bootstrap$Grid$row = F2(
	function (options, cols) {
		return A2(
			elm$html$Html$div,
			rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowAttributes(options),
			A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Grid$renderCol, cols));
	});
var rundis$elm_bootstrap$Bootstrap$General$Internal$MD = {$: 'MD'};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Offset2 = {$: 'Offset2'};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColOffset = function (a) {
	return {$: 'ColOffset', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Offset = F2(
	function (screenSize, offsetCount) {
		return {offsetCount: offsetCount, screenSize: screenSize};
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$offset = F2(
	function (size, count) {
		return rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColOffset(
			A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$Offset, size, count));
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Col$offsetMd2 = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$offset, rundis$elm_bootstrap$Bootstrap$General$Internal$MD, rundis$elm_bootstrap$Bootstrap$Grid$Internal$Offset2);
var rundis$elm_bootstrap$Bootstrap$General$Internal$LG = {$: 'LG'};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Offset0 = {$: 'Offset0'};
var rundis$elm_bootstrap$Bootstrap$Grid$Col$offsetXl0 = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$offset, rundis$elm_bootstrap$Bootstrap$General$Internal$LG, rundis$elm_bootstrap$Bootstrap$Grid$Internal$Offset0);
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Offset1 = {$: 'Offset1'};
var rundis$elm_bootstrap$Bootstrap$Grid$Col$offsetXs1 = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$offset, rundis$elm_bootstrap$Bootstrap$General$Internal$XS, rundis$elm_bootstrap$Bootstrap$Grid$Internal$Offset1);
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3 = elm$html$Html$Attributes$class('mb-3');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb5Md = elm$html$Html$Attributes$class('mb-md-5');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pb5 = elm$html$Html$Attributes$class('pb-5');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pt5 = elm$html$Html$Attributes$class('pt-5');
var author$project$View$pageHeader = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('bd-pageheader'),
				A2(elm$html$Html$Attributes$style, 'background-color', '#563d7c'),
				A2(elm$html$Html$Attributes$style, 'color', 'white'),
				rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pt5,
				rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pb5,
				rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb3,
				rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb5Md
			]),
		_List_fromArray(
			[
				A2(
				rundis$elm_bootstrap$Bootstrap$Grid$containerFluid,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[rundis$elm_bootstrap$Bootstrap$Grid$Col$offsetXs1, rundis$elm_bootstrap$Bootstrap$Grid$Col$offsetMd2, rundis$elm_bootstrap$Bootstrap$Grid$Col$offsetXl0]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('container')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$h1,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('PSU Schedule')
													])),
												A2(
												elm$html$Html$h6,
												_List_fromArray(
													[
														A2(
														elm$html$Html$Attributes$style,
														'color',
														avh4$elm_color$Color$toCssString(
															A4(avh4$elm_color$Color$rgba, 255, 255, 255, 0.75)))
													]),
												_List_fromArray(
													[
														author$project$View$termDropdown(model)
													]))
											]))
									]))
							]))
					]))
			]));
};
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var author$project$View$externalLink = F2(
	function (url, label) {
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(url),
					elm$html$Html$Attributes$target('_blank')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var elm$core$List$sortBy = _List_sortBy;
var elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3(elm$core$String$slice, 0, -n, string);
	});
var elm$core$String$map = _String_map;
var author$project$View$viewTimestamp = function (model) {
	var timeFormat = function (course) {
		return A2(
			elm$core$String$dropRight,
			5,
			A2(
				elm$core$String$map,
				function (x) {
					return elm$core$Char$isAlpha(x) ? _Utils_chr(' ') : x;
				},
				course.timestamp));
	};
	var _n0 = elm$core$List$head(
		A2(
			elm$core$List$sortBy,
			function ($) {
				return $.timestamp;
			},
			model.classes));
	if (_n0.$ === 'Just') {
		var course = _n0.a;
		return elm$html$Html$text(
			timeFormat(course));
	} else {
		return elm$html$Html$text('');
	}
};
var elm$html$Html$footer = _VirtualDom_node('footer');
var elm$html$Html$i = _VirtualDom_node('i');
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$p = _VirtualDom_node('p');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$html$Html$ul = _VirtualDom_node('ul');
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var rundis$elm_bootstrap$Bootstrap$Grid$container = F2(
	function (attributes, children) {
		return A2(
			elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('container')
					]),
				attributes),
			children);
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAttrs = function (a) {
	return {$: 'ColAttrs', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs = function (attrs_) {
	return rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColAttrs(attrs_);
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col6 = {$: 'Col6'};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColWidth = function (a) {
	return {$: 'ColWidth', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$width = F2(
	function (size, count) {
		return rundis$elm_bootstrap$Bootstrap$Grid$Internal$ColWidth(
			A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$Width, size, count));
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Col$md6 = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, rundis$elm_bootstrap$Bootstrap$General$Internal$MD, rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col6);
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col12 = {$: 'Col12'};
var rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12 = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, rundis$elm_bootstrap$Bootstrap$General$Internal$XS, rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col12);
var rundis$elm_bootstrap$Bootstrap$General$Internal$Center = {$: 'Center'};
var rundis$elm_bootstrap$Bootstrap$General$Internal$HAlign = F2(
	function (screenSize, align) {
		return {align: align, screenSize: screenSize};
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$RowHAlign = function (a) {
	return {$: 'RowHAlign', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowHAlign = F2(
	function (size, align) {
		return rundis$elm_bootstrap$Bootstrap$Grid$Internal$RowHAlign(
			A2(rundis$elm_bootstrap$Bootstrap$General$Internal$HAlign, size, align));
	});
var rundis$elm_bootstrap$Bootstrap$Grid$Row$centerSm = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowHAlign, rundis$elm_bootstrap$Bootstrap$General$Internal$SM, rundis$elm_bootstrap$Bootstrap$General$Internal$Center);
var rundis$elm_bootstrap$Bootstrap$Utilities$Display$blockMd = elm$html$Html$Attributes$class('d-md-block');
var rundis$elm_bootstrap$Bootstrap$Utilities$Display$none = elm$html$Html$Attributes$class('d-none');
var rundis$elm_bootstrap$Bootstrap$Utilities$Display$noneMd = elm$html$Html$Attributes$class('d-md-none');
var rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsEnd = elm$html$Html$Attributes$class('align-items-end');
var rundis$elm_bootstrap$Bootstrap$Utilities$Flex$row = elm$html$Html$Attributes$class('flex-row');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mr2 = elm$html$Html$Attributes$class('mr-2');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt2 = elm$html$Html$Attributes$class('mt-2');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt4Md = elm$html$Html$Attributes$class('mt-md-4');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt5 = elm$html$Html$Attributes$class('mt-5');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pl0 = elm$html$Html$Attributes$class('pl-0');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$px2 = elm$html$Html$Attributes$class('px-2');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$py5 = elm$html$Html$Attributes$class('py-5');
var author$project$View$viewFooter = function (model) {
	return A2(
		elm$html$Html$footer,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('bd-footer text-muted'),
				A2(elm$html$Html$Attributes$style, 'background-color', '#f7f7f7'),
				rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$py5,
				rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$px2
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						A2(
						rundis$elm_bootstrap$Bootstrap$Grid$container,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								rundis$elm_bootstrap$Bootstrap$Grid$row,
								_List_fromArray(
									[rundis$elm_bootstrap$Bootstrap$Grid$Row$centerSm]),
								_List_fromArray(
									[
										A2(
										rundis$elm_bootstrap$Bootstrap$Grid$col,
										_List_fromArray(
											[rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12, rundis$elm_bootstrap$Bootstrap$Grid$Col$md6]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$ul,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('bd-footer-links'),
														A2(elm$html$Html$Attributes$style, 'list-style-type', 'none'),
														rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pl0
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$li,
														_List_fromArray(
															[
																A2(elm$html$Html$Attributes$style, 'display', 'inline'),
																rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mr2
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$i,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$class('fa fa-github'),
																		A2(elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
																	]),
																_List_Nil),
																A2(author$project$View$externalLink, 'https://github.com/michaelheyman/pdx-schedule/', ' Source')
															])),
														A2(
														elm$html$Html$li,
														_List_fromArray(
															[
																A2(elm$html$Html$Attributes$style, 'display', 'inline')
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$i,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$class('fa fa-envelope'),
																		A2(elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
																	]),
																_List_Nil),
																A2(
																elm$html$Html$a,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$href('mailto:contact@mheyman.com?subject=Site Feedback'),
																		elm$html$Html$Attributes$target('_blank')
																	]),
																_List_fromArray(
																	[
																		elm$html$Html$text(' Contact')
																	]))
															]))
													]))
											])),
										A2(
										rundis$elm_bootstrap$Bootstrap$Grid$col,
										_List_fromArray(
											[
												rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12,
												rundis$elm_bootstrap$Bootstrap$Grid$Col$md6,
												rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
												_List_fromArray(
													[
														rundis$elm_bootstrap$Bootstrap$Utilities$Flex$row,
														rundis$elm_bootstrap$Bootstrap$Utilities$Flex$alignItemsEnd,
														elm$html$Html$Attributes$class('text-right'),
														rundis$elm_bootstrap$Bootstrap$Utilities$Display$none,
														rundis$elm_bootstrap$Bootstrap$Utilities$Display$blockMd
													]))
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$span,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Last Updated: '),
														author$project$View$viewTimestamp(model)
													]))
											])),
										A2(
										rundis$elm_bootstrap$Bootstrap$Grid$col,
										_List_fromArray(
											[
												rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12,
												rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
												_List_fromArray(
													[rundis$elm_bootstrap$Bootstrap$Utilities$Flex$row, rundis$elm_bootstrap$Bootstrap$Utilities$Display$noneMd, rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt2]))
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$span,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Last Updated: '),
														author$project$View$viewTimestamp(model)
													]))
											])),
										A2(
										rundis$elm_bootstrap$Bootstrap$Grid$col,
										_List_fromArray(
											[
												rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
												_List_fromArray(
													[rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt5, rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mt4Md]))
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$p,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('The contents of this page are not sanctioned by Portland State University.')
													]))
											]))
									]))
							]))
					]))
			]));
};
var author$project$Model$DisciplineFilter = function (a) {
	return {$: 'DisciplineFilter', a: a};
};
var avh4$elm_color$Color$scaleFrom255 = function (c) {
	return c / 255;
};
var avh4$elm_color$Color$rgb255 = F3(
	function (r, g, b) {
		return A4(
			avh4$elm_color$Color$RgbaSpace,
			avh4$elm_color$Color$scaleFrom255(r),
			avh4$elm_color$Color$scaleFrom255(g),
			avh4$elm_color$Color$scaleFrom255(b),
			1.0);
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$Brand = function (a) {
	return {$: 'Brand', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Navbar$Config = function (a) {
	return {$: 'Config', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Navbar$updateConfig = F2(
	function (mapper, _n0) {
		var conf = _n0.a;
		return rundis$elm_bootstrap$Bootstrap$Navbar$Config(
			mapper(conf));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$brand = F3(
	function (attributes, children, config_) {
		return A2(
			rundis$elm_bootstrap$Bootstrap$Navbar$updateConfig,
			function (conf) {
				return _Utils_update(
					conf,
					{
						brand: elm$core$Maybe$Just(
							rundis$elm_bootstrap$Bootstrap$Navbar$Brand(
								A2(
									elm$html$Html$a,
									_Utils_ap(
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('navbar-brand')
											]),
										attributes),
									children)))
					});
			},
			config_);
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$updateOptions = F2(
	function (mapper, _n0) {
		var conf = _n0.a;
		return rundis$elm_bootstrap$Bootstrap$Navbar$Config(
			_Utils_update(
				conf,
				{
					options: mapper(conf.options)
				}));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$toggleAt = F2(
	function (size, conf) {
		return A2(
			rundis$elm_bootstrap$Bootstrap$Navbar$updateOptions,
			function (opt) {
				return _Utils_update(
					opt,
					{toggleAt: size});
			},
			conf);
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$collapseSmall = rundis$elm_bootstrap$Bootstrap$Navbar$toggleAt(rundis$elm_bootstrap$Bootstrap$General$Internal$SM);
var rundis$elm_bootstrap$Bootstrap$Internal$Role$Light = {$: 'Light'};
var rundis$elm_bootstrap$Bootstrap$Navbar$Light = {$: 'Light'};
var rundis$elm_bootstrap$Bootstrap$Navbar$Roled = function (a) {
	return {$: 'Roled', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Navbar$config = function (toMsg) {
	return rundis$elm_bootstrap$Bootstrap$Navbar$Config(
		{
			brand: elm$core$Maybe$Nothing,
			customItems: _List_Nil,
			items: _List_Nil,
			options: {
				attributes: _List_Nil,
				fix: elm$core$Maybe$Nothing,
				isContainer: false,
				scheme: elm$core$Maybe$Just(
					{
						bgColor: rundis$elm_bootstrap$Bootstrap$Navbar$Roled(rundis$elm_bootstrap$Bootstrap$Internal$Role$Light),
						modifier: rundis$elm_bootstrap$Bootstrap$Navbar$Light
					}),
				toggleAt: rundis$elm_bootstrap$Bootstrap$General$Internal$XS
			},
			toMsg: toMsg,
			withAnimation: false
		});
};
var rundis$elm_bootstrap$Bootstrap$Navbar$container = function (conf) {
	return A2(
		rundis$elm_bootstrap$Bootstrap$Navbar$updateOptions,
		function (opts) {
			return _Utils_update(
				opts,
				{isContainer: true});
		},
		conf);
};
var rundis$elm_bootstrap$Bootstrap$Navbar$Dropdown = function (a) {
	return {$: 'Dropdown', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Navbar$NavDropdown = function (a) {
	return {$: 'NavDropdown', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Navbar$dropdown = function (conf) {
	return rundis$elm_bootstrap$Bootstrap$Navbar$NavDropdown(
		rundis$elm_bootstrap$Bootstrap$Navbar$Dropdown(conf));
};
var rundis$elm_bootstrap$Bootstrap$Navbar$DropdownItem = function (a) {
	return {$: 'DropdownItem', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Navbar$dropdownHeader = function (children) {
	return rundis$elm_bootstrap$Bootstrap$Navbar$DropdownItem(
		A2(
			elm$html$Html$h6,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('dropdown-header')
				]),
			children));
};
var rundis$elm_bootstrap$Bootstrap$Navbar$dropdownItem = F2(
	function (attributes, children) {
		return rundis$elm_bootstrap$Bootstrap$Navbar$DropdownItem(
			A2(
				elm$html$Html$a,
				_Utils_ap(
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('dropdown-item')
						]),
					attributes),
				children));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$DropdownToggle = function (a) {
	return {$: 'DropdownToggle', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Navbar$dropdownToggle = F2(
	function (attributes, children) {
		return rundis$elm_bootstrap$Bootstrap$Navbar$DropdownToggle(
			{attributes: attributes, children: children});
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$items = F2(
	function (items_, config_) {
		return A2(
			rundis$elm_bootstrap$Bootstrap$Navbar$updateConfig,
			function (conf) {
				return _Utils_update(
					conf,
					{items: items_});
			},
			config_);
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Navbar$scheme = F3(
	function (modifier, bgColor, conf) {
		return A2(
			rundis$elm_bootstrap$Bootstrap$Navbar$updateOptions,
			function (opt) {
				return _Utils_update(
					opt,
					{
						scheme: elm$core$Maybe$Just(
							{bgColor: bgColor, modifier: modifier})
					});
			},
			conf);
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$lightCustom = function (color) {
	return A2(
		rundis$elm_bootstrap$Bootstrap$Navbar$scheme,
		rundis$elm_bootstrap$Bootstrap$Navbar$Light,
		rundis$elm_bootstrap$Bootstrap$Navbar$Custom(color));
};
var elm$html$Html$nav = _VirtualDom_node('nav');
var rundis$elm_bootstrap$Bootstrap$Navbar$maybeBrand = function (brand_) {
	if (brand_.$ === 'Just') {
		var b = brand_.a.a;
		return _List_fromArray(
			[b]);
	} else {
		return _List_Nil;
	}
};
var elm$core$Basics$not = _Basics_not;
var rundis$elm_bootstrap$Bootstrap$Navbar$sizeToComparable = function (size) {
	switch (size.$) {
		case 'XS':
			return 1;
		case 'SM':
			return 2;
		case 'MD':
			return 3;
		case 'LG':
			return 4;
		default:
			return 5;
	}
};
var rundis$elm_bootstrap$Bootstrap$General$Internal$XL = {$: 'XL'};
var rundis$elm_bootstrap$Bootstrap$Navbar$toScreenSize = function (windowWidth) {
	return (windowWidth <= 576) ? rundis$elm_bootstrap$Bootstrap$General$Internal$XS : ((windowWidth <= 768) ? rundis$elm_bootstrap$Bootstrap$General$Internal$SM : ((windowWidth <= 992) ? rundis$elm_bootstrap$Bootstrap$General$Internal$MD : ((windowWidth <= 1200) ? rundis$elm_bootstrap$Bootstrap$General$Internal$LG : rundis$elm_bootstrap$Bootstrap$General$Internal$XL)));
};
var rundis$elm_bootstrap$Bootstrap$Navbar$shouldHideMenu = F2(
	function (_n0, _n1) {
		var windowWidth = _n0.a.windowWidth;
		var options = _n1.options;
		var winMedia = function () {
			if (windowWidth.$ === 'Just') {
				var s = windowWidth.a;
				return rundis$elm_bootstrap$Bootstrap$Navbar$toScreenSize(s);
			} else {
				return rundis$elm_bootstrap$Bootstrap$General$Internal$XS;
			}
		}();
		return _Utils_cmp(
			rundis$elm_bootstrap$Bootstrap$Navbar$sizeToComparable(winMedia),
			rundis$elm_bootstrap$Bootstrap$Navbar$sizeToComparable(options.toggleAt)) > 0;
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$Shown = {$: 'Shown'};
var rundis$elm_bootstrap$Bootstrap$Navbar$StartDown = {$: 'StartDown'};
var rundis$elm_bootstrap$Bootstrap$Navbar$StartUp = {$: 'StartUp'};
var rundis$elm_bootstrap$Bootstrap$Navbar$visibilityTransition = F2(
	function (withAnimation_, visibility) {
		var _n0 = _Utils_Tuple2(withAnimation_, visibility);
		if (_n0.a) {
			switch (_n0.b.$) {
				case 'Hidden':
					var _n1 = _n0.b;
					return rundis$elm_bootstrap$Bootstrap$Navbar$StartDown;
				case 'StartDown':
					var _n2 = _n0.b;
					return rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingDown;
				case 'AnimatingDown':
					var _n3 = _n0.b;
					return rundis$elm_bootstrap$Bootstrap$Navbar$Shown;
				case 'Shown':
					var _n4 = _n0.b;
					return rundis$elm_bootstrap$Bootstrap$Navbar$StartUp;
				case 'StartUp':
					var _n5 = _n0.b;
					return rundis$elm_bootstrap$Bootstrap$Navbar$AnimatingUp;
				default:
					var _n6 = _n0.b;
					return rundis$elm_bootstrap$Bootstrap$Navbar$Hidden;
			}
		} else {
			switch (_n0.b.$) {
				case 'Hidden':
					var _n7 = _n0.b;
					return rundis$elm_bootstrap$Bootstrap$Navbar$Shown;
				case 'Shown':
					var _n8 = _n0.b;
					return rundis$elm_bootstrap$Bootstrap$Navbar$Hidden;
				default:
					return rundis$elm_bootstrap$Bootstrap$Navbar$Hidden;
			}
		}
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$transitionHandler = F2(
	function (state, configRec) {
		return elm$json$Json$Decode$succeed(
			configRec.toMsg(
				A2(
					rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
					function (s) {
						return _Utils_update(
							s,
							{
								visibility: A2(rundis$elm_bootstrap$Bootstrap$Navbar$visibilityTransition, configRec.withAnimation, s.visibility)
							});
					},
					state)));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle = function (maybeHeight) {
	var pixelHeight = A2(
		elm$core$Maybe$withDefault,
		'0',
		A2(
			elm$core$Maybe$map,
			function (v) {
				return elm$core$String$fromFloat(v) + 'px';
			},
			maybeHeight));
	return _List_fromArray(
		[
			A2(elm$html$Html$Attributes$style, 'position', 'relative'),
			A2(elm$html$Html$Attributes$style, 'height', pixelHeight),
			A2(elm$html$Html$Attributes$style, 'width', '100%'),
			A2(elm$html$Html$Attributes$style, 'overflow', 'hidden'),
			A2(elm$html$Html$Attributes$style, '-webkit-transition-timing-function', 'ease'),
			A2(elm$html$Html$Attributes$style, '-o-transition-timing-function', 'ease'),
			A2(elm$html$Html$Attributes$style, 'transition-timing-function', 'ease'),
			A2(elm$html$Html$Attributes$style, '-webkit-transition-duration', '0.35s'),
			A2(elm$html$Html$Attributes$style, '-o-transition-duration', '0.35s'),
			A2(elm$html$Html$Attributes$style, 'transition-duration', '0.35s'),
			A2(elm$html$Html$Attributes$style, '-webkit-transition-property', 'height'),
			A2(elm$html$Html$Attributes$style, '-o-transition-property', 'height'),
			A2(elm$html$Html$Attributes$style, 'transition-property', 'height')
		]);
};
var rundis$elm_bootstrap$Bootstrap$Navbar$menuAttributes = F2(
	function (state, configRec) {
		var visibility = state.a.visibility;
		var height = state.a.height;
		var defaults = _List_fromArray(
			[
				elm$html$Html$Attributes$class('collapse navbar-collapse')
			]);
		switch (visibility.$) {
			case 'Hidden':
				if (height.$ === 'Nothing') {
					return ((!configRec.withAnimation) || A2(rundis$elm_bootstrap$Bootstrap$Navbar$shouldHideMenu, state, configRec)) ? defaults : _List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'display', 'block'),
							A2(elm$html$Html$Attributes$style, 'height', '0'),
							A2(elm$html$Html$Attributes$style, 'overflow', 'hidden'),
							A2(elm$html$Html$Attributes$style, 'width', '100%')
						]);
				} else {
					return defaults;
				}
			case 'StartDown':
				return rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle(elm$core$Maybe$Nothing);
			case 'AnimatingDown':
				return _Utils_ap(
					rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle(height),
					_List_fromArray(
						[
							A2(
							elm$html$Html$Events$on,
							'transitionend',
							A2(rundis$elm_bootstrap$Bootstrap$Navbar$transitionHandler, state, configRec))
						]));
			case 'AnimatingUp':
				return _Utils_ap(
					rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle(elm$core$Maybe$Nothing),
					_List_fromArray(
						[
							A2(
							elm$html$Html$Events$on,
							'transitionend',
							A2(rundis$elm_bootstrap$Bootstrap$Navbar$transitionHandler, state, configRec))
						]));
			case 'StartUp':
				return rundis$elm_bootstrap$Bootstrap$Navbar$transitionStyle(height);
			default:
				return _Utils_ap(
					defaults,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('show')
						]));
		}
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$menuWrapperAttributes = F2(
	function (state, confRec) {
		var visibility = state.a.visibility;
		var height = state.a.height;
		var styleBlock = _List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'display', 'block'),
				A2(elm$html$Html$Attributes$style, 'width', '100%')
			]);
		var display = function () {
			if (height.$ === 'Nothing') {
				return ((!confRec.withAnimation) || A2(rundis$elm_bootstrap$Bootstrap$Navbar$shouldHideMenu, state, confRec)) ? 'flex' : 'block';
			} else {
				return 'flex';
			}
		}();
		switch (visibility.$) {
			case 'Hidden':
				return _List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'display', display),
						A2(elm$html$Html$Attributes$style, 'width', '100%')
					]);
			case 'StartDown':
				return styleBlock;
			case 'AnimatingDown':
				return styleBlock;
			case 'AnimatingUp':
				return styleBlock;
			case 'StartUp':
				return styleBlock;
			default:
				return ((!confRec.withAnimation) || A2(rundis$elm_bootstrap$Bootstrap$Navbar$shouldHideMenu, state, confRec)) ? _List_fromArray(
					[
						elm$html$Html$Attributes$class('collapse navbar-collapse show')
					]) : _List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'display', 'block')
					]);
		}
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$expandOption = function (size) {
	var toClass = function (sz) {
		return elm$html$Html$Attributes$class(
			'navbar-expand' + A2(
				elm$core$Maybe$withDefault,
				'',
				A2(
					elm$core$Maybe$map,
					function (s) {
						return '-' + s;
					},
					rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(sz))));
	};
	switch (size.$) {
		case 'XS':
			return _List_fromArray(
				[
					toClass(rundis$elm_bootstrap$Bootstrap$General$Internal$SM)
				]);
		case 'SM':
			return _List_fromArray(
				[
					toClass(rundis$elm_bootstrap$Bootstrap$General$Internal$MD)
				]);
		case 'MD':
			return _List_fromArray(
				[
					toClass(rundis$elm_bootstrap$Bootstrap$General$Internal$LG)
				]);
		case 'LG':
			return _List_fromArray(
				[
					toClass(rundis$elm_bootstrap$Bootstrap$General$Internal$XL)
				]);
		default:
			return _List_Nil;
	}
};
var rundis$elm_bootstrap$Bootstrap$Navbar$fixOption = function (fix) {
	if (fix.$ === 'Top') {
		return 'fixed-top';
	} else {
		return 'fixed-bottom';
	}
};
var rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass = F2(
	function (prefix, role) {
		return elm$html$Html$Attributes$class(
			prefix + ('-' + function () {
				switch (role.$) {
					case 'Primary':
						return 'primary';
					case 'Secondary':
						return 'secondary';
					case 'Success':
						return 'success';
					case 'Info':
						return 'info';
					case 'Warning':
						return 'warning';
					case 'Danger':
						return 'danger';
					case 'Light':
						return 'light';
					default:
						return 'dark';
				}
			}()));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$backgroundColorOption = function (bgClass) {
	switch (bgClass.$) {
		case 'Roled':
			var role = bgClass.a;
			return A2(rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'bg', role);
		case 'Custom':
			var color = bgClass.a;
			return A2(
				elm$html$Html$Attributes$style,
				'background-color',
				avh4$elm_color$Color$toCssString(color));
		default:
			var classString = bgClass.a;
			return elm$html$Html$Attributes$class(classString);
	}
};
var rundis$elm_bootstrap$Bootstrap$Navbar$linkModifierClass = function (modifier) {
	return elm$html$Html$Attributes$class(
		function () {
			if (modifier.$ === 'Dark') {
				return 'navbar-dark';
			} else {
				return 'navbar-light';
			}
		}());
};
var rundis$elm_bootstrap$Bootstrap$Navbar$schemeAttributes = function (_n0) {
	var modifier = _n0.modifier;
	var bgColor = _n0.bgColor;
	return _List_fromArray(
		[
			rundis$elm_bootstrap$Bootstrap$Navbar$linkModifierClass(modifier),
			rundis$elm_bootstrap$Bootstrap$Navbar$backgroundColorOption(bgColor)
		]);
};
var rundis$elm_bootstrap$Bootstrap$Navbar$navbarAttributes = function (options) {
	return _Utils_ap(
		_List_fromArray(
			[
				elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('navbar', true),
						_Utils_Tuple2('container', options.isContainer)
					]))
			]),
		_Utils_ap(
			rundis$elm_bootstrap$Bootstrap$Navbar$expandOption(options.toggleAt),
			_Utils_ap(
				function () {
					var _n0 = options.scheme;
					if (_n0.$ === 'Just') {
						var scheme_ = _n0.a;
						return rundis$elm_bootstrap$Bootstrap$Navbar$schemeAttributes(scheme_);
					} else {
						return _List_Nil;
					}
				}(),
				_Utils_ap(
					function () {
						var _n1 = options.fix;
						if (_n1.$ === 'Just') {
							var fix = _n1.a;
							return _List_fromArray(
								[
									elm$html$Html$Attributes$class(
									rundis$elm_bootstrap$Bootstrap$Navbar$fixOption(fix))
								]);
						} else {
							return _List_Nil;
						}
					}(),
					options.attributes))));
};
var rundis$elm_bootstrap$Bootstrap$Navbar$renderCustom = function (items_) {
	return A2(
		elm$core$List$map,
		function (_n0) {
			var item = _n0.a;
			return item;
		},
		items_);
};
var rundis$elm_bootstrap$Bootstrap$Navbar$getOrInitDropdownStatus = F2(
	function (id, _n0) {
		var dropdowns = _n0.a.dropdowns;
		return A2(
			elm$core$Maybe$withDefault,
			rundis$elm_bootstrap$Bootstrap$Navbar$Closed,
			A2(elm$core$Dict$get, id, dropdowns));
	});
var elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$toggleOpen = F3(
	function (state, id, _n0) {
		var toMsg = _n0.toMsg;
		var currStatus = A2(rundis$elm_bootstrap$Bootstrap$Navbar$getOrInitDropdownStatus, id, state);
		var newStatus = function () {
			switch (currStatus.$) {
				case 'Open':
					return rundis$elm_bootstrap$Bootstrap$Navbar$Closed;
				case 'ListenClicks':
					return rundis$elm_bootstrap$Bootstrap$Navbar$Closed;
				default:
					return rundis$elm_bootstrap$Bootstrap$Navbar$Open;
			}
		}();
		return toMsg(
			A2(
				rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
				function (s) {
					return _Utils_update(
						s,
						{
							dropdowns: A3(elm$core$Dict$insert, id, newStatus, s.dropdowns)
						});
				},
				state));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$renderDropdownToggle = F4(
	function (state, id, configRec, _n0) {
		var attributes = _n0.a.attributes;
		var children = _n0.a.children;
		return A2(
			elm$html$Html$a,
			_Utils_ap(
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('nav-link dropdown-toggle'),
						elm$html$Html$Attributes$href('#'),
						A2(
						elm$html$Html$Events$custom,
						'click',
						elm$json$Json$Decode$succeed(
							{
								message: A3(rundis$elm_bootstrap$Bootstrap$Navbar$toggleOpen, state, id, configRec),
								preventDefault: true,
								stopPropagation: false
							}))
					]),
				attributes),
			children);
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$renderDropdown = F3(
	function (state, configRec, _n0) {
		var ddRec = _n0.a;
		var needsDropup = A2(
			elm$core$Maybe$withDefault,
			false,
			A2(
				elm$core$Maybe$map,
				function (fix) {
					if (fix.$ === 'Bottom') {
						return true;
					} else {
						return false;
					}
				},
				configRec.options.fix));
		var isShown = !_Utils_eq(
			A2(rundis$elm_bootstrap$Bootstrap$Navbar$getOrInitDropdownStatus, ddRec.id, state),
			rundis$elm_bootstrap$Bootstrap$Navbar$Closed);
		return A2(
			elm$html$Html$li,
			_List_fromArray(
				[
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('nav-item', true),
							_Utils_Tuple2('dropdown', true),
							_Utils_Tuple2('shown', isShown),
							_Utils_Tuple2('dropup', needsDropup)
						]))
				]),
			_List_fromArray(
				[
					A4(rundis$elm_bootstrap$Bootstrap$Navbar$renderDropdownToggle, state, ddRec.id, configRec, ddRec.toggle),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('dropdown-menu', true),
									_Utils_Tuple2('show', isShown)
								]))
						]),
					A2(
						elm$core$List$map,
						function (_n1) {
							var item = _n1.a;
							return item;
						},
						ddRec.items))
				]));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$renderItemLink = function (_n0) {
	var attributes = _n0.attributes;
	var children = _n0.children;
	return A2(
		elm$html$Html$li,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('nav-item')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$a,
				_Utils_ap(
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('nav-link')
						]),
					attributes),
				children)
			]));
};
var rundis$elm_bootstrap$Bootstrap$Navbar$renderNav = F3(
	function (state, configRec, navItems) {
		return A2(
			elm$html$Html$ul,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('navbar-nav mr-auto')
				]),
			A2(
				elm$core$List$map,
				function (item) {
					if (item.$ === 'Item') {
						var item_ = item.a;
						return rundis$elm_bootstrap$Bootstrap$Navbar$renderItemLink(item_);
					} else {
						var dropdown_ = item.a;
						return A3(rundis$elm_bootstrap$Bootstrap$Navbar$renderDropdown, state, configRec, dropdown_);
					}
				},
				navItems));
	});
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$json$Json$Decode$value = _Json_decodeValue;
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$parentElement = function (decoder) {
	return A2(elm$json$Json$Decode$field, 'parentElement', decoder);
};
var rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$target = function (decoder) {
	return A2(elm$json$Json$Decode$field, 'target', decoder);
};
var rundis$elm_bootstrap$Bootstrap$Navbar$heightDecoder = function () {
	var tagDecoder = A3(
		elm$json$Json$Decode$map2,
		F2(
			function (tag, val) {
				return _Utils_Tuple2(tag, val);
			}),
		A2(elm$json$Json$Decode$field, 'tagName', elm$json$Json$Decode$string),
		elm$json$Json$Decode$value);
	var resToDec = function (res) {
		if (res.$ === 'Ok') {
			var v = res.a;
			return elm$json$Json$Decode$succeed(v);
		} else {
			var err = res.a;
			return elm$json$Json$Decode$fail(
				elm$json$Json$Decode$errorToString(err));
		}
	};
	var fromNavDec = elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				elm$json$Json$Decode$at,
				_List_fromArray(
					['childNodes', '2', 'childNodes', '0', 'offsetHeight']),
				elm$json$Json$Decode$float),
				A2(
				elm$json$Json$Decode$at,
				_List_fromArray(
					['childNodes', '1', 'childNodes', '0', 'offsetHeight']),
				elm$json$Json$Decode$float)
			]));
	var fromButtonDec = rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$parentElement(fromNavDec);
	return A2(
		elm$json$Json$Decode$andThen,
		function (_n0) {
			var tag = _n0.a;
			var val = _n0.b;
			switch (tag) {
				case 'NAV':
					return resToDec(
						A2(elm$json$Json$Decode$decodeValue, fromNavDec, val));
				case 'BUTTON':
					return resToDec(
						A2(elm$json$Json$Decode$decodeValue, fromButtonDec, val));
				default:
					return elm$json$Json$Decode$succeed(0);
			}
		},
		rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$target(
			rundis$elm_bootstrap$Bootstrap$Utilities$DomHelper$parentElement(tagDecoder)));
}();
var rundis$elm_bootstrap$Bootstrap$Navbar$toggleHandler = F2(
	function (state, configRec) {
		var height = state.a.height;
		var updState = function (h) {
			return A2(
				rundis$elm_bootstrap$Bootstrap$Navbar$mapState,
				function (s) {
					return _Utils_update(
						s,
						{
							height: elm$core$Maybe$Just(h),
							visibility: A2(rundis$elm_bootstrap$Bootstrap$Navbar$visibilityTransition, configRec.withAnimation, s.visibility)
						});
				},
				state);
		};
		return A2(
			elm$html$Html$Events$on,
			'click',
			A2(
				elm$json$Json$Decode$andThen,
				function (v) {
					return elm$json$Json$Decode$succeed(
						configRec.toMsg(
							(v > 0) ? updState(v) : updState(
								A2(elm$core$Maybe$withDefault, 0, height))));
				},
				rundis$elm_bootstrap$Bootstrap$Navbar$heightDecoder));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$view = F2(
	function (state, conf) {
		var configRec = conf.a;
		return A2(
			elm$html$Html$nav,
			rundis$elm_bootstrap$Bootstrap$Navbar$navbarAttributes(configRec.options),
			_Utils_ap(
				rundis$elm_bootstrap$Bootstrap$Navbar$maybeBrand(configRec.brand),
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							elm$html$Html$button,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class(
									'navbar-toggler' + A2(
										elm$core$Maybe$withDefault,
										'',
										A2(
											elm$core$Maybe$map,
											function (_n0) {
												return ' navbar-toggler-right';
											},
											configRec.brand))),
									elm$html$Html$Attributes$type_('button'),
									A2(rundis$elm_bootstrap$Bootstrap$Navbar$toggleHandler, state, configRec)
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('navbar-toggler-icon')
										]),
									_List_Nil)
								]))
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							A2(rundis$elm_bootstrap$Bootstrap$Navbar$menuAttributes, state, configRec),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									A2(rundis$elm_bootstrap$Bootstrap$Navbar$menuWrapperAttributes, state, configRec),
									_Utils_ap(
										_List_fromArray(
											[
												A3(rundis$elm_bootstrap$Bootstrap$Navbar$renderNav, state, configRec, configRec.items)
											]),
										rundis$elm_bootstrap$Bootstrap$Navbar$renderCustom(configRec.customItems)))
								]))
						]))));
	});
var rundis$elm_bootstrap$Bootstrap$Navbar$withAnimation = function (config_) {
	return A2(
		rundis$elm_bootstrap$Bootstrap$Navbar$updateConfig,
		function (conf) {
			return _Utils_update(
				conf,
				{withAnimation: true});
		},
		config_);
};
var author$project$View$viewNavbar = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[rundis$elm_bootstrap$Bootstrap$Utilities$Display$noneMd]),
		_List_fromArray(
			[
				A2(
				rundis$elm_bootstrap$Bootstrap$Navbar$view,
				model.navbarState,
				A2(
					rundis$elm_bootstrap$Bootstrap$Navbar$items,
					_List_fromArray(
						[
							rundis$elm_bootstrap$Bootstrap$Navbar$dropdown(
							{
								id: 'termDropdown',
								items: A2(
									elm$core$List$cons,
									rundis$elm_bootstrap$Bootstrap$Navbar$dropdownHeader(
										_List_fromArray(
											[
												elm$html$Html$text('Term')
											])),
									A2(
										elm$core$List$map,
										function (term) {
											return A2(
												rundis$elm_bootstrap$Bootstrap$Navbar$dropdownItem,
												_List_fromArray(
													[
														elm$html$Html$Attributes$href('#'),
														elm$html$Html$Events$onClick(
														author$project$Model$MakeApiRequest(
															elm$core$String$fromInt(
																function ($) {
																	return $.date;
																}(term))))
													]),
												_List_fromArray(
													[
														elm$html$Html$text(
														function ($) {
															return $.description;
														}(term))
													]));
										},
										elm$core$List$reverse(model.terms))),
								toggle: A2(
									rundis$elm_bootstrap$Bootstrap$Navbar$dropdownToggle,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(model.term)
										]))
							}),
							rundis$elm_bootstrap$Bootstrap$Navbar$dropdown(
							{
								id: 'disciplineDropdown',
								items: A2(
									elm$core$List$cons,
									rundis$elm_bootstrap$Bootstrap$Navbar$dropdownHeader(
										_List_fromArray(
											[
												elm$html$Html$text('Discipline')
											])),
									A2(
										elm$core$List$cons,
										A2(
											rundis$elm_bootstrap$Bootstrap$Navbar$dropdownItem,
											_List_fromArray(
												[
													elm$html$Html$Attributes$href('#'),
													elm$html$Html$Events$onClick(
													author$project$Model$DisciplineFilter(''))
												]),
											_List_fromArray(
												[
													elm$html$Html$text('All')
												])),
										A2(
											elm$core$List$map,
											function (discipline) {
												return A2(
													rundis$elm_bootstrap$Bootstrap$Navbar$dropdownItem,
													_List_fromArray(
														[
															elm$html$Html$Attributes$href('#'),
															elm$html$Html$Events$onClick(
															author$project$Model$DisciplineFilter(discipline))
														]),
													_List_fromArray(
														[
															elm$html$Html$text(discipline)
														]));
											},
											model.disciplines))),
								toggle: A2(
									rundis$elm_bootstrap$Bootstrap$Navbar$dropdownToggle,
									_List_Nil,
									_List_fromArray(
										[
											(model.currentDiscipline === '') ? elm$html$Html$text('All') : elm$html$Html$text(model.currentDiscipline)
										]))
							})
						]),
					A3(
						rundis$elm_bootstrap$Bootstrap$Navbar$brand,
						_List_fromArray(
							[
								elm$html$Html$Attributes$href('#')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('PSU Schedule')
							]),
						A2(
							rundis$elm_bootstrap$Bootstrap$Navbar$lightCustom,
							A3(avh4$elm_color$Color$rgb255, 255, 255, 255),
							rundis$elm_bootstrap$Bootstrap$Navbar$withAnimation(
								rundis$elm_bootstrap$Bootstrap$Navbar$collapseSmall(
									rundis$elm_bootstrap$Bootstrap$Navbar$container(
										rundis$elm_bootstrap$Bootstrap$Navbar$config(author$project$Model$NavbarMsg))))))))
			]));
};
var elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var author$project$View$viewName = function (instructor) {
	return A2(
		elm$core$Maybe$withDefault,
		elm$html$Html$text(instructor.fullName),
		A3(
			elm$core$Maybe$map2,
			F2(
				function (a, b) {
					return elm$html$Html$text(a + (' ' + b));
				}),
			instructor.firstName,
			instructor.lastName));
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm$core$Basics$isInfinite = _Basics_isInfinite;
var elm$core$Basics$isNaN = _Basics_isNaN;
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)));
	});
var elm$core$String$reverse = _String_reverse;
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var elm$core$Char$fromCode = _Char_fromCode;
var myrho$elm_round$Round$increaseNum = function (_n0) {
	var head = _n0.a;
	var tail = _n0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _n1 = elm$core$String$uncons(tail);
		if (_n1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _n1.a;
			return A2(
				elm$core$String$cons,
				_Utils_chr('0'),
				myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			elm$core$String$cons,
			elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var myrho$elm_round$Round$splitComma = function (str) {
	var _n0 = A2(elm$core$String$split, '.', str);
	if (_n0.b) {
		if (_n0.b.b) {
			var before = _n0.a;
			var _n1 = _n0.b;
			var after = _n1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _n0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var myrho$elm_round$Round$toDecimal = function (fl) {
	var _n0 = A2(
		elm$core$String$split,
		'e',
		elm$core$String$fromFloat(
			elm$core$Basics$abs(fl)));
	if (_n0.b) {
		if (_n0.b.b) {
			var num = _n0.a;
			var _n1 = _n0.b;
			var exp = _n1.a;
			var e = A2(
				elm$core$Maybe$withDefault,
				0,
				elm$core$String$toInt(
					A2(elm$core$String$startsWith, '+', exp) ? A2(elm$core$String$dropLeft, 1, exp) : exp));
			var _n2 = myrho$elm_round$Round$splitComma(num);
			var before = _n2.a;
			var after = _n2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				elm$core$Maybe$withDefault,
				'0',
				A2(
					elm$core$Maybe$map,
					function (_n3) {
						var a = _n3.a;
						var b = _n3.b;
						return a + ('.' + b);
					},
					A2(
						elm$core$Maybe$map,
						elm$core$Tuple$mapFirst(elm$core$String$fromChar),
						elm$core$String$uncons(
							_Utils_ap(
								A2(
									elm$core$String$repeat,
									elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _n0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if (elm$core$Basics$isInfinite(fl) || elm$core$Basics$isNaN(fl)) {
			return elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _n0 = myrho$elm_round$Round$splitComma(
				myrho$elm_round$Round$toDecimal(
					elm$core$Basics$abs(fl)));
			var before = _n0.a;
			var after = _n0.b;
			var r = elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2(elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = elm$core$String$length(normalized);
			var roundDigitIndex = A2(elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3(elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3(elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? elm$core$String$reverse(
				A2(
					elm$core$Maybe$withDefault,
					'1',
					A2(
						elm$core$Maybe$map,
						myrho$elm_round$Round$increaseNum,
						elm$core$String$uncons(
							elm$core$String$reverse(remains))))) : remains;
			var numLen = elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					elm$core$String$repeat,
					elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				elm$core$String$length(after)) < 0) ? (A3(elm$core$String$slice, 0, numLen - s, num) + ('.' + A3(elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2(myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var myrho$elm_round$Round$round = myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _n0 = elm$core$String$uncons(str);
			if (_n0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _n0.a.a.valueOf()) {
					if (_n0.a.b === '') {
						var _n1 = _n0.a;
						return !signed;
					} else {
						var _n2 = _n0.a;
						return true;
					}
				} else {
					var _n3 = _n0.a;
					var _int = _n3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						elm$core$Char$toCode(_int));
				}
			}
		}));
var author$project$View$viewRating = function (instructor) {
	return A2(
		elm$core$Maybe$withDefault,
		elm$html$Html$text(''),
		A3(
			elm$core$Maybe$map2,
			F2(
				function (r, u) {
					return A2(
						author$project$View$externalLink,
						u,
						A2(myrho$elm_round$Round$round, 1, r));
				}),
			instructor.rating,
			instructor.url));
};
var rundis$elm_bootstrap$Bootstrap$Table$CellAttr = function (a) {
	return {$: 'CellAttr', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$cellAttr = function (attr_) {
	return rundis$elm_bootstrap$Bootstrap$Table$CellAttr(attr_);
};
var rundis$elm_bootstrap$Bootstrap$Table$RowAttr = function (a) {
	return {$: 'RowAttr', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$rowAttr = function (attr_) {
	return rundis$elm_bootstrap$Bootstrap$Table$RowAttr(attr_);
};
var rundis$elm_bootstrap$Bootstrap$Table$Td = function (a) {
	return {$: 'Td', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$td = F2(
	function (options, children) {
		return rundis$elm_bootstrap$Bootstrap$Table$Td(
			{children: children, options: options});
	});
var rundis$elm_bootstrap$Bootstrap$Table$Row = function (a) {
	return {$: 'Row', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$tr = F2(
	function (options, cells) {
		return rundis$elm_bootstrap$Bootstrap$Table$Row(
			{cells: cells, options: options});
	});
var rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellLg = elm$html$Html$Attributes$class('d-lg-table-cell');
var rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellSm = elm$html$Html$Attributes$class('d-sm-table-cell');
var rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellXl = elm$html$Html$Attributes$class('d-xl-table-cell');
var rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableRowSm = elm$html$Html$Attributes$class('d-sm-table-row');
var rundis$elm_bootstrap$Bootstrap$Utilities$Flex$col = elm$html$Html$Attributes$class('flex-column');
var rundis$elm_bootstrap$Bootstrap$Utilities$Flex$nowrap = elm$html$Html$Attributes$class('flex-nowrap');
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr0 = elm$html$Html$Attributes$class('pr-0');
var author$project$View$courseRow = function (c) {
	return A2(
		rundis$elm_bootstrap$Bootstrap$Table$tr,
		_List_fromArray(
			[
				rundis$elm_bootstrap$Bootstrap$Table$rowAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Flex$col),
				rundis$elm_bootstrap$Bootstrap$Table$rowAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
				rundis$elm_bootstrap$Bootstrap$Table$rowAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableRowSm)
			]),
		_List_fromArray(
			[
				A2(
				rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
						A2(elm$html$Html$Attributes$style, 'display', 'none')),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
						A2(elm$html$Html$Attributes$style, 'visibility', 'hidden'))
					]),
				_List_fromArray(
					[
						elm$html$Html$text(
						elm$core$String$fromInt(c.course.id))
					])),
				A2(
				rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
						elm$html$Html$Attributes$class('text-nowrap')),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr0)
					]),
				_List_fromArray(
					[
						elm$html$Html$text(c.course.number)
					])),
				A2(
				rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellSm),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Flex$nowrap)
					]),
				_List_fromArray(
					[
						elm$html$Html$text(c.course.name)
					])),
				A2(
				rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellLg),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pr0)
					]),
				_List_fromArray(
					[
						A2(
						elm$core$Maybe$withDefault,
						elm$html$Html$text(''),
						A2(
							elm$core$Maybe$map,
							function (days) {
								return elm$html$Html$text(days);
							},
							c.days))
					])),
				A2(
				rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellLg),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
						elm$html$Html$Attributes$class('text-nowrap'))
					]),
				_List_fromArray(
					[
						A2(
						elm$core$Maybe$withDefault,
						elm$html$Html$text(''),
						A2(
							elm$core$Maybe$map,
							function (time) {
								return elm$html$Html$text(time);
							},
							c.time))
					])),
				A2(
				rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellXl)
					]),
				_List_fromArray(
					[
						elm$html$Html$text(
						elm$core$String$fromInt(c.credits))
					])),
				A2(
				rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
						A2(elm$html$Html$Attributes$style, 'display', 'none')),
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
						A2(elm$html$Html$Attributes$style, 'visibility', 'hidden'))
					]),
				_List_fromArray(
					[
						elm$html$Html$text(
						elm$core$String$fromInt(c.crn))
					])),
				A2(
				rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellSm)
					]),
				_List_fromArray(
					[
						A2(
						elm$core$Maybe$withDefault,
						elm$html$Html$text(''),
						A2(elm$core$Maybe$map, author$project$View$viewName, c.instructor))
					])),
				A2(
				rundis$elm_bootstrap$Bootstrap$Table$td,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellSm)
					]),
				_List_fromArray(
					[
						A2(
						elm$core$Maybe$withDefault,
						elm$html$Html$text(''),
						A2(elm$core$Maybe$map, author$project$View$viewRating, c.instructor))
					]))
			]));
};
var elm$core$String$toLower = _String_toLower;
var author$project$View$filterCourse = F3(
	function (search, filter, c) {
		var startsWithSearch = A2(
			elm$core$String$startsWith,
			elm$core$String$toLower(search),
			elm$core$String$toLower(c.course.number));
		var startsWithFilter = A2(
			elm$core$String$startsWith,
			elm$core$String$toLower(filter),
			elm$core$String$toLower(c.course.discipline));
		var containsName = A2(
			elm$core$String$contains,
			elm$core$String$toLower(search),
			elm$core$String$toLower(c.course.name));
		return startsWithFilter && (startsWithSearch || containsName);
	});
var rundis$elm_bootstrap$Bootstrap$Table$HeadAttr = function (a) {
	return {$: 'HeadAttr', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$headAttr = function (attr_) {
	return rundis$elm_bootstrap$Bootstrap$Table$HeadAttr(attr_);
};
var rundis$elm_bootstrap$Bootstrap$Table$Hover = {$: 'Hover'};
var rundis$elm_bootstrap$Bootstrap$Table$hover = rundis$elm_bootstrap$Bootstrap$Table$Hover;
var rundis$elm_bootstrap$Bootstrap$Table$Responsive = function (a) {
	return {$: 'Responsive', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$responsive = rundis$elm_bootstrap$Bootstrap$Table$Responsive(elm$core$Maybe$Nothing);
var rundis$elm_bootstrap$Bootstrap$Table$Striped = {$: 'Striped'};
var rundis$elm_bootstrap$Bootstrap$Table$striped = rundis$elm_bootstrap$Bootstrap$Table$Striped;
var elm$html$Html$table = _VirtualDom_node('table');
var rundis$elm_bootstrap$Bootstrap$Table$Inversed = {$: 'Inversed'};
var rundis$elm_bootstrap$Bootstrap$Table$isResponsive = function (option) {
	if (option.$ === 'Responsive') {
		return true;
	} else {
		return false;
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$KeyedTBody = function (a) {
	return {$: 'KeyedTBody', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$TBody = function (a) {
	return {$: 'TBody', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$InversedRow = function (a) {
	return {$: 'InversedRow', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$KeyedRow = function (a) {
	return {$: 'KeyedRow', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$InversedCell = function (a) {
	return {$: 'InversedCell', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$Th = function (a) {
	return {$: 'Th', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$mapInversedCell = function (cell) {
	var inverseOptions = function (options) {
		return A2(
			elm$core$List$map,
			function (opt) {
				if (opt.$ === 'RoledCell') {
					var role = opt.a;
					return rundis$elm_bootstrap$Bootstrap$Table$InversedCell(role);
				} else {
					return opt;
				}
			},
			options);
	};
	if (cell.$ === 'Th') {
		var cellCfg = cell.a;
		return rundis$elm_bootstrap$Bootstrap$Table$Th(
			_Utils_update(
				cellCfg,
				{
					options: inverseOptions(cellCfg.options)
				}));
	} else {
		var cellCfg = cell.a;
		return rundis$elm_bootstrap$Bootstrap$Table$Td(
			_Utils_update(
				cellCfg,
				{
					options: inverseOptions(cellCfg.options)
				}));
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$mapInversedRow = function (row) {
	var inversedOptions = function (options) {
		return A2(
			elm$core$List$map,
			function (opt) {
				if (opt.$ === 'RoledRow') {
					var role = opt.a;
					return rundis$elm_bootstrap$Bootstrap$Table$InversedRow(role);
				} else {
					return opt;
				}
			},
			options);
	};
	if (row.$ === 'Row') {
		var options = row.a.options;
		var cells = row.a.cells;
		return rundis$elm_bootstrap$Bootstrap$Table$Row(
			{
				cells: A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Table$mapInversedCell, cells),
				options: inversedOptions(options)
			});
	} else {
		var options = row.a.options;
		var cells = row.a.cells;
		return rundis$elm_bootstrap$Bootstrap$Table$KeyedRow(
			{
				cells: A2(
					elm$core$List$map,
					function (_n1) {
						var key = _n1.a;
						var cell = _n1.b;
						return _Utils_Tuple2(
							key,
							rundis$elm_bootstrap$Bootstrap$Table$mapInversedCell(cell));
					},
					cells),
				options: inversedOptions(options)
			});
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$maybeMapInversedTBody = F2(
	function (isTableInversed, tbody_) {
		var _n0 = _Utils_Tuple2(isTableInversed, tbody_);
		if (!_n0.a) {
			return tbody_;
		} else {
			if (_n0.b.$ === 'TBody') {
				var body = _n0.b.a;
				return rundis$elm_bootstrap$Bootstrap$Table$TBody(
					_Utils_update(
						body,
						{
							rows: A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Table$mapInversedRow, body.rows)
						}));
			} else {
				var keyedBody = _n0.b.a;
				return rundis$elm_bootstrap$Bootstrap$Table$KeyedTBody(
					_Utils_update(
						keyedBody,
						{
							rows: A2(
								elm$core$List$map,
								function (_n1) {
									var key = _n1.a;
									var row = _n1.b;
									return _Utils_Tuple2(
										key,
										rundis$elm_bootstrap$Bootstrap$Table$mapInversedRow(row));
								},
								keyedBody.rows)
						}));
			}
		}
	});
var rundis$elm_bootstrap$Bootstrap$Table$InversedHead = {$: 'InversedHead'};
var rundis$elm_bootstrap$Bootstrap$Table$THead = function (a) {
	return {$: 'THead', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$maybeMapInversedTHead = F2(
	function (isTableInversed, _n0) {
		var thead_ = _n0.a;
		var isHeadInversed = A2(
			elm$core$List$any,
			function (opt) {
				return _Utils_eq(opt, rundis$elm_bootstrap$Bootstrap$Table$InversedHead);
			},
			thead_.options);
		return rundis$elm_bootstrap$Bootstrap$Table$THead(
			(isTableInversed || isHeadInversed) ? _Utils_update(
				thead_,
				{
					rows: A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Table$mapInversedRow, thead_.rows)
				}) : thead_);
	});
var rundis$elm_bootstrap$Bootstrap$Table$maybeWrapResponsive = F2(
	function (options, table_) {
		var responsiveClass = elm$html$Html$Attributes$class(
			'table-responsive' + A2(
				elm$core$Maybe$withDefault,
				'',
				A2(
					elm$core$Maybe$map,
					function (v) {
						return '-' + v;
					},
					A2(
						elm$core$Maybe$andThen,
						rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption,
						A2(
							elm$core$Maybe$andThen,
							function (opt) {
								if (opt.$ === 'Responsive') {
									var val = opt.a;
									return val;
								} else {
									return elm$core$Maybe$Nothing;
								}
							},
							elm$core$List$head(
								A2(elm$core$List$filter, rundis$elm_bootstrap$Bootstrap$Table$isResponsive, options)))))));
		return A2(elm$core$List$any, rundis$elm_bootstrap$Bootstrap$Table$isResponsive, options) ? A2(
			elm$html$Html$div,
			_List_fromArray(
				[responsiveClass]),
			_List_fromArray(
				[table_])) : table_;
	});
var elm$html$Html$tbody = _VirtualDom_node('tbody');
var elm$html$Html$Attributes$scope = elm$html$Html$Attributes$stringProperty('scope');
var rundis$elm_bootstrap$Bootstrap$Table$addScopeIfTh = function (cell) {
	if (cell.$ === 'Th') {
		var cellConfig = cell.a;
		return rundis$elm_bootstrap$Bootstrap$Table$Th(
			_Utils_update(
				cellConfig,
				{
					options: A2(
						elm$core$List$cons,
						rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
							elm$html$Html$Attributes$scope('row')),
						cellConfig.options)
				}));
	} else {
		return cell;
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$maybeAddScopeToFirstCell = function (row) {
	if (row.$ === 'Row') {
		var options = row.a.options;
		var cells = row.a.cells;
		if (!cells.b) {
			return row;
		} else {
			var first = cells.a;
			var rest = cells.b;
			return rundis$elm_bootstrap$Bootstrap$Table$Row(
				{
					cells: A2(
						elm$core$List$cons,
						rundis$elm_bootstrap$Bootstrap$Table$addScopeIfTh(first),
						rest),
					options: options
				});
		}
	} else {
		var options = row.a.options;
		var cells = row.a.cells;
		if (!cells.b) {
			return row;
		} else {
			var _n3 = cells.a;
			var firstKey = _n3.a;
			var first = _n3.b;
			var rest = cells.b;
			return rundis$elm_bootstrap$Bootstrap$Table$KeyedRow(
				{
					cells: A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							firstKey,
							rundis$elm_bootstrap$Bootstrap$Table$addScopeIfTh(first)),
						rest),
					options: options
				});
		}
	}
};
var elm$html$Html$tr = _VirtualDom_node('tr');
var elm$html$Html$td = _VirtualDom_node('td');
var elm$html$Html$th = _VirtualDom_node('th');
var rundis$elm_bootstrap$Bootstrap$Table$cellAttribute = function (option) {
	switch (option.$) {
		case 'RoledCell':
			if (option.a.$ === 'Roled') {
				var role = option.a.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'table', role);
			} else {
				var _n1 = option.a;
				return elm$html$Html$Attributes$class('table-active');
			}
		case 'InversedCell':
			if (option.a.$ === 'Roled') {
				var role = option.a.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'bg-', role);
			} else {
				var _n2 = option.a;
				return elm$html$Html$Attributes$class('bg-active');
			}
		default:
			var attr_ = option.a;
			return attr_;
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$cellAttributes = function (options) {
	return A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Table$cellAttribute, options);
};
var rundis$elm_bootstrap$Bootstrap$Table$renderCell = function (cell) {
	if (cell.$ === 'Td') {
		var options = cell.a.options;
		var children = cell.a.children;
		return A2(
			elm$html$Html$td,
			rundis$elm_bootstrap$Bootstrap$Table$cellAttributes(options),
			children);
	} else {
		var options = cell.a.options;
		var children = cell.a.children;
		return A2(
			elm$html$Html$th,
			rundis$elm_bootstrap$Bootstrap$Table$cellAttributes(options),
			children);
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$rowClass = function (option) {
	switch (option.$) {
		case 'RoledRow':
			if (option.a.$ === 'Roled') {
				var role_ = option.a.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'table', role_);
			} else {
				var _n1 = option.a;
				return elm$html$Html$Attributes$class('table-active');
			}
		case 'InversedRow':
			if (option.a.$ === 'Roled') {
				var role_ = option.a.a;
				return A2(rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'bg', role_);
			} else {
				var _n2 = option.a;
				return elm$html$Html$Attributes$class('bg-active');
			}
		default:
			var attr_ = option.a;
			return attr_;
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$rowAttributes = function (options) {
	return A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Table$rowClass, options);
};
var rundis$elm_bootstrap$Bootstrap$Table$renderRow = function (row) {
	if (row.$ === 'Row') {
		var options = row.a.options;
		var cells = row.a.cells;
		return A2(
			elm$html$Html$tr,
			rundis$elm_bootstrap$Bootstrap$Table$rowAttributes(options),
			A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Table$renderCell, cells));
	} else {
		var options = row.a.options;
		var cells = row.a.cells;
		return A3(
			elm$html$Html$Keyed$node,
			'tr',
			rundis$elm_bootstrap$Bootstrap$Table$rowAttributes(options),
			A2(
				elm$core$List$map,
				function (_n1) {
					var key = _n1.a;
					var cell = _n1.b;
					return _Utils_Tuple2(
						key,
						rundis$elm_bootstrap$Bootstrap$Table$renderCell(cell));
				},
				cells));
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$renderTBody = function (body) {
	if (body.$ === 'TBody') {
		var attributes = body.a.attributes;
		var rows = body.a.rows;
		return A2(
			elm$html$Html$tbody,
			attributes,
			A2(
				elm$core$List$map,
				function (row) {
					return rundis$elm_bootstrap$Bootstrap$Table$renderRow(
						rundis$elm_bootstrap$Bootstrap$Table$maybeAddScopeToFirstCell(row));
				},
				rows));
	} else {
		var attributes = body.a.attributes;
		var rows = body.a.rows;
		return A3(
			elm$html$Html$Keyed$node,
			'tbody',
			attributes,
			A2(
				elm$core$List$map,
				function (_n1) {
					var key = _n1.a;
					var row = _n1.b;
					return _Utils_Tuple2(
						key,
						rundis$elm_bootstrap$Bootstrap$Table$renderRow(
							rundis$elm_bootstrap$Bootstrap$Table$maybeAddScopeToFirstCell(row)));
				},
				rows));
	}
};
var elm$html$Html$thead = _VirtualDom_node('thead');
var rundis$elm_bootstrap$Bootstrap$Table$theadAttribute = function (option) {
	switch (option.$) {
		case 'InversedHead':
			return elm$html$Html$Attributes$class('thead-dark');
		case 'DefaultHead':
			return elm$html$Html$Attributes$class('thead-default');
		default:
			var attr_ = option.a;
			return attr_;
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$theadAttributes = function (options) {
	return A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Table$theadAttribute, options);
};
var rundis$elm_bootstrap$Bootstrap$Table$renderTHead = function (_n0) {
	var options = _n0.a.options;
	var rows = _n0.a.rows;
	return A2(
		elm$html$Html$thead,
		rundis$elm_bootstrap$Bootstrap$Table$theadAttributes(options),
		A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Table$renderRow, rows));
};
var rundis$elm_bootstrap$Bootstrap$Table$tableClass = function (option) {
	switch (option.$) {
		case 'Inversed':
			return elm$core$Maybe$Just(
				elm$html$Html$Attributes$class('table-dark'));
		case 'Striped':
			return elm$core$Maybe$Just(
				elm$html$Html$Attributes$class('table-striped'));
		case 'Bordered':
			return elm$core$Maybe$Just(
				elm$html$Html$Attributes$class('table-bordered'));
		case 'Hover':
			return elm$core$Maybe$Just(
				elm$html$Html$Attributes$class('table-hover'));
		case 'Small':
			return elm$core$Maybe$Just(
				elm$html$Html$Attributes$class('table-sm'));
		case 'Responsive':
			return elm$core$Maybe$Nothing;
		case 'Reflow':
			return elm$core$Maybe$Just(
				elm$html$Html$Attributes$class('table-reflow'));
		default:
			var attr_ = option.a;
			return elm$core$Maybe$Just(attr_);
	}
};
var rundis$elm_bootstrap$Bootstrap$Table$tableAttributes = function (options) {
	return A2(
		elm$core$List$cons,
		elm$html$Html$Attributes$class('table'),
		A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			A2(elm$core$List$map, rundis$elm_bootstrap$Bootstrap$Table$tableClass, options)));
};
var rundis$elm_bootstrap$Bootstrap$Table$table = function (rec) {
	var isInversed = A2(
		elm$core$List$any,
		function (opt) {
			return _Utils_eq(opt, rundis$elm_bootstrap$Bootstrap$Table$Inversed);
		},
		rec.options);
	var classOptions = A2(
		elm$core$List$filter,
		function (opt) {
			return !rundis$elm_bootstrap$Bootstrap$Table$isResponsive(opt);
		},
		rec.options);
	return A2(
		rundis$elm_bootstrap$Bootstrap$Table$maybeWrapResponsive,
		rec.options,
		A2(
			elm$html$Html$table,
			rundis$elm_bootstrap$Bootstrap$Table$tableAttributes(classOptions),
			_List_fromArray(
				[
					rundis$elm_bootstrap$Bootstrap$Table$renderTHead(
					A2(rundis$elm_bootstrap$Bootstrap$Table$maybeMapInversedTHead, isInversed, rec.thead)),
					rundis$elm_bootstrap$Bootstrap$Table$renderTBody(
					A2(rundis$elm_bootstrap$Bootstrap$Table$maybeMapInversedTBody, isInversed, rec.tbody))
				])));
};
var rundis$elm_bootstrap$Bootstrap$Table$tbody = F2(
	function (attributes, rows) {
		return rundis$elm_bootstrap$Bootstrap$Table$TBody(
			{attributes: attributes, rows: rows});
	});
var rundis$elm_bootstrap$Bootstrap$Table$th = F2(
	function (options, children) {
		return rundis$elm_bootstrap$Bootstrap$Table$Th(
			{children: children, options: options});
	});
var rundis$elm_bootstrap$Bootstrap$Table$thead = F2(
	function (options, rows) {
		return rundis$elm_bootstrap$Bootstrap$Table$THead(
			{options: options, rows: rows});
	});
var author$project$View$courseTable = function (model) {
	return rundis$elm_bootstrap$Bootstrap$Table$table(
		{
			options: _List_fromArray(
				[rundis$elm_bootstrap$Bootstrap$Table$hover, rundis$elm_bootstrap$Bootstrap$Table$responsive, rundis$elm_bootstrap$Bootstrap$Table$striped]),
			tbody: A2(
				rundis$elm_bootstrap$Bootstrap$Table$tbody,
				_List_Nil,
				A2(
					elm$core$List$map,
					author$project$View$courseRow,
					A2(
						elm$core$List$filter,
						A2(author$project$View$filterCourse, model.search, model.currentDiscipline),
						model.classes))),
			thead: A2(
				rundis$elm_bootstrap$Bootstrap$Table$thead,
				_List_fromArray(
					[
						rundis$elm_bootstrap$Bootstrap$Table$headAttr(
						elm$html$Html$Attributes$class('thead-dark'))
					]),
				_List_fromArray(
					[
						A2(
						rundis$elm_bootstrap$Bootstrap$Table$tr,
						_List_fromArray(
							[
								rundis$elm_bootstrap$Bootstrap$Table$rowAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
								rundis$elm_bootstrap$Bootstrap$Table$rowAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableRowSm)
							]),
						_List_fromArray(
							[
								A2(
								rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_fromArray(
									[
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
										A2(elm$html$Html$Attributes$style, 'display', 'none')),
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(
										A2(elm$html$Html$Attributes$style, 'visibility', 'hidden'))
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Id')
									])),
								A2(
								rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('Class')
									])),
								A2(
								rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_fromArray(
									[
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellSm)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Name')
									])),
								A2(
								rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_fromArray(
									[
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellLg)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Days')
									])),
								A2(
								rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_fromArray(
									[
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellLg)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Time')
									])),
								A2(
								rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_fromArray(
									[
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$none),
										rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Display$tableCellXl)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Credits')
									])),
								A2(
								rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('Instructor')
									])),
								A2(
								rundis$elm_bootstrap$Bootstrap$Table$th,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('Rating')
									]))
							]))
					]))
		});
};
var rundis$elm_bootstrap$Bootstrap$Internal$Role$Dark = {$: 'Dark'};
var rundis$elm_bootstrap$Bootstrap$Table$Roled = function (a) {
	return {$: 'Roled', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$RoledCell = function (a) {
	return {$: 'RoledCell', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Table$cellDark = rundis$elm_bootstrap$Bootstrap$Table$RoledCell(
	rundis$elm_bootstrap$Bootstrap$Table$Roled(rundis$elm_bootstrap$Bootstrap$Internal$Role$Dark));
var rundis$elm_bootstrap$Bootstrap$Utilities$Flex$wrap = elm$html$Html$Attributes$class('flex-wrap');
var author$project$View$mobileCourseRow = function (c) {
	return _List_fromArray(
		[
			A2(
			rundis$elm_bootstrap$Bootstrap$Table$tr,
			_List_fromArray(
				[
					rundis$elm_bootstrap$Bootstrap$Table$rowAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Flex$col)
				]),
			_List_fromArray(
				[
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$th,
					_List_fromArray(
						[rundis$elm_bootstrap$Bootstrap$Table$cellDark]),
					_List_fromArray(
						[
							elm$html$Html$text('Class')
						])),
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_fromArray(
						[rundis$elm_bootstrap$Bootstrap$Table$cellDark]),
					_List_fromArray(
						[
							elm$html$Html$text(c.course.number)
						]))
				])),
			A2(
			rundis$elm_bootstrap$Bootstrap$Table$tr,
			_List_fromArray(
				[
					rundis$elm_bootstrap$Bootstrap$Table$rowAttr(
					A2(elm$html$Html$Attributes$style, 'word-wrap', 'break-word')),
					rundis$elm_bootstrap$Bootstrap$Table$rowAttr(
					A2(elm$html$Html$Attributes$style, 'word-break', 'break-all'))
				]),
			_List_fromArray(
				[
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$th,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Name')
						])),
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_fromArray(
						[
							rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Flex$wrap)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(c.course.name)
						]))
				])),
			A2(
			rundis$elm_bootstrap$Bootstrap$Table$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$th,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Days')
						])),
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$core$Maybe$withDefault,
							elm$html$Html$text(''),
							A2(
								elm$core$Maybe$map,
								function (days) {
									return elm$html$Html$text(days);
								},
								c.days))
						]))
				])),
			A2(
			rundis$elm_bootstrap$Bootstrap$Table$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$th,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Time')
						])),
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$core$Maybe$withDefault,
							elm$html$Html$text(''),
							A2(
								elm$core$Maybe$map,
								function (time) {
									return elm$html$Html$text(time);
								},
								c.time))
						]))
				])),
			A2(
			rundis$elm_bootstrap$Bootstrap$Table$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$th,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Instructor')
						])),
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_fromArray(
						[
							rundis$elm_bootstrap$Bootstrap$Table$cellAttr(rundis$elm_bootstrap$Bootstrap$Utilities$Flex$wrap)
						]),
					_List_fromArray(
						[
							A2(
							elm$core$Maybe$withDefault,
							elm$html$Html$text(''),
							A2(elm$core$Maybe$map, author$project$View$viewName, c.instructor))
						]))
				])),
			A2(
			rundis$elm_bootstrap$Bootstrap$Table$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$th,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Rating')
						])),
					A2(
					rundis$elm_bootstrap$Bootstrap$Table$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$core$Maybe$withDefault,
							elm$html$Html$text(''),
							A2(elm$core$Maybe$map, author$project$View$viewRating, c.instructor))
						]))
				])),
			A2(
			rundis$elm_bootstrap$Bootstrap$Table$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(rundis$elm_bootstrap$Bootstrap$Table$th, _List_Nil, _List_Nil),
					A2(rundis$elm_bootstrap$Bootstrap$Table$td, _List_Nil, _List_Nil)
				]))
		]);
};
var rundis$elm_bootstrap$Bootstrap$Utilities$Display$noneSm = elm$html$Html$Attributes$class('d-sm-none');
var author$project$View$mobileCourseTable = function (model) {
	return rundis$elm_bootstrap$Bootstrap$Table$table(
		{
			options: _List_Nil,
			tbody: A2(
				rundis$elm_bootstrap$Bootstrap$Table$tbody,
				_List_fromArray(
					[rundis$elm_bootstrap$Bootstrap$Utilities$Display$noneSm]),
				A3(
					elm$core$List$foldr,
					elm$core$Basics$append,
					_List_Nil,
					A2(
						elm$core$List$map,
						author$project$View$mobileCourseRow,
						A2(
							elm$core$List$filter,
							A2(author$project$View$filterCourse, model.search, model.currentDiscipline),
							model.classes)))),
			thead: A2(rundis$elm_bootstrap$Bootstrap$Table$thead, _List_Nil, _List_Nil)
		});
};
var author$project$Model$Search = function (a) {
	return {$: 'Search', a: a};
};
var elm$html$Html$Attributes$autocomplete = function (bool) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$Attrs = function (a) {
	return {$: 'Attrs', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$attrs = function (attrs_) {
	return rundis$elm_bootstrap$Bootstrap$Form$Input$Attrs(attrs_);
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$Id = function (a) {
	return {$: 'Id', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$id = function (id_) {
	return rundis$elm_bootstrap$Bootstrap$Form$Input$Id(id_);
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$OnInput = function (a) {
	return {$: 'OnInput', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$onInput = function (toMsg) {
	return rundis$elm_bootstrap$Bootstrap$Form$Input$OnInput(toMsg);
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$Placeholder = function (a) {
	return {$: 'Placeholder', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$placeholder = function (value_) {
	return rundis$elm_bootstrap$Bootstrap$Form$Input$Placeholder(value_);
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$Search = {$: 'Search'};
var rundis$elm_bootstrap$Bootstrap$Form$Input$Input = function (a) {
	return {$: 'Input', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$Type = function (a) {
	return {$: 'Type', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$create = F2(
	function (tipe, options) {
		return rundis$elm_bootstrap$Bootstrap$Form$Input$Input(
			{
				options: A2(
					elm$core$List$cons,
					rundis$elm_bootstrap$Bootstrap$Form$Input$Type(tipe),
					options)
			});
	});
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$html$Html$Attributes$readonly = elm$html$Html$Attributes$boolProperty('readOnly');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$applyModifier = F2(
	function (modifier, options) {
		switch (modifier.$) {
			case 'Size':
				var size_ = modifier.a;
				return _Utils_update(
					options,
					{
						size: elm$core$Maybe$Just(size_)
					});
			case 'Id':
				var id_ = modifier.a;
				return _Utils_update(
					options,
					{
						id: elm$core$Maybe$Just(id_)
					});
			case 'Type':
				var tipe = modifier.a;
				return _Utils_update(
					options,
					{tipe: tipe});
			case 'Disabled':
				var val = modifier.a;
				return _Utils_update(
					options,
					{disabled: val});
			case 'Value':
				var value_ = modifier.a;
				return _Utils_update(
					options,
					{
						value: elm$core$Maybe$Just(value_)
					});
			case 'Placeholder':
				var value_ = modifier.a;
				return _Utils_update(
					options,
					{
						placeholder: elm$core$Maybe$Just(value_)
					});
			case 'OnInput':
				var onInput_ = modifier.a;
				return _Utils_update(
					options,
					{
						onInput: elm$core$Maybe$Just(onInput_)
					});
			case 'Validation':
				var validation_ = modifier.a;
				return _Utils_update(
					options,
					{
						validation: elm$core$Maybe$Just(validation_)
					});
			case 'Readonly':
				var val = modifier.a;
				return _Utils_update(
					options,
					{readonly: val});
			default:
				var attrs_ = modifier.a;
				return _Utils_update(
					options,
					{
						attributes: _Utils_ap(options.attributes, attrs_)
					});
		}
	});
var rundis$elm_bootstrap$Bootstrap$Form$Input$Text = {$: 'Text'};
var rundis$elm_bootstrap$Bootstrap$Form$Input$defaultOptions = {attributes: _List_Nil, disabled: false, id: elm$core$Maybe$Nothing, onInput: elm$core$Maybe$Nothing, placeholder: elm$core$Maybe$Nothing, readonly: false, size: elm$core$Maybe$Nothing, tipe: rundis$elm_bootstrap$Bootstrap$Form$Input$Text, validation: elm$core$Maybe$Nothing, value: elm$core$Maybe$Nothing};
var rundis$elm_bootstrap$Bootstrap$Form$Input$sizeAttribute = function (size) {
	return A2(
		elm$core$Maybe$map,
		function (s) {
			return elm$html$Html$Attributes$class('form-control-' + s);
		},
		rundis$elm_bootstrap$Bootstrap$General$Internal$screenSizeOption(size));
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$typeAttribute = function (inputType) {
	return elm$html$Html$Attributes$type_(
		function () {
			switch (inputType.$) {
				case 'Text':
					return 'text';
				case 'Password':
					return 'password';
				case 'DatetimeLocal':
					return 'datetime-local';
				case 'Date':
					return 'date';
				case 'Month':
					return 'month';
				case 'Time':
					return 'time';
				case 'Week':
					return 'week';
				case 'Number':
					return 'number';
				case 'Email':
					return 'email';
				case 'Url':
					return 'url';
				case 'Search':
					return 'search';
				case 'Tel':
					return 'tel';
				default:
					return 'color';
			}
		}());
};
var rundis$elm_bootstrap$Bootstrap$Form$FormInternal$validationToString = function (validation) {
	if (validation.$ === 'Success') {
		return 'is-valid';
	} else {
		return 'is-invalid';
	}
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$validationAttribute = function (validation) {
	return elm$html$Html$Attributes$class(
		rundis$elm_bootstrap$Bootstrap$Form$FormInternal$validationToString(validation));
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$toAttributes = function (modifiers) {
	var options = A3(elm$core$List$foldl, rundis$elm_bootstrap$Bootstrap$Form$Input$applyModifier, rundis$elm_bootstrap$Bootstrap$Form$Input$defaultOptions, modifiers);
	return _Utils_ap(
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('form-control'),
				elm$html$Html$Attributes$disabled(options.disabled),
				elm$html$Html$Attributes$readonly(options.readonly),
				rundis$elm_bootstrap$Bootstrap$Form$Input$typeAttribute(options.tipe)
			]),
		_Utils_ap(
			A2(
				elm$core$List$filterMap,
				elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(elm$core$Maybe$map, elm$html$Html$Attributes$id, options.id),
						A2(elm$core$Maybe$andThen, rundis$elm_bootstrap$Bootstrap$Form$Input$sizeAttribute, options.size),
						A2(elm$core$Maybe$map, elm$html$Html$Attributes$value, options.value),
						A2(elm$core$Maybe$map, elm$html$Html$Attributes$placeholder, options.placeholder),
						A2(elm$core$Maybe$map, elm$html$Html$Events$onInput, options.onInput),
						A2(elm$core$Maybe$map, rundis$elm_bootstrap$Bootstrap$Form$Input$validationAttribute, options.validation)
					])),
			options.attributes));
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$view = function (_n0) {
	var options = _n0.a.options;
	return A2(
		elm$html$Html$input,
		rundis$elm_bootstrap$Bootstrap$Form$Input$toAttributes(options),
		_List_Nil);
};
var rundis$elm_bootstrap$Bootstrap$Form$Input$input = F2(
	function (tipe, options) {
		return rundis$elm_bootstrap$Bootstrap$Form$Input$view(
			A2(rundis$elm_bootstrap$Bootstrap$Form$Input$create, tipe, options));
	});
var rundis$elm_bootstrap$Bootstrap$Form$Input$search = rundis$elm_bootstrap$Bootstrap$Form$Input$input(rundis$elm_bootstrap$Bootstrap$Form$Input$Search);
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb4 = elm$html$Html$Attributes$class('mb-4');
var author$project$View$viewInput = rundis$elm_bootstrap$Bootstrap$Form$Input$search(
	_List_fromArray(
		[
			rundis$elm_bootstrap$Bootstrap$Form$Input$id('searchInput'),
			rundis$elm_bootstrap$Bootstrap$Form$Input$placeholder('Search for class..'),
			rundis$elm_bootstrap$Bootstrap$Form$Input$onInput(author$project$Model$Search),
			rundis$elm_bootstrap$Bootstrap$Form$Input$attrs(
			_List_fromArray(
				[
					rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$mb4,
					elm$html$Html$Attributes$autocomplete(false)
				]))
		]));
var elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var elm$html$Html$Lazy$lazy = elm$virtual_dom$VirtualDom$lazy;
var author$project$View$viewPage = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				author$project$View$viewInput,
				A2(elm$html$Html$Lazy$lazy, author$project$View$mobileCourseTable, model),
				A2(elm$html$Html$Lazy$lazy, author$project$View$courseTable, model)
			]));
};
var elm$html$Html$b = _VirtualDom_node('b');
var author$project$View$sidebarLink = F2(
	function (model, string) {
		var disciplineText = _Utils_eq(model.currentDiscipline, string) ? A2(
			elm$html$Html$b,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(string)
				])) : elm$html$Html$text(string);
		return A2(
			elm$html$Html$li,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'font-size', '0.8em'),
					A2(elm$html$Html$Attributes$style, 'color', '#99979c'),
					elm$html$Html$Events$onClick(
					author$project$Model$DisciplineFilter(string)),
					A2(elm$html$Html$Attributes$style, 'cursor', 'pointer')
				]),
			_List_fromArray(
				[disciplineText]));
	});
var rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pl2 = elm$html$Html$Attributes$class('pl-2');
var author$project$View$viewSidebar = function (model) {
	return A2(
		elm$html$Html$nav,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('bd-links')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('bd-toc-item active')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Disciplines'),
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('bd-sidenav'),
								A2(elm$html$Html$Attributes$style, 'list-style-type', 'none'),
								rundis$elm_bootstrap$Bootstrap$Utilities$Spacing$pl2
							]),
						A2(
							elm$core$List$cons,
							A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										A2(elm$html$Html$Attributes$style, 'font-size', '0.8em'),
										A2(elm$html$Html$Attributes$style, 'color', '#99979c'),
										elm$html$Html$Events$onClick(
										author$project$Model$DisciplineFilter('')),
										A2(elm$html$Html$Attributes$style, 'cursor', 'pointer')
									]),
								_List_fromArray(
									[
										(model.currentDiscipline === '') ? A2(
										elm$html$Html$b,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('All')
											])) : elm$html$Html$text('All')
									])),
							A2(
								elm$core$List$map,
								author$project$View$sidebarLink(model),
								model.disciplines)))
					]))
			]));
};
var elm$html$Html$main_ = _VirtualDom_node('main');
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col10 = {$: 'Col10'};
var rundis$elm_bootstrap$Bootstrap$Grid$Col$md10 = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, rundis$elm_bootstrap$Bootstrap$General$Internal$MD, rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col10);
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col2 = {$: 'Col2'};
var rundis$elm_bootstrap$Bootstrap$Grid$Col$md2 = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, rundis$elm_bootstrap$Bootstrap$General$Internal$MD, rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col2);
var rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col8 = {$: 'Col8'};
var rundis$elm_bootstrap$Bootstrap$Grid$Col$xl8 = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$width, rundis$elm_bootstrap$Bootstrap$General$Internal$XL, rundis$elm_bootstrap$Bootstrap$Grid$Internal$Col8);
var rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs = A2(rundis$elm_bootstrap$Bootstrap$Grid$Internal$rowHAlign, rundis$elm_bootstrap$Bootstrap$General$Internal$XS, rundis$elm_bootstrap$Bootstrap$General$Internal$Center);
var author$project$View$renderPage = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				author$project$View$viewNavbar(model),
				author$project$View$pageHeader(model),
				A2(
				rundis$elm_bootstrap$Bootstrap$Grid$containerFluid,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						rundis$elm_bootstrap$Bootstrap$Grid$row,
						_List_fromArray(
							[rundis$elm_bootstrap$Bootstrap$Grid$Row$centerXs]),
						_List_fromArray(
							[
								A2(
								rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[
										rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
										_List_fromArray(
											[rundis$elm_bootstrap$Bootstrap$Utilities$Display$none, rundis$elm_bootstrap$Bootstrap$Utilities$Display$blockMd])),
										rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12,
										rundis$elm_bootstrap$Bootstrap$Grid$Col$md2,
										rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('bd-sidebar')
											]))
									]),
								_List_fromArray(
									[
										A2(elm$html$Html$Lazy$lazy, author$project$View$viewSidebar, model)
									])),
								A2(
								rundis$elm_bootstrap$Bootstrap$Grid$col,
								_List_fromArray(
									[
										rundis$elm_bootstrap$Bootstrap$Grid$Col$xs12,
										rundis$elm_bootstrap$Bootstrap$Grid$Col$md10,
										rundis$elm_bootstrap$Bootstrap$Grid$Col$xl8,
										rundis$elm_bootstrap$Bootstrap$Grid$Col$attrs(
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('bd-content')
											]))
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$main_,
										_List_Nil,
										_List_fromArray(
											[
												author$project$View$viewPage(model)
											]))
									]))
							]))
					])),
				author$project$View$viewFooter(model)
			]));
};
var elm$html$Html$strong = _VirtualDom_node('strong');
var rundis$elm_bootstrap$Bootstrap$Alert$Shown = {$: 'Shown'};
var rundis$elm_bootstrap$Bootstrap$Alert$Config = function (a) {
	return {$: 'Config', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Alert$attrs = F2(
	function (attributes, _n0) {
		var configRec = _n0.a;
		return rundis$elm_bootstrap$Bootstrap$Alert$Config(
			_Utils_update(
				configRec,
				{attributes: attributes}));
	});
var rundis$elm_bootstrap$Bootstrap$Alert$children = F2(
	function (children_, _n0) {
		var configRec = _n0.a;
		return rundis$elm_bootstrap$Bootstrap$Alert$Config(
			_Utils_update(
				configRec,
				{children: children_}));
	});
var rundis$elm_bootstrap$Bootstrap$Internal$Role$Secondary = {$: 'Secondary'};
var rundis$elm_bootstrap$Bootstrap$Alert$config = rundis$elm_bootstrap$Bootstrap$Alert$Config(
	{attributes: _List_Nil, children: _List_Nil, dismissable: elm$core$Maybe$Nothing, role: rundis$elm_bootstrap$Bootstrap$Internal$Role$Secondary, visibility: rundis$elm_bootstrap$Bootstrap$Alert$Shown, withAnimation: false});
var rundis$elm_bootstrap$Bootstrap$Alert$role = F2(
	function (role_, _n0) {
		var configRec = _n0.a;
		return rundis$elm_bootstrap$Bootstrap$Alert$Config(
			_Utils_update(
				configRec,
				{role: role_}));
	});
var rundis$elm_bootstrap$Bootstrap$Alert$Closed = {$: 'Closed'};
var rundis$elm_bootstrap$Bootstrap$Alert$StartClose = {$: 'StartClose'};
var rundis$elm_bootstrap$Bootstrap$Alert$clickHandler = F2(
	function (visibility, configRec) {
		var handleClick = F2(
			function (viz, toMsg) {
				return elm$html$Html$Events$onClick(
					toMsg(viz));
			});
		var _n0 = configRec.dismissable;
		if (_n0.$ === 'Just') {
			var dismissMsg = _n0.a;
			return _List_fromArray(
				[
					configRec.withAnimation ? A2(handleClick, rundis$elm_bootstrap$Bootstrap$Alert$StartClose, dismissMsg) : A2(handleClick, rundis$elm_bootstrap$Bootstrap$Alert$Closed, dismissMsg)
				]);
		} else {
			return _List_Nil;
		}
	});
var rundis$elm_bootstrap$Bootstrap$Alert$injectButton = F2(
	function (btn, children_) {
		if (children_.b) {
			var head = children_.a;
			var tail = children_.b;
			return A2(
				elm$core$List$cons,
				head,
				A2(elm$core$List$cons, btn, tail));
		} else {
			return _List_fromArray(
				[btn]);
		}
	});
var rundis$elm_bootstrap$Bootstrap$Alert$isDismissable = function (configRec) {
	var _n0 = configRec.dismissable;
	if (_n0.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var rundis$elm_bootstrap$Bootstrap$Alert$maybeAddDismissButton = F3(
	function (visibilty, configRec, children_) {
		return rundis$elm_bootstrap$Bootstrap$Alert$isDismissable(configRec) ? A2(
			rundis$elm_bootstrap$Bootstrap$Alert$injectButton,
			A2(
				elm$html$Html$button,
				_Utils_ap(
					_List_fromArray(
						[
							elm$html$Html$Attributes$type_('button'),
							elm$html$Html$Attributes$class('close'),
							A2(elm$html$Html$Attributes$attribute, 'aria-label', 'close')
						]),
					A2(rundis$elm_bootstrap$Bootstrap$Alert$clickHandler, visibilty, configRec)),
				_List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('×')
							]))
					])),
			children_) : children_;
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var rundis$elm_bootstrap$Bootstrap$Alert$viewAttributes = F2(
	function (visibility, configRec) {
		var visibiltyAttributes = _Utils_eq(visibility, rundis$elm_bootstrap$Bootstrap$Alert$Closed) ? _List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'display', 'none')
			]) : _List_Nil;
		var animationAttributes = function () {
			if (configRec.withAnimation) {
				var _n0 = configRec.dismissable;
				if (_n0.$ === 'Just') {
					var dismissMsg = _n0.a;
					return _List_fromArray(
						[
							A2(
							elm$html$Html$Events$on,
							'transitionend',
							elm$json$Json$Decode$succeed(
								dismissMsg(rundis$elm_bootstrap$Bootstrap$Alert$Closed)))
						]);
				} else {
					return _List_Nil;
				}
			} else {
				return _List_Nil;
			}
		}();
		var alertAttributes = _List_fromArray(
			[
				A2(elm$html$Html$Attributes$attribute, 'role', 'alert'),
				elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('alert', true),
						_Utils_Tuple2(
						'alert-dismissible',
						rundis$elm_bootstrap$Bootstrap$Alert$isDismissable(configRec)),
						_Utils_Tuple2('fade', configRec.withAnimation),
						_Utils_Tuple2(
						'show',
						_Utils_eq(visibility, rundis$elm_bootstrap$Bootstrap$Alert$Shown))
					])),
				A2(rundis$elm_bootstrap$Bootstrap$Internal$Role$toClass, 'alert', configRec.role)
			]);
		return elm$core$List$concat(
			_List_fromArray(
				[configRec.attributes, alertAttributes, visibiltyAttributes, animationAttributes]));
	});
var rundis$elm_bootstrap$Bootstrap$Alert$view = F2(
	function (visibility, _n0) {
		var configRec = _n0.a;
		return A2(
			elm$html$Html$div,
			A2(rundis$elm_bootstrap$Bootstrap$Alert$viewAttributes, visibility, configRec),
			A3(rundis$elm_bootstrap$Bootstrap$Alert$maybeAddDismissButton, visibility, configRec, configRec.children));
	});
var rundis$elm_bootstrap$Bootstrap$Alert$simple = F3(
	function (role_, attributes, children_) {
		return A2(
			rundis$elm_bootstrap$Bootstrap$Alert$view,
			rundis$elm_bootstrap$Bootstrap$Alert$Shown,
			A2(
				rundis$elm_bootstrap$Bootstrap$Alert$children,
				children_,
				A2(
					rundis$elm_bootstrap$Bootstrap$Alert$attrs,
					attributes,
					A2(rundis$elm_bootstrap$Bootstrap$Alert$role, role_, rundis$elm_bootstrap$Bootstrap$Alert$config))));
	});
var rundis$elm_bootstrap$Bootstrap$Internal$Role$Danger = {$: 'Danger'};
var rundis$elm_bootstrap$Bootstrap$Alert$simpleDanger = rundis$elm_bootstrap$Bootstrap$Alert$simple(rundis$elm_bootstrap$Bootstrap$Internal$Role$Danger);
var author$project$View$viewError = A2(
	rundis$elm_bootstrap$Bootstrap$Alert$simpleDanger,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			elm$html$Html$strong,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('Oh snap! ')
				])),
			elm$html$Html$text('There was a problem loading the page.')
		]));
var rundis$elm_bootstrap$Bootstrap$Progress$Label = function (a) {
	return {$: 'Label', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Progress$label = function (text) {
	return rundis$elm_bootstrap$Bootstrap$Progress$Label(
		_List_fromArray(
			[
				elm$html$Html$text(text)
			]));
};
var rundis$elm_bootstrap$Bootstrap$Progress$Options = function (a) {
	return {$: 'Options', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Progress$applyOption = F2(
	function (modifier, _n0) {
		var options = _n0.a;
		return rundis$elm_bootstrap$Bootstrap$Progress$Options(
			function () {
				switch (modifier.$) {
					case 'Value':
						var value_ = modifier.a;
						return _Utils_update(
							options,
							{value: value_});
					case 'Height':
						var height_ = modifier.a;
						return _Utils_update(
							options,
							{height: height_});
					case 'Label':
						var label_ = modifier.a;
						return _Utils_update(
							options,
							{label: label_});
					case 'Roled':
						var role_ = modifier.a;
						return _Utils_update(
							options,
							{role: role_});
					case 'Striped':
						var striped_ = modifier.a;
						return _Utils_update(
							options,
							{striped: striped_});
					case 'Animated':
						var animated_ = modifier.a;
						return _Utils_update(
							options,
							{animated: animated_});
					case 'Attrs':
						var attrs_ = modifier.a;
						return _Utils_update(
							options,
							{attributes: attrs_});
					default:
						var attrs_ = modifier.a;
						return _Utils_update(
							options,
							{wrapperAttributes: attrs_});
				}
			}());
	});
var rundis$elm_bootstrap$Bootstrap$Progress$defaultOptions = rundis$elm_bootstrap$Bootstrap$Progress$Options(
	{animated: false, attributes: _List_Nil, height: elm$core$Maybe$Nothing, label: _List_Nil, role: elm$core$Maybe$Nothing, striped: false, value: 0, wrapperAttributes: _List_Nil});
var rundis$elm_bootstrap$Bootstrap$Progress$roleClass = function (role) {
	return elm$html$Html$Attributes$class(
		function () {
			switch (role.$) {
				case 'Success':
					return 'bg-success';
				case 'Info':
					return 'bg-info';
				case 'Warning':
					return 'bg-warning';
				default:
					return 'bg-danger';
			}
		}());
};
var rundis$elm_bootstrap$Bootstrap$Progress$toAttributes = function (_n0) {
	var options = _n0.a;
	return elm$core$List$concat(
		_List_fromArray(
			[
				_List_fromArray(
				[
					A2(elm$html$Html$Attributes$attribute, 'role', 'progressbar'),
					A2(
					elm$html$Html$Attributes$attribute,
					'aria-value-now',
					elm$core$String$fromFloat(options.value)),
					A2(elm$html$Html$Attributes$attribute, 'aria-valuemin', '0'),
					A2(elm$html$Html$Attributes$attribute, 'aria-valuemax', '100'),
					A2(
					elm$html$Html$Attributes$style,
					'width',
					elm$core$String$fromFloat(options.value) + '%'),
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('progress-bar', true),
							_Utils_Tuple2('progress-bar-striped', options.striped || options.animated),
							_Utils_Tuple2('progress-bar-animated', options.animated)
						]))
				]),
				function () {
				var _n1 = options.height;
				if (_n1.$ === 'Just') {
					var height_ = _n1.a;
					return _List_fromArray(
						[
							A2(
							elm$html$Html$Attributes$style,
							'height',
							elm$core$String$fromInt(height_) + 'px')
						]);
				} else {
					return _List_Nil;
				}
			}(),
				function () {
				var _n2 = options.role;
				if (_n2.$ === 'Just') {
					var role_ = _n2.a;
					return _List_fromArray(
						[
							rundis$elm_bootstrap$Bootstrap$Progress$roleClass(role_)
						]);
				} else {
					return _List_Nil;
				}
			}(),
				options.attributes
			]));
};
var rundis$elm_bootstrap$Bootstrap$Progress$renderBar = function (modifiers) {
	var options = A3(elm$core$List$foldl, rundis$elm_bootstrap$Bootstrap$Progress$applyOption, rundis$elm_bootstrap$Bootstrap$Progress$defaultOptions, modifiers);
	var opts = options.a;
	return A2(
		elm$html$Html$div,
		rundis$elm_bootstrap$Bootstrap$Progress$toAttributes(options),
		opts.label);
};
var rundis$elm_bootstrap$Bootstrap$Progress$progress = function (modifiers) {
	var _n0 = A3(elm$core$List$foldl, rundis$elm_bootstrap$Bootstrap$Progress$applyOption, rundis$elm_bootstrap$Bootstrap$Progress$defaultOptions, modifiers);
	var options = _n0.a;
	return A2(
		elm$html$Html$div,
		A2(
			elm$core$List$cons,
			elm$html$Html$Attributes$class('progress'),
			options.wrapperAttributes),
		_List_fromArray(
			[
				rundis$elm_bootstrap$Bootstrap$Progress$renderBar(modifiers)
			]));
};
var rundis$elm_bootstrap$Bootstrap$Progress$Striped = function (a) {
	return {$: 'Striped', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Progress$striped = rundis$elm_bootstrap$Bootstrap$Progress$Striped(true);
var rundis$elm_bootstrap$Bootstrap$Progress$Value = function (a) {
	return {$: 'Value', a: a};
};
var rundis$elm_bootstrap$Bootstrap$Progress$value = function (val) {
	return rundis$elm_bootstrap$Bootstrap$Progress$Value(val);
};
var author$project$View$viewProgressBar = function (value) {
	return rundis$elm_bootstrap$Bootstrap$Progress$progress(
		_List_fromArray(
			[
				rundis$elm_bootstrap$Bootstrap$Progress$value(value),
				rundis$elm_bootstrap$Bootstrap$Progress$striped,
				rundis$elm_bootstrap$Bootstrap$Progress$label('loading')
			]));
};
var author$project$View$view = function (model) {
	return {
		body: _List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						function () {
						var _n0 = model.response;
						switch (_n0.$) {
							case 'Loading':
								return author$project$View$viewProgressBar(model.loadingValue);
							case 'Success':
								return author$project$View$renderPage(model);
							default:
								return author$project$View$viewError;
						}
					}()
					]))
			]),
		title: 'PSU Schedule'
	};
};
var elm$browser$Browser$document = _Browser_document;
var author$project$Main$main = elm$browser$Browser$document(
	{init: author$project$Main$init, subscriptions: author$project$Subscriptions$subscriptions, update: author$project$Update$update, view: author$project$View$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));