(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{108:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(0),o=n.n(r),i=n(25),s=n(89),u=n(84);function a({title:e,description:t,keywords:n,image:r}){const a=Object(u.useTitleFormatter)(e),c=Object(s.a)(r,{absolute:!0});return o.a.createElement(i.a,null,e&&o.a.createElement("title",null,a),e&&o.a.createElement("meta",{property:"og:title",content:a}),t&&o.a.createElement("meta",{name:"description",content:t}),t&&o.a.createElement("meta",{property:"og:description",content:t}),n&&o.a.createElement("meta",{name:"keywords",content:Array.isArray(n)?n.join(","):n}),r&&o.a.createElement("meta",{property:"og:image",content:c}),r&&o.a.createElement("meta",{name:"twitter:image",content:c}),r&&o.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}))}},109:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useAlternatePageUtils=void 0;const o=r(n(16)),i=n(23);t.useAlternatePageUtils=function(){const{siteConfig:{baseUrl:e,url:t},i18n:{defaultLocale:n,currentLocale:r}}=o.default(),{pathname:s}=i.useLocation(),u=r===n?e:e.replace(`/${r}/`,"/"),a=s.replace(e,"");return{createUrl:function({locale:e,fullyQualified:r}){return`${r?t:""}${function(e){return e===n?`${u}`:`${u}${e}/`}(e)}${a}`}}}},110:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.docVersionSearchTag=t.DEFAULT_SEARCH_TAG=void 0,t.DEFAULT_SEARCH_TAG="default",t.docVersionSearchTag=function(e,t){return`docs-${e}-${t}`}},111:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useDocVersionSuggestions=t.useActiveDocContext=t.useActiveVersion=t.useLatestVersion=t.useVersions=t.useActivePluginAndVersion=t.useActivePlugin=t.useDocsData=t.useAllDocsData=void 0;const r=n(23),o=n(112),i=n(113);t.useAllDocsData=()=>o.useAllPluginInstancesData("docusaurus-plugin-content-docs"),t.useDocsData=e=>o.usePluginData("docusaurus-plugin-content-docs",e),t.useActivePlugin=(e={})=>{const n=t.useAllDocsData(),{pathname:o}=r.useLocation();return i.getActivePlugin(n,o,e)},t.useActivePluginAndVersion=(e={})=>{const n=t.useActivePlugin(e),{pathname:o}=r.useLocation();if(n){return{activePlugin:n,activeVersion:i.getActiveVersion(n.pluginData,o)}}},t.useVersions=e=>t.useDocsData(e).versions,t.useLatestVersion=e=>{const n=t.useDocsData(e);return i.getLatestVersion(n)},t.useActiveVersion=e=>{const n=t.useDocsData(e),{pathname:o}=r.useLocation();return i.getActiveVersion(n,o)},t.useActiveDocContext=e=>{const n=t.useDocsData(e),{pathname:o}=r.useLocation();return i.getActiveDocContext(n,o)},t.useDocVersionSuggestions=e=>{const n=t.useDocsData(e),{pathname:o}=r.useLocation();return i.getDocVersionSuggestions(n,o)}},112:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return o})),n.d(t,"useAllPluginInstancesData",(function(){return i})),n.d(t,"usePluginData",(function(){return s}));var r=n(16);function o(){const{globalData:e}=Object(r.default)();if(!e)throw new Error("Docusaurus global data not found");return e}function i(e){const t=o()[e];if(!t)throw new Error(`Docusaurus plugin global data not found for pluginName=${e}`);return t}function s(e,t="default"){const n=i(e)[t];if(!n)throw new Error(`Docusaurus plugin global data not found for pluginName=${e} and pluginId=${t}`);return n}},113:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDocVersionSuggestions=t.getActiveDocContext=t.getActiveVersion=t.getLatestVersion=t.getActivePlugin=void 0;const r=n(23);t.getActivePlugin=function(e,t,n={}){const o=Object.entries(e).find((([e,n])=>!!r.matchPath(t,{path:n.path,exact:!1,strict:!1}))),i=o?{pluginId:o[0],pluginData:o[1]}:void 0;if(!i&&n.failfast)throw new Error(`Can't find active docs plugin for pathname=${t}, while it was expected to be found. Maybe you tried to use a docs feature that can only be used on a docs-related page? Existing docs plugin paths are: ${Object.values(e).map((e=>e.path)).join(", ")}`);return i},t.getLatestVersion=e=>e.versions.find((e=>e.isLast)),t.getActiveVersion=(e,n)=>{const o=t.getLatestVersion(e);return[...e.versions.filter((e=>e!==o)),o].find((e=>!!r.matchPath(n,{path:e.path,exact:!1,strict:!1})))},t.getActiveDocContext=(e,n)=>{const o=t.getActiveVersion(e,n),i=null==o?void 0:o.docs.find((e=>!!r.matchPath(n,{path:e.path,exact:!0,strict:!1})));return{activeVersion:o,activeDoc:i,alternateDocVersions:i?function(t){const n={};return e.versions.forEach((e=>{e.docs.forEach((r=>{r.id===t&&(n[e.name]=r)}))})),n}(i.id):{}}},t.getDocVersionSuggestions=(e,n)=>{const r=t.getLatestVersion(e),o=t.getActiveDocContext(e,n),i=o.activeVersion!==r;return{latestDocSuggestion:i?null==o?void 0:o.alternateDocVersions[r.name]:void 0,latestVersionSuggestion:i?r:void 0}}},114:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isSamePath=void 0,t.isSamePath=(e,t)=>{const n=e=>!e||(null==e?void 0:e.endsWith("/"))?e:`${e}/`;return n(e)===n(t)}},115:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useTitleFormatter=void 0;const o=r(n(16));t.useTitleFormatter=e=>{const{siteConfig:t={}}=o.default(),{title:n,titleDelimiter:r="|"}=t;return e&&e.trim().length?`${e.trim()} ${r} ${n}`:n}},116:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.usePluralForm=void 0;const o=n(0),i=r(n(16)),s=["zero","one","two","few","many","other"];function u(e){return s.filter((t=>e.includes(t)))}const a={locale:"en",pluralForms:u(["one","other"]),select:e=>1===e?"one":"other"};function c(){const{i18n:{currentLocale:e}}=i.default();return o.useMemo((()=>{if(!Intl.PluralRules)return console.error("Intl.PluralRules not available!\nDocusaurus will fallback to a default/fallback (English) Intl.PluralRules implementation.\n        "),a;try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:u(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale=${e}.\nDocusaurus will fallback to a default/fallback (English) Intl.PluralRules implementation.\n`),a}}),[e])}t.usePluralForm=function(){const e=c();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];{r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms}), but the message contains ${r.length} plural forms: ${e} `);const o=n.select(t),i=n.pluralForms.indexOf(o);return r[Math.min(i,r.length-1)]}}(n,t,e)}}},117:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useDocsPreferredVersionByPluginId=t.useDocsPreferredVersion=void 0;const r=n(0),o=n(98),i=n(87),s=n(119);t.useDocsPreferredVersion=function(e=s.DEFAULT_PLUGIN_ID){const t=i.useDocsData(e),[n,u]=o.useDocsPreferredVersionContext(),{preferredVersionName:a}=n[e];return{preferredVersion:a?t.versions.find((e=>e.name===a)):null,savePreferredVersionName:r.useCallback((t=>{u.savePreferredVersion(e,t)}),[u])}},t.useDocsPreferredVersionByPluginId=function(){const e=i.useAllDocsData(),[t]=o.useDocsPreferredVersionContext(),n=Object.keys(e),r={};return n.forEach((n=>{r[n]=function(n){const r=e[n],{preferredVersionName:o}=t[n];return o?r.versions.find((e=>e.name===o)):null}(n)})),r}},118:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=e=>`docs-preferred-version-${e}`,o={save:(e,t,n)=>{"none"===t||window.localStorage.setItem(r(e),n)},read:(e,t)=>"none"===t?null:window.localStorage.getItem(r(e)),clear:(e,t)=>{"none"===t||window.localStorage.removeItem(r(e))}};t.default=o},119:function(e,t,n){"use strict";n.r(t),n.d(t,"DEFAULT_PLUGIN_ID",(function(){return r}));const r="default"},84:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(96);Object.defineProperty(t,"useThemeConfig",{enumerable:!0,get:function(){return r.useThemeConfig}});var o=n(109);Object.defineProperty(t,"useAlternatePageUtils",{enumerable:!0,get:function(){return o.useAlternatePageUtils}});var i=n(110);Object.defineProperty(t,"docVersionSearchTag",{enumerable:!0,get:function(){return i.docVersionSearchTag}}),Object.defineProperty(t,"DEFAULT_SEARCH_TAG",{enumerable:!0,get:function(){return i.DEFAULT_SEARCH_TAG}});var s=n(97);Object.defineProperty(t,"isDocsPluginEnabled",{enumerable:!0,get:function(){return s.isDocsPluginEnabled}});var u=n(114);Object.defineProperty(t,"isSamePath",{enumerable:!0,get:function(){return u.isSamePath}});var a=n(115);Object.defineProperty(t,"useTitleFormatter",{enumerable:!0,get:function(){return a.useTitleFormatter}});var c=n(116);Object.defineProperty(t,"usePluralForm",{enumerable:!0,get:function(){return c.usePluralForm}});var l=n(117);Object.defineProperty(t,"useDocsPreferredVersion",{enumerable:!0,get:function(){return l.useDocsPreferredVersion}}),Object.defineProperty(t,"useDocsPreferredVersionByPluginId",{enumerable:!0,get:function(){return l.useDocsPreferredVersionByPluginId}});var f=n(98);Object.defineProperty(t,"DocsPreferredVersionContextProvider",{enumerable:!0,get:function(){return f.DocsPreferredVersionContextProvider}})},85:function(e,t,n){"use strict";function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}t.a=function(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}},86:function(e,t,n){"use strict";n.d(t,"b",(function(){return f})),n.d(t,"a",(function(){return d}));var r=n(0),o=n.n(r);const i=/{\w+}/g,s="{}";function u(e,t){const n=[],r=e.replace(i,(e=>{const r=e.substr(1,e.length-2),i=null==t?void 0:t[r];if(void 0!==i){const e=o.a.isValidElement(i)?i:String(i);return n.push(e),s}return e}));return 0===n.length?e:n.every((e=>"string"==typeof e))?r.split(s).reduce(((e,t,r)=>{var o;return e.concat(t).concat(null!==(o=n[r])&&void 0!==o?o:"")}),""):r.split(s).reduce(((e,t,r)=>[...e,o.a.createElement(o.a.Fragment,{key:r},t,n[r])]),[])}function a({children:e,values:t}){return u(e,t)}var c=n(26);function l({id:e,message:t}){var n;return null!==(n=c[null!=e?e:t])&&void 0!==n?n:t}function f({message:e,id:t},n){var r;return u(null!==(r=l({message:e,id:t}))&&void 0!==r?r:e,n)}function d({children:e,id:t,values:n}){var r;const i=null!==(r=l({message:e,id:t}))&&void 0!==r?r:e;return o.a.createElement(a,{values:n},i)}},87:function(e,t,n){try{e.exports=n(111)}catch(r){const t={};e.exports={useAllDocsData:()=>t,useActivePluginAndVersion:()=>{}}}},88:function(e,t,n){"use strict";var r=n(0),o=n.n(r),i=n(10),s=n(94),u=n(8);const a=Object(r.createContext)({collectLink:()=>{}});var c=n(89),l=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};t.a=function(e){var t,{isNavLink:n,to:f,href:d,activeClassName:p,isActive:g,"data-noBrokenLinkCheck":v,autoAddBaseUrl:m=!0}=e,b=l(e,["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"]);const{withBaseUrl:h}=Object(c.b)(),P=Object(r.useContext)(a),D=f||d,y=Object(s.a)(D),O=null==D?void 0:D.replace("pathname://",""),j=void 0!==O?(_=O,m&&(e=>e.startsWith("/"))(_)?h(_):_):void 0;var _;const w=Object(r.useRef)(!1),A=n?i.e:i.c,V=u.a.canUseIntersectionObserver;let E;Object(r.useEffect)((()=>(!V&&y&&window.docusaurus.prefetch(j),()=>{V&&E&&E.disconnect()})),[j,V,y]);const C=null!==(t=null==j?void 0:j.startsWith("#"))&&void 0!==t&&t,x=!j||!y||C;return j&&y&&!C&&!v&&P.collectLink(j),x?o.a.createElement("a",Object.assign({href:j},D&&!y&&{target:"_blank",rel:"noopener noreferrer"},b)):o.a.createElement(A,Object.assign({},b,{onMouseEnter:()=>{w.current||(window.docusaurus.preload(j),w.current=!0)},innerRef:e=>{var t,n;V&&e&&y&&(t=e,n=()=>{window.docusaurus.prefetch(j)},E=new window.IntersectionObserver((e=>{e.forEach((e=>{t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(E.unobserve(t),E.disconnect(),n())}))})),E.observe(t))},to:j||""},n&&{isActive:g,activeClassName:p}))}},89:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return s}));var r=n(16),o=n(94);function i(){const{siteConfig:{baseUrl:e="/",url:t}={}}=Object(r.default)();return{withBaseUrl:(n,r)=>function(e,t,n,{forcePrependBaseUrl:r=!1,absolute:i=!1}={}){if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(r)return t+n;const s=n.startsWith(t)?n:t+n.replace(/^\//,"");return i?e+s:s}(t,e,n,r)}}function s(e,t={}){const{withBaseUrl:n}=i();return n(e,t)}},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return g}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),l=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},f=function(e){var t=l(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),f=l(n),p=r,g=f["".concat(s,".").concat(p)]||f[p]||d[p]||i;return n?o.a.createElement(g,u(u({ref:t},c),{},{components:n})):o.a.createElement(g,u({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=p;var u={};for(var a in t)hasOwnProperty.call(t,a)&&(u[a]=t[a]);u.originalType=e,u.mdxType="string"==typeof e?e:r,s[1]=u;for(var c=2;c<i;c++)s[c]=n[c];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},94:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}))},96:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useThemeConfig=void 0;const o=r(n(16));t.useThemeConfig=function(){return o.default().siteConfig.themeConfig}},97:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDocsPluginEnabled=void 0;const r=n(87);t.isDocsPluginEnabled=!!r.useAllDocsData},98:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useDocsPreferredVersionContext=t.DocsPreferredVersionContextProvider=void 0;const u=i(n(0)),a=n(96),c=n(97),l=n(87),f=s(n(118));function d({pluginIds:e,versionPersistence:t,allDocsData:n}){const r={};return e.forEach((e=>{r[e]=function(e){const r=f.default.read(e,t);return n[e].versions.some((e=>e.name===r))?{preferredVersionName:r}:(f.default.clear(e,t),{preferredVersionName:null})}(e)})),r}function p(){const e=l.useAllDocsData(),t=a.useThemeConfig().docs.versionPersistence,n=u.useMemo((()=>Object.keys(e)),[e]),[r,o]=u.useState((()=>function(e){const t={};return e.forEach((e=>{t[e]={preferredVersionName:null}})),t}(n)));u.useEffect((()=>{o(d({allDocsData:e,versionPersistence:t,pluginIds:n}))}),[e,t,n]);return[r,u.useMemo((()=>({savePreferredVersion:function(e,n){f.default.save(e,t,n),o((t=>Object.assign(Object.assign({},t),{[e]:{preferredVersionName:n}})))}})),[o])]}const g=u.createContext(null);function v({children:e}){const t=p();return u.default.createElement(g.Provider,{value:t},e)}t.DocsPreferredVersionContextProvider=function({children:e}){return c.isDocsPluginEnabled?u.default.createElement(v,null,e):u.default.createElement(u.default.Fragment,null,e)},t.useDocsPreferredVersionContext=function(){const e=u.useContext(g);if(!e)throw new Error("Can't find docs preferred context, maybe you forgot to use the DocsPreferredVersionContextProvider ?");return e}}}]);