"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/finder_test/page",{

/***/ "(app-pages-browser)/./app/finder_test/page.tsx":
/*!**********************************!*\
  !*** ./app/finder_test/page.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/../../../../node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/../../../../node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Searchbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Searchbar */ \"(app-pages-browser)/./app/finder_test/components/Searchbar.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nconst SearchBarTest = ()=>{\n    _s();\n    const [results, setResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const handleSearch = async (query)=>{\n        try {\n            const res = await fetch(\"http://localhost:8888/api/search?q=\".concat(query)); // backend req\n            console.log(res);\n            const data = await res.json();\n            setResults(data);\n            console.log(data);\n        } catch (error) {\n            console.error(\"Error fetching search results:\", error);\n        }\n    };\n    const containerStyle = {\n        display: \"flex\",\n        flexDirection: \"column\",\n        alignItems: \"center\",\n        justifyContent: \"center\",\n        height: \"100vh\",\n        backgroundColor: \"#1a73e8\"\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: containerStyle,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Searchbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                onSearch: handleSearch\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\frontend\\\\app\\\\finder_test\\\\page.tsx\",\n                lineNumber: 36,\n                columnNumber: 14\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-4 w-full max-w-lg bg-white p-4 rounded shadow-md\",\n                children: results.length > 0 ? results.map((subject, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"border-b py-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"font-bold text-white\",\n                                children: subject.subjectKey\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\frontend\\\\app\\\\finder_test\\\\page.tsx\",\n                                lineNumber: 41,\n                                columnNumber: 29\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: subject.subjectName\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\frontend\\\\app\\\\finder_test\\\\page.tsx\",\n                                lineNumber: 42,\n                                columnNumber: 29\n                            }, undefined)\n                        ]\n                    }, index, true, {\n                        fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\frontend\\\\app\\\\finder_test\\\\page.tsx\",\n                        lineNumber: 40,\n                        columnNumber: 25\n                    }, undefined)) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: \"No results found.\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\frontend\\\\app\\\\finder_test\\\\page.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 21\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\frontend\\\\app\\\\finder_test\\\\page.tsx\",\n                lineNumber: 37,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\frontend\\\\app\\\\finder_test\\\\page.tsx\",\n        lineNumber: 35,\n        columnNumber: 9\n    }, undefined);\n};\n_s(SearchBarTest, \"QYmH5xyAMv1uIO9V7tguRx7oNwo=\");\n_c = SearchBarTest;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SearchBarTest);\nvar _c;\n$RefreshReg$(_c, \"SearchBarTest\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9maW5kZXJfdGVzdC9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ3dDO0FBQ087QUFRL0MsTUFBTUcsZ0JBQTBCOztJQUM1QixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR0osK0NBQVFBLENBQVksRUFBRTtJQUVwRCxNQUFNSyxlQUFlLE9BQU9DO1FBQ3hCLElBQUk7WUFDQSxNQUFNQyxNQUFNLE1BQU1DLE1BQU0sc0NBQTRDLE9BQU5GLFNBQVUsY0FBYztZQUN0RkcsUUFBUUMsR0FBRyxDQUFDSDtZQUNaLE1BQU1JLE9BQWtCLE1BQU1KLElBQUlLLElBQUk7WUFDdENSLFdBQVdPO1lBQ1hGLFFBQVFDLEdBQUcsQ0FBQ0M7UUFDaEIsRUFBRSxPQUFPRSxPQUFPO1lBQ1pKLFFBQVFJLEtBQUssQ0FBQyxrQ0FBa0NBO1FBQ3BEO0lBQ0o7SUFDQSxNQUFNQyxpQkFBc0M7UUFDeENDLFNBQVM7UUFDVEMsZUFBZTtRQUNmQyxZQUFZO1FBQ1pDLGdCQUFnQjtRQUNoQkMsUUFBUTtRQUNSQyxpQkFBaUI7SUFDckI7SUFFQSxxQkFDSSw4REFBQ0M7UUFBSUMsT0FBT1I7OzBCQUNQLDhEQUFDYiw2REFBU0E7Z0JBQUNzQixVQUFVbEI7Ozs7OzswQkFDdEIsOERBQUNnQjtnQkFBSUcsV0FBVTswQkFDVnJCLFFBQVFzQixNQUFNLEdBQUcsSUFDZHRCLFFBQVF1QixHQUFHLENBQUMsQ0FBQ0MsU0FBU0Msc0JBQ2xCLDhEQUFDUDt3QkFBZ0JHLFdBQVU7OzBDQUN2Qiw4REFBQ0s7Z0NBQUVMLFdBQVU7MENBQXdCRyxRQUFRRyxVQUFVOzs7Ozs7MENBQ3ZELDhEQUFDRDswQ0FBR0YsUUFBUUksV0FBVzs7Ozs7Ozt1QkFGakJIOzs7O21EQU1kLDhEQUFDQzs4QkFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLdkI7R0F4Q00zQjtLQUFBQTtBQTBDTiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvZmluZGVyX3Rlc3QvcGFnZS50c3g/OWQ5ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgU2VhcmNoYmFyIGZyb20gJy4vY29tcG9uZW50cy9TZWFyY2hiYXInO1xyXG5cclxuaW50ZXJmYWNlIFN1YmplY3Qge1xyXG4gICAgc3ViamVjdEtleTogc3RyaW5nO1xyXG4gICAgc3ViamVjdE5hbWU6IHN0cmluZztcclxufVxyXG5cclxuXHJcbmNvbnN0IFNlYXJjaEJhclRlc3Q6IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gICAgY29uc3QgW3Jlc3VsdHMsIHNldFJlc3VsdHNdID0gdXNlU3RhdGU8U3ViamVjdFtdPihbXSk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlU2VhcmNoID0gYXN5bmMgKHF1ZXJ5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4ODg4L2FwaS9zZWFyY2g/cT0ke3F1ZXJ5fWApOyAvLyBiYWNrZW5kIHJlcVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhOiBTdWJqZWN0W10gPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgICAgICAgICBzZXRSZXN1bHRzKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBzZWFyY2ggcmVzdWx0czonLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0ge1xyXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMxYTczZTgnXHJcbiAgICB9O1xyXG4gIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXtjb250YWluZXJTdHlsZX0+XHJcbiAgICAgICAgICAgICA8U2VhcmNoYmFyIG9uU2VhcmNoPXtoYW5kbGVTZWFyY2h9Lz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHctZnVsbCBtYXgtdy1sZyBiZy13aGl0ZSBwLTQgcm91bmRlZCBzaGFkb3ctbWRcIj5cclxuICAgICAgICAgICAgICAgIHtyZXN1bHRzLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5tYXAoKHN1YmplY3QsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiYm9yZGVyLWIgcHktMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGVcIj57c3ViamVjdC5zdWJqZWN0S2V5fTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPntzdWJqZWN0LnN1YmplY3ROYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHA+Tm8gcmVzdWx0cyBmb3VuZC48L3A+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCYXJUZXN0O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIlNlYXJjaGJhciIsIlNlYXJjaEJhclRlc3QiLCJyZXN1bHRzIiwic2V0UmVzdWx0cyIsImhhbmRsZVNlYXJjaCIsInF1ZXJ5IiwicmVzIiwiZmV0Y2giLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImpzb24iLCJlcnJvciIsImNvbnRhaW5lclN0eWxlIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwianVzdGlmeUNvbnRlbnQiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJkaXYiLCJzdHlsZSIsIm9uU2VhcmNoIiwiY2xhc3NOYW1lIiwibGVuZ3RoIiwibWFwIiwic3ViamVjdCIsImluZGV4IiwicCIsInN1YmplY3RLZXkiLCJzdWJqZWN0TmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/finder_test/page.tsx\n"));

/***/ })

});