"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('apollo-server'),
    ApolloServer = _require.ApolloServer;

var fetch = require('./fetch.js');

var _require2 = require('lodash'),
    get = _require2.get; // The schema for object type definitions 


var typeDefs = "\n  type Currencies {\n    currencies: [String]\n  }\n\n  type Rate {\n    currency: String\n    rate: Float\n  }\n\n  type Rates {\n    rates: [Rate]\n    base: String\n    date: String\n  }\n\n  type Query {\n    rates_latest(amount: Float, base: String, symbols: String): Rates\n    list_currencies: Currencies\n  }\n"; // Resolvers are only called when data is requested

var resolvers = {
  Query: {
    rates_latest: function () {
      var _rates_latest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_, params) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch.build("".concat(process.env.EXCHANGE_RATE_API, "/latest"), _objectSpread({}, params)).then(function (res) {
                  return res.json();
                });

              case 2:
                data = _context.sent;
                return _context.abrupt("return", {
                  data: data,
                  params: params
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function rates_latest(_x, _x2) {
        return _rates_latest.apply(this, arguments);
      }

      return rates_latest;
    }(),
    list_currencies: function () {
      var _list_currencies = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_, params) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", fetch.build("".concat(process.env.EXCHANGE_RATE_API, "/latest"), params).then(function (res) {
                  return res.json();
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function list_currencies(_x3, _x4) {
        return _list_currencies.apply(this, arguments);
      }

      return list_currencies;
    }()
  },
  Currencies: {
    currencies: function currencies(data) {
      return Object.keys(get(data, 'rates', {}));
    }
  },
  Rates: {
    base: function base(_ref) {
      var data = _ref.data;
      return get(data, 'base', null);
    },
    date: function date(_ref2) {
      var data = _ref2.data;
      return get(data, 'date', null);
    },
    rates: function rates(_ref3) {
      var data = _ref3.data,
          params = _ref3.params;
      var rates = get(data, 'rates', {});
      var amount = get(params, 'amount', false); // Tranform rates into an array

      return Object.keys(rates).map(function (currency) {
        return {
          currency: currency,
          rate: amount ? parseFloat(rates[currency]) * parseFloat(amount) : rates[currency]
        };
      });
    }
  }
}; // Constructs the server

var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
}); // Starts the basic apollo server

server.listen(3333).then(function (_ref4) {
  var url = _ref4.url;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});
//# sourceMappingURL=server.js.map