"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/subject_detail/[id]/page",{

/***/ "(app-pages-browser)/./src/app/subject_detail/[id]/page.tsx":
/*!**********************************************!*\
  !*** ./src/app/subject_detail/[id]/page.tsx ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _app_components_CourseDetail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/components/CourseDetail */ \"(app-pages-browser)/./src/app/components/CourseDetail.tsx\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst Detail = ()=>{\n    _s();\n    const { id } = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)();\n    const [subjectData, setSubjectData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchSubjectData = async ()=>{\n            if (id) {\n                try {\n                    const response = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"http://localhost:8888/api/fetchSelectedSubject/\".concat(id));\n                    console.log(response.data); // ตรวจสอบข้อมูลที่ได้รับจาก API\n                    const subjectsFromDB = response.data;\n                    if (!Array.isArray(subjectsFromDB)) {\n                        throw new Error(\"Data received is not an array\");\n                    }\n                    const subjectsWithSections = await Promise.all(subjectsFromDB.map(async (subject)=>{\n                        const sections = await fetchSections(subject.subject_id);\n                        return {\n                            ...subject,\n                            sections\n                        };\n                    }));\n                    setSubjectData(subjectsWithSections);\n                } catch (error) {\n                    console.error(\"Error fetching subject data:\", error);\n                } finally{\n                    setLoading(false);\n                }\n            }\n        };\n        const fetchSections = async (subject_id)=>{\n            try {\n                const response = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"http://localhost:8888/api/fetchSections/\".concat(subject_id));\n                return response.data;\n            } catch (error) {\n                console.error(\"Error fetching sections for subject_id \".concat(subject_id, \":\"), error);\n                return []; // ในกรณีที่เกิด error, ส่งค่าเป็น array ว่างกลับ\n            }\n        };\n        fetchSubjectData();\n    }, [\n        id\n    ]);\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\demofront\\\\src\\\\app\\\\subject_detail\\\\[id]\\\\page.tsx\",\n        lineNumber: 51,\n        columnNumber: 25\n    }, undefined);\n    if (!subjectData) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"No data found\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\demofront\\\\src\\\\app\\\\subject_detail\\\\[id]\\\\page.tsx\",\n        lineNumber: 53,\n        columnNumber: 30\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"w-full h-full min-h-screen flex flex-col items-center justify-center bg-gray-200 p-8\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-full max-w-7xl\",\n            children: subjectData.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_components_CourseDetail__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                course: subjectData[0]\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\demofront\\\\src\\\\app\\\\subject_detail\\\\[id]\\\\page.tsx\",\n                lineNumber: 59,\n                columnNumber: 21\n            }, undefined) // ส่งอ็อบเจ็กต์แรกไปที่ CourseDetail\n             : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: \"No data found\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\demofront\\\\src\\\\app\\\\subject_detail\\\\[id]\\\\page.tsx\",\n                lineNumber: 61,\n                columnNumber: 21\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\demofront\\\\src\\\\app\\\\subject_detail\\\\[id]\\\\page.tsx\",\n            lineNumber: 57,\n            columnNumber: 13\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Bruhh\\\\Documents\\\\GitHub\\\\ISAD\\\\demofront\\\\src\\\\app\\\\subject_detail\\\\[id]\\\\page.tsx\",\n        lineNumber: 56,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Detail, \"srQZ+IhJveDuVx4C/ecU85OmV8M=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams\n    ];\n});\n_c = Detail;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Detail);\nvar _c;\n$RefreshReg$(_c, \"Detail\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvc3ViamVjdF9kZXRhaWwvW2lkXS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDbUQ7QUFDUDtBQUVhO0FBQy9CO0FBRTFCLE1BQU1NLFNBQW1COztJQUNyQixNQUFNLEVBQUVDLEVBQUUsRUFBRSxHQUFHSiwwREFBU0E7SUFDeEIsTUFBTSxDQUFDSyxhQUFhQyxlQUFlLEdBQUdQLCtDQUFRQSxDQUF1QjtJQUNyRSxNQUFNLENBQUNRLFNBQVNDLFdBQVcsR0FBR1QsK0NBQVFBLENBQUM7SUFHdkNELGdEQUFTQSxDQUFDO1FBQ04sTUFBTVcsbUJBQW1CO1lBQ3JCLElBQUlMLElBQUk7Z0JBQ0osSUFBSTtvQkFDQSxNQUFNTSxXQUFXLE1BQU1SLDZDQUFLQSxDQUFDUyxHQUFHLENBQUMsa0RBQXFELE9BQUhQO29CQUNuRlEsUUFBUUMsR0FBRyxDQUFDSCxTQUFTSSxJQUFJLEdBQUcsZ0NBQWdDO29CQUM1RCxNQUFNQyxpQkFBaUJMLFNBQVNJLElBQUk7b0JBRXBDLElBQUksQ0FBQ0UsTUFBTUMsT0FBTyxDQUFDRixpQkFBaUI7d0JBQ2hDLE1BQU0sSUFBSUcsTUFBTTtvQkFDcEI7b0JBRUEsTUFBTUMsdUJBQXVCLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQ04sZUFBZU8sR0FBRyxDQUFDLE9BQU9DO3dCQUNyRSxNQUFNQyxXQUFXLE1BQU1DLGNBQWNGLFFBQVFHLFVBQVU7d0JBQ3ZELE9BQU87NEJBQUUsR0FBR0gsT0FBTzs0QkFBRUM7d0JBQVM7b0JBQ2xDO29CQUNBbEIsZUFBZWE7Z0JBQ25CLEVBQUUsT0FBT1EsT0FBTztvQkFDWmYsUUFBUWUsS0FBSyxDQUFDLGdDQUFnQ0E7Z0JBQ2xELFNBQVU7b0JBQ05uQixXQUFXO2dCQUNmO1lBQ0o7UUFDSjtRQUNBLE1BQU1pQixnQkFBZ0IsT0FBT0M7WUFDekIsSUFBSTtnQkFDQSxNQUFNaEIsV0FBVyxNQUFNUiw2Q0FBS0EsQ0FBQ1MsR0FBRyxDQUFDLDJDQUFzRCxPQUFYZTtnQkFDNUUsT0FBT2hCLFNBQVNJLElBQUk7WUFDeEIsRUFBRSxPQUFPYSxPQUFPO2dCQUNaZixRQUFRZSxLQUFLLENBQUMsMENBQXFELE9BQVhELFlBQVcsTUFBSUM7Z0JBQ3ZFLE9BQU8sRUFBRSxFQUFFLGlEQUFpRDtZQUNoRTtRQUNKO1FBRUFsQjtJQUNKLEdBQUc7UUFBQ0w7S0FBRztJQUVQLElBQUlHLFNBQVMscUJBQU8sOERBQUNxQjtrQkFBSTs7Ozs7O0lBRXpCLElBQUksQ0FBQ3ZCLGFBQWEscUJBQU8sOERBQUN1QjtrQkFBSTs7Ozs7O0lBRTlCLHFCQUNJLDhEQUFDQTtRQUFJQyxXQUFVO2tCQUNYLDRFQUFDRDtZQUFJQyxXQUFVO3NCQUNWeEIsWUFBWXlCLE1BQU0sR0FBRyxrQkFDbEIsOERBQUM3QixvRUFBWUE7Z0JBQUM4QixRQUFRMUIsV0FBVyxDQUFDLEVBQUU7Ozs7OzBCQUFLLHFDQUFxQzs2QkFFOUUsOERBQUN1QjswQkFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQUt6QjtHQTFETXpCOztRQUNhSCxzREFBU0E7OztLQUR0Qkc7QUE0RE4sK0RBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9zdWJqZWN0X2RldGFpbC9baWRdL3BhZ2UudHN4PzY3NzkiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVBhcmFtcyB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XHJcbmltcG9ydCB7IFN1YmplY3REYXRhIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbnRlcmZhY2UnO1xyXG5pbXBvcnQgQ291cnNlRGV0YWlsIGZyb20gJ0AvYXBwL2NvbXBvbmVudHMvQ291cnNlRGV0YWlsJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuXHJcbmNvbnN0IERldGFpbDogUmVhY3QuRkMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGlkIH0gPSB1c2VQYXJhbXMoKTtcclxuICAgIGNvbnN0IFtzdWJqZWN0RGF0YSwgc2V0U3ViamVjdERhdGFdID0gdXNlU3RhdGU8U3ViamVjdERhdGFbXSB8IG51bGw+KG51bGwpO1xyXG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgICBcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZldGNoU3ViamVjdERhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgaHR0cDovL2xvY2FsaG9zdDo4ODg4L2FwaS9mZXRjaFNlbGVjdGVkU3ViamVjdC8ke2lkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpOyAvLyDguJXguKPguKfguIjguKrguK3guJrguILguYnguK3guKHguLnguKXguJfguLXguYjguYTguJTguYnguKPguLHguJrguIjguLLguIEgQVBJXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViamVjdHNGcm9tREIgPSByZXNwb25zZS5kYXRhIGFzIFN1YmplY3REYXRhW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzdWJqZWN0c0Zyb21EQikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIHJlY2VpdmVkIGlzIG5vdCBhbiBhcnJheScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViamVjdHNXaXRoU2VjdGlvbnMgPSBhd2FpdCBQcm9taXNlLmFsbChzdWJqZWN0c0Zyb21EQi5tYXAoYXN5bmMgKHN1YmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSBhd2FpdCBmZXRjaFNlY3Rpb25zKHN1YmplY3Quc3ViamVjdF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IC4uLnN1YmplY3QsIHNlY3Rpb25zIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFN1YmplY3REYXRhKHN1YmplY3RzV2l0aFNlY3Rpb25zKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc3ViamVjdCBkYXRhOicsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZldGNoU2VjdGlvbnMgPSBhc3luYyAoc3ViamVjdF9pZDogU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgaHR0cDovL2xvY2FsaG9zdDo4ODg4L2FwaS9mZXRjaFNlY3Rpb25zLyR7c3ViamVjdF9pZH1gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc2VjdGlvbnMgZm9yIHN1YmplY3RfaWQgJHtzdWJqZWN0X2lkfTpgLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW107IC8vIOC5g+C4meC4geC4o+C4k+C4teC4l+C4teC5iOC5gOC4geC4tOC4lCBlcnJvciwg4Liq4LmI4LiH4LiE4LmI4Liy4LmA4Lib4LmH4LiZIGFycmF5IOC4p+C5iOC4suC4h+C4geC4peC4seC4mlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmZXRjaFN1YmplY3REYXRhKCk7XHJcbiAgICB9LCBbaWRdKTtcclxuXHJcbiAgICBpZiAobG9hZGluZykgcmV0dXJuIDxkaXY+TG9hZGluZy4uLjwvZGl2PjtcclxuXHJcbiAgICBpZiAoIXN1YmplY3REYXRhKSByZXR1cm4gPGRpdj5ObyBkYXRhIGZvdW5kPC9kaXY+O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG1pbi1oLXNjcmVlbiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ncmF5LTIwMCBwLThcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctN3hsXCI+XHJcbiAgICAgICAgICAgICAgICB7c3ViamVjdERhdGEubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgICAgICAgICA8Q291cnNlRGV0YWlsIGNvdXJzZT17c3ViamVjdERhdGFbMF19IC8+IC8vIOC4quC5iOC4h+C4reC5h+C4reC4muC5gOC4iOC5h+C4geC4leC5jOC5geC4o+C4geC5hOC4m+C4l+C4teC5iCBDb3Vyc2VEZXRhaWxcclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5ObyBkYXRhIGZvdW5kPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXRhaWw7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUGFyYW1zIiwiQ291cnNlRGV0YWlsIiwiYXhpb3MiLCJEZXRhaWwiLCJpZCIsInN1YmplY3REYXRhIiwic2V0U3ViamVjdERhdGEiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImZldGNoU3ViamVjdERhdGEiLCJyZXNwb25zZSIsImdldCIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwic3ViamVjdHNGcm9tREIiLCJBcnJheSIsImlzQXJyYXkiLCJFcnJvciIsInN1YmplY3RzV2l0aFNlY3Rpb25zIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInN1YmplY3QiLCJzZWN0aW9ucyIsImZldGNoU2VjdGlvbnMiLCJzdWJqZWN0X2lkIiwiZXJyb3IiLCJkaXYiLCJjbGFzc05hbWUiLCJsZW5ndGgiLCJjb3Vyc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/subject_detail/[id]/page.tsx\n"));

/***/ })

});