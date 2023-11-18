(this["webpackJsonpcrypto-watch"]=this["webpackJsonpcrypto-watch"]||[]).push([[0],{11:function(e,n,t){"use strict";var c,a,o=t(2),r=t(3),i=t(1);const s=Object(r.b)(c||(c=Object(o.a)(["\n    to {\n        transform: rotate(1turn);\n    }\n"]))),l=r.a.span(a||(a=Object(o.a)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-grow: 1;\n  > span {\n    border: 3px solid var(--border-color);\n    border-radius: 50%;\n    border-top-color: var(--text-color);\n    width: 1em;\n    height: 1em;\n    animation: "," 1s linear 0s infinite;\n  }\n"])),s);n.a=()=>Object(i.jsx)(l,{children:Object(i.jsx)("span",{})})},33:function(e,n,t){},53:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t.n(c),o=t(12),r=t.n(o),i=(t(33),t(2)),s=t(3),l=t(6),d=t(11),u=t(1);const p=a.a.createContext({period:"1D",setPeriod:()=>{}}),b=({children:e})=>{const[n,t]=Object(c.useState)("1D");return Object(u.jsx)(p.Provider,{value:{period:n,setPeriod:t},children:e})},h=e=>String(e).replace(/\.?0+$/,""),j=e=>h(e.toFixed((e=>{if(e>=1)return Math.max(1,4-Math.floor(Math.log10(e)));{let n=-2;for(;1-e>=0;)e*=10,n+=1;return Math.max(4,4+n)}})(e)));var m,x,g,f,O;const v=s.a.div(m||(m=Object(i.a)(["\n  position: relative;\n  overflow: hidden;\n  display: inline-block;\n  padding: 6px 8px;\n  /* margin-top: 8px; */\n  vertical-align: top;\n  /* display: inline-block; */\n  /* border-left: 1px solid #fff; */\n  /* border-radius: 4px; */\n  cursor: pointer;\n  box-sizing: border-box;\n  user-select: none;\n  white-space: nowrap;\n  width: 33%;\n  /* border-bottom: 1px solid var(--border-color); */\n  @media screen and (min-width: 1200px) {\n    width: 25%;\n  }\n  @media screen and (min-width: 551px) and (max-width: 850px) {\n    width: calc(50%);\n  }\n  @media screen and (max-width: 550px) {\n    width: 100%;\n    /* overflow: hidden; */\n  }\n\n  button {\n    /* font-size: 0.8em; */\n    /* height: 80%; */\n  }\n\n  .buttons {\n    display: grid;\n    grid-auto-flow: column;\n    gap: 4px;\n    margin-left: 8px;\n    /* position: absolute; */\n    right: 0;\n    top: 0;\n    height: 100%;\n    z-index: 10;\n    background-color: var(--background-color);\n    /* transform: translateX(calc(101%)); */\n    transition: all 0.3s ease;\n    /* &.edit {\n      transform: none;\n    } */\n    /* overflow: hidden; */\n    /* > button {\n    } */\n    /* background: red; */\n  }\n"]))),w=s.a.div(x||(x=Object(i.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  /* &:hover {\n    transform: translateY(-2px);\n  } */\n  @media screen and (max-width: 450px) {\n    > a:first-child {\n      max-width: 45vw;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n  }\n\n  > span.metrics {\n    display: flex;\n    align-items: center;\n  }\n\n  > a {\n    color: inherit;\n    font-size: 1.1rem;\n    text-decoration: none;\n    font-weight: bold;\n\n    > span {\n      display: inline-flex;\n      flex-direction: column;\n      vertical-align: middle;\n\n      > span:nth-child(2) {\n        font-size: 0.8rem;\n        opacity: 0.5;\n      }\n    }\n  }\n\n  img {\n    width: 2rem;\n    margin-right: 0.5em;\n    vertical-align: middle;\n  }\n\n  span.price {\n    font-weight: bold;\n    font-size: 1.1rem;\n    transition: all 0.1s linear;\n    display: inline-flex;\n    flex-direction: column;\n    align-items: flex-end;\n    vertical-align: bottom;\n\n    &.up {\n      color: var(--up-color);\n    }\n\n    &.down {\n      color: var(--down-color);\n    }\n\n    > span:nth-child(2) {\n      font-size: 0.8rem;\n      opacity: 0.5;\n    }\n  }\n\n  span.percentage {\n    padding: 4px 8px;\n    border-radius: 4px;\n    color: #fff;\n    margin-left: 12px;\n    display: inline-block;\n    text-align: center;\n    /* width: 4.5em; */\n  }\n"]))),y=s.a.div(g||(g=Object(i.a)(["\n  padding-top: 8px;\n  /* border-bottom: 1px solid var(--border-color); */\n  justify-content: space-between;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n"]))),S=s.a.div(f||(f=Object(i.a)(["\n  display: flex;\n  flex-grow: 1;\n\n  .switch {\n    display: grid;\n    margin-right: 8px;\n\n    > span {\n      border: 1px solid transparent;\n      border-top-left-radius: 6px;\n      border-bottom-left-radius: 6px;\n      padding: 2px 4px;\n      border-right-color: #1fe230;\n\n      &.selected {\n        /* color: yellow; */\n        border-color: #1fe230;\n        border-right-color: transparent;\n      }\n    }\n  }\n\n  img {\n    width: 100%;\n  }\n"]))),k=(s.a.div(O||(O=Object(i.a)(["\n  display: flex;\n\n  input {\n    border-bottom: none;\n    /* width: auto; */\n    flex-grow: 1;\n  }\n\n  button {\n    cursor: pointer;\n  }\n\n  span {\n    padding-top: 2px;\n  }\n"]))),Object(c.lazy)((()=>Promise.all([t.e(4),t.e(3)]).then(t.bind(null,55))))),C=Object(c.memo)((({id:e=1})=>{const{period:n,setPeriod:t}=Object(c.useContext)(p),[a,o]=Object(c.useState)(n);return Object(c.useEffect)((()=>{t(a)}),[t,a]),Object(u.jsxs)(S,{children:[Object(u.jsxs)("div",{className:"switch",children:[Object(u.jsx)("span",{className:"1D"===a?"selected":void 0,onClick:()=>o("1D"),children:"24h"}),Object(u.jsx)("span",{className:"7D"===a?"selected":void 0,onClick:()=>o("7D"),children:"7D"}),Object(u.jsx)("span",{className:"1M"===a?"selected":void 0,onClick:()=>o("1M"),children:"1M"}),Object(u.jsx)("span",{className:"3M"===a?"selected":void 0,onClick:()=>o("3M"),children:"3M"}),Object(u.jsx)("span",{className:"1Y"===a?"selected":void 0,onClick:()=>o("1Y"),children:"1Y"})]}),Object(u.jsx)(N,{id:e,period:a})]})})),N=({id:e=1,period:n="1D"})=>Object(u.jsx)(c.Suspense,{fallback:Object(u.jsx)(d.a,{}),children:Object(u.jsx)(k,{id:e,period:n})});var D,E=Object(c.memo)((({name:e,info:n,onRemove:t,prices:a,setPrices:o,idx:r,expandStatus:i,setExpandStatus:s,edit:d})=>{const{id:p,p24h:b,price:m,slug:x,symbol:g,amount:f}=n,O=Object(c.useRef)(m),[S,k]=Object(c.useState)(0),[N,D]=Object(c.useState)(f);Object(c.useEffect)((()=>{m!==O.current&&void 0!==m&&void 0!==O.current&&(O.current<m?k(1):k(-1),setTimeout((()=>k(0)),1e3)),O.current=m}),[m]);const E=e=>{const n=e?-1:1,t=a[r+n];a[r+n]=a[r],a[r]=t,o([...a])},M=!!i[p],L=Object(c.useMemo)((()=>m?j(m):"-"),[m]),P=e=>{if(!e)return;const n=Number(e.target.value);D(n);const t=a.findIndex((e=>e.id===p));t>=0&&(a[t]={...a[t],amount:n},o([...a]))};return Object(u.jsxs)(v,{children:[Object(u.jsxs)(w,{onClick:()=>{i[p]=!i[p],s({...i})},children:[Object(u.jsxs)("a",{href:"https://coinmarketcap.com/currencies/".concat(x,"/"),target:"_blank",rel:"noreferrer",onClick:e=>e.stopPropagation(),children:[Object(u.jsx)("img",{src:"https://s2.coinmarketcap.com/static/img/coins/64x64/".concat(p,".png"),alt:p}),Object(u.jsxs)("span",{children:[Object(u.jsx)("span",{children:e||g||"unknown"}),N>0&&Object(u.jsxs)("span",{children:["Balance: ",(F=N,F>=1e9?h((F/1e9).toFixed(2))+"T":F>=1e6?h((F/1e6).toFixed(2))+"M":F>=1e3?h((F/1e3).toFixed(2))+"K":F)]})]})]}),d?Object(u.jsxs)("div",{className:"buttons",onClick:e=>e.stopPropagation(),children:[Object(u.jsx)("input",{placeholder:"Balance",type:"number",value:N,onChange:P,onKeyDown:e=>{"Enter"===e.key&&P(e)}}),Object(u.jsx)("button",{onClick:()=>E(!0),disabled:0===r,children:Object(u.jsx)(l.a,{})}),Object(u.jsx)("button",{onClick:()=>E(),disabled:r===a.length-1,children:Object(u.jsx)(l.b,{})}),Object(u.jsx)("button",{onClick:()=>t(p),className:"danger",children:Object(u.jsx)(l.h,{})})]}):Object(u.jsxs)("span",{className:"metrics",children:[Object(u.jsxs)("span",{className:"price ".concat(1===S?"up":-1===S?"down":""),children:[Object(u.jsxs)("span",{children:["$",L]}),N>0&&!!m&&Object(u.jsxs)("span",{children:["$",(m*N).toFixed(2)]})]}),Object(u.jsx)("span",{className:"percentage",style:{backgroundColor:b>0?"rgba(0, 255, 0, ".concat(Math.max(.5,Math.sqrt(Math.abs(b/20))),")"):"rgba(255, 0, 0, ".concat(Math.max(.5,Math.sqrt(Math.abs(b/20))),")")},children:b?"".concat(b.toFixed(2),"%"):""})]})]},p),M&&Object(u.jsx)(y,{children:Object(u.jsx)(C,{id:p})})]});var F}));const M=s.a.p(D||(D=Object(i.a)(["\n  position: fixed;\n  bottom: 0;\n  margin: 0px auto;\n  font-size: 0.8em;\n  padding: 8px;\n  width: 100%;\n  background-color: var(--background-color);\n  /* border-top: 1px solid var(--border-color); */\n  display: grid;\n  grid-auto-flow: column;\n  grid-template-columns: 1fr 1fr;\n  align-items: center;\n  transition: all 0.3s ease-in-out, transform 0.3s linear 3s;\n\n  backdrop-filter: blur(6px);\n  a {\n    color: var(--text-color);\n    color: inherit;\n  }\n\n  &.Connecting {\n    background-color: yellow;\n    color: #000;\n  }\n  &.Connected {\n    background-color: rgba(0, 255, 0, 0.33);\n    transform: translateY(calc(100% - 4px));\n  }\n  &.Disconnected {\n    background-color: var(--down-color);\n  }\n  > *:first-child {\n    justify-self: start;\n  }\n  > *:last-child {\n    justify-self: end;\n  }\n"])));var L,P,F=({wsStatus:e,lastRefetch:n,reconnect:t})=>{const c=e,a=0===c||void 0===c?"Connecting":1===c?"Connected":3===c?"Disconnected":void 0;return Object(u.jsxs)(M,{className:a,children:[Object(u.jsx)("span",{children:Object(u.jsx)("i",{children:((+new Date-Number(n))/1e3).toFixed(0)+" Seconds ago"})}),Object(u.jsxs)("span",{children:[Object(u.jsx)("i",{children:a}),3===c&&Object(u.jsx)("button",{onClick:t,children:"Reconnect"})]})]})};const z=s.a.div(L||(L=Object(i.a)(["\n  cursor: pointer;\n  margin: 4px auto;\n\n  > img {\n    width: 1.5em;\n    margin-right: 0.5em;\n    vertical-align: middle;\n  }\n"]))),I=s.a.div(P||(P=Object(i.a)(["\n  width: 100%;\n\n  > div {\n    position: absolute;\n    background: var(--background-color);\n    border: 1px solid var(--border-color);\n    border-radius: 4px;\n    width: 100%;\n    text-align: left;\n    padding-left: 8px;\n    z-index: 10;\n    max-height: calc(100vw - 150px);\n    overflow: scroll;\n  }\n"])));var _=({onAdd:e,mapData:n})=>{const[t,a]=Object(c.useState)(""),o=Object.values(n),r=Object(c.useRef)(null),i=t?o.filter((e=>e.name.toLowerCase().includes(t.toLowerCase())||e.symbol.toLowerCase().includes(t.toLowerCase()))):[];return Object(u.jsxs)(I,{children:[Object(u.jsx)("input",{value:t,onChange:e=>a(e.target.value),placeholder:o.length?"Try 'Bitcoin'":"Loading...",disabled:!o.length,ref:r,className:"crypto-search",style:{padding:"8px"}}),i.length?Object(u.jsx)("div",{children:i.slice(0,100).map((n=>Object(u.jsxs)(z,{onClick:()=>{e(n.id),a(""),setTimeout((()=>{var e;null===(e=r.current)||void 0===e||e.focus()}),500)},children:[Object(u.jsx)("img",{src:"https://s2.coinmarketcap.com/static/img/coins/64x64/".concat(n.id,".png"),alt:n.id}),n.name]},n.id)))}):null]})},R=t(5),T=t.n(R),Y=t(7);var B=(e,n)=>{const[t,a]=Object(c.useState)(new Date),o=()=>T.a.get("".concat(Y.a,"/api/proxy/crypto-watch/data-api/v3/cryptocurrency/listing?ids=").concat(e.join(","),"&aux=ath")).then((({data:e})=>{if(!(null===e||void 0===e?void 0:e.data))return;const t=e.data.cryptoCurrencyList;a(new Date),n((e=>e.map((e=>{const n=t.find((n=>n.id===e.id));var c,a,o,r;return n?{...e,price:(null===(c=n.quotes)||void 0===c||null===(a=c[0])||void 0===a?void 0:a.price)||0,p24h:(null===(o=n.quotes)||void 0===o||null===(r=o[0])||void 0===r?void 0:r.percentChange24h)||0,name:n.name,slug:n.slug}:e}))))}));return Object(c.useEffect)((()=>{e.length&&o()}),[e.length,n]),[o,t]};var A=e=>{const[n,t]=Object(c.useState)((()=>localStorage.getItem(e)?JSON.parse(String(localStorage.getItem(e))).data:{})),a=Object(c.useCallback)((()=>T.a.get("".concat(Y.a,"/api/proxy/crypto-watch/data-api/v3/map/all?cryptoAux=status&limit=10000&listing_status=active&start=1")).then((({data:n})=>{const c=n.data.cryptoCurrencyMap.reduce(((e,n)=>(e[n.id]=n,e)),{});t(c),localStorage.setItem(e,JSON.stringify({data:c,timeStamp:+new Date}))}))),[e]);return Object(c.useEffect)((()=>{if(localStorage.getItem(e)){JSON.parse(String(localStorage.getItem(e))).timeStamp+864e5<=Number(new Date)&&(console.log("refetch!"),a())}else console.log("init fetch!"),a()}),[a,e]),n};var J=(e,n)=>{const t=Object(c.useRef)(!1);Object(c.useEffect)((()=>{t.current?e():t.current=!0}),[n])};var q=function(e,n){const[t,a]=Object(c.useState)(e);return Object(c.useEffect)((()=>{const t=setTimeout((()=>{a(e)}),n);return()=>{clearTimeout(t)}}),[e,n]),t};var U=function(e){const[n,t]=Object(c.useState)(document.hasFocus());return Object(c.useEffect)((()=>{const n=()=>{const n=document.hasFocus();t(n),e(n)};return window.addEventListener("focus",n),window.addEventListener("blur",n),()=>{window.removeEventListener("focus",n),window.removeEventListener("blur",n)}}),[e]),n};var K,W=({onClose:e,onMessage:n,ids:t})=>{const[a,o]=Object(c.useState)(0),r=Object(c.useRef)(),i=q(t.join(","),5e3).split(",").filter(Boolean).map(Number),s=()=>{l().then((e=>{d(i)}))};Object(c.useEffect)((()=>{i.length&&s()}),[i.length]);const l=()=>((()=>{var e;null===(e=r.current)||void 0===e||e.close()})(),new Promise(((t,c)=>{try{return console.log("connecting..."),r.current=new WebSocket("wss://push.coinmarketcap.com/ws?device=web&client_source=home_page"),r.current.addEventListener("open",(e=>{console.log("ws opened!"),t(r.current)})),r.current.onmessage=function(e){null===n||void 0===n||n(e)},r.current.addEventListener("close",(n=>{console.log("ws closed!"),null===e||void 0===e||e(),r.current&&o(r.current.readyState),setTimeout((()=>{s()}),3e3)})),window.wsss=r.current,r.current}catch(a){console.log("reconnecting..."),setTimeout((()=>{l().then((e=>{t(r.current)}))}),1e3)}}))),d=e=>{if(!r.current)return;const n=r.current;o(n.readyState);const t={method:"RSUBSCRIPTION",params:["main-site@crypto_price_5s@{}@normal",e.join(",")]};n.send(JSON.stringify(t))};return U((e=>{var n;e&&3===(null===(n=r.current)||void 0===n?void 0:n.readyState)&&s()})),[a,s]};const $=T.a.create({headers:{Authorization:"Bearer 5fcb77e68787da1467daeea55f0dd01a017efdf3"}}),G=s.a.div(K||(K=Object(i.a)(["\n  display: flex;\n  justify-content: center;\n  padding: 8px;\n  /* position: absolute; */\n  /* bottom: 0.5em; */\n  width: 100%;\n  font-size: 0.8em;\n  a {\n    &:visited {\n      color: var(--text-color);\n    }\n  }\n  .export {\n    text-decoration: underline;\n  }\n"])));var H,V=()=>Object(u.jsxs)(G,{className:"info",children:[Object(u.jsxs)("span",{children:["Data Source:"," ",Object(u.jsx)("a",{href:"https://coinmarketcap.com/",target:"_blank",rel:"noreferrer",children:"CoinMarketCap"})]}),"\xa0\xa0\xa0",Object(u.jsx)("span",{children:Object(u.jsx)("a",{href:"https://github.com/YueminHu/crypto_watch",target:"_blank",rel:"noreferrer",children:"Github"})}),"\xa0\xa0\xa0",Object(u.jsx)("span",{className:"export",onClick:()=>{$.patch("https://api-ssl.bitly.com/v4/bitlinks/bit.ly/3NOtY7t",{long_url:"https://google.com"}).then((({data:e})=>{navigator.clipboard.writeText(e.link).then((()=>{alert("Link Copied!")}))}))},children:"Update"})]}),X=t(8);const Q=s.a.div(H||(H=Object(i.a)(["\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.8);\n  z-index: 10;\n  display: flex;\n  > div {\n    width: 80vw;\n    max-width: 500px;\n    padding: 24px;\n    background: rgba(255, 255, 255, 0.8);\n    margin: auto;\n    border-radius: 16px;\n  }\n"])));var Z=({children:e,show:n})=>n?Object(o.createPortal)(Object(u.jsx)(Q,{children:Object(u.jsx)("div",{children:e})}),document.body):null;const ee=e=>new URL(window.location.href).searchParams.get(e);var ne;const te=s.a.div(ne||(ne=Object(i.a)(["\n  input {\n    color: #000;\n  }\n\n  form > p:last-child {\n    display: flex;\n    justify-content: space-between;\n  }\n"])));var ce,ae,oe,re=({prices:e})=>{const[n,t]=Object(c.useState)(!1),[a,o]=Object(c.useState)(""),[r,i]=Object(c.useState)(""),[s,p]=Object(c.useState)(!1);Object(c.useEffect)((()=>{const e=ee("name");e&&o(e)}),[]);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("button",{onClick:()=>{t(!0)},children:[Object(u.jsx)(l.c,{}),"Save"]}),Object(u.jsx)(Z,{show:n,children:Object(u.jsx)(te,{children:Object(u.jsxs)("form",{onSubmit:n=>{n.preventDefault();const c=n.target,a=c.name.value,o=c.secret.value;if(!a)return alert("name is required!");const r={name:a,secret:o,list:e.map((e=>({id:e.id,amount:e.amount?e.amount:void 0})))};p(!0),T.a.post("".concat(Y.a,"/api/v1/crypto-watch-name"),r).then((e=>{0===e.data.status.code&&(((e,n)=>{const t=new URL(window.location.href);n&&n.forEach((e=>t.searchParams.delete(e))),Object.keys(e).forEach((n=>{t.searchParams.set(n,String(e[n]))})),window.history.replaceState("",document.title,t)})({name:r.name},["ids"]),t(!1)),alert("status: "+e.data.status.code)})).catch((e=>{alert(e.message)})).finally((()=>{p(!1)}))},children:[Object(u.jsx)("p",{children:Object(u.jsx)("input",{type:"text",placeholder:"name...",name:"name",value:a,onChange:e=>o(e.target.value)})}),Object(u.jsx)("p",{children:Object(u.jsx)("input",{type:"text",placeholder:"secret...",name:"secret",value:r,onChange:e=>i(e.target.value)})}),Object(u.jsxs)("p",{children:[Object(u.jsx)("button",{onClick:()=>t(!1),children:"Cancel"}),Object(u.jsx)("button",{type:"submit",disabled:s,children:s?Object(u.jsx)(d.a,{}):"Save"})]})]})})})]})};const ie="-",se="LOCAL_ID_KEY",le=s.a.div(ce||(ce=Object(i.a)(["\n  text-align: left;\n  padding: 0px 8px;\n  /* padding-top: 8px; */\n"]))),de=s.a.div(ae||(ae=Object(i.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: sticky;\n  padding: 8px;\n  /* top: 0; */\n  background-image: linear-gradient(\n    to bottom,\n    var(--background-color) 0%,\n    var(--background-color) 70%,\n    transparent 100%\n  );\n  top: -1px;\n  z-index: 10;\n  @media screen and (max-width: 450px) {\n    flex-direction: column;\n    /* overflow: hidden; */\n  }\n\n  > div:first-child {\n    flex-grow: 1;\n  }\n\n  > p.buttons {\n    white-space: nowrap;\n    width: 100%;\n    overflow: scroll;\n    padding: 4px 8px;\n    margin: 0px;\n  }\n"]))),ue=s.a.div(oe||(oe=Object(i.a)(["\n  text-align: center;\n  cursor: pointer;\n  margin: 32px auto;\n  font-weight: bold;\n"]))),pe=()=>{const e=new URL(window.location.href);if(e.searchParams.get("name"))return[];const n=localStorage.getItem(se)||e.searchParams.get("ids")||"",t=n.match(/[a-z]/);return n?n.split("_").map((e=>({id:e.includes(ie)?parseInt(e.split(ie)[0],t?36:10):parseInt(e,t?36:10)||1,amount:e.includes(ie)?Number(e.split(ie)[1]):""}))):[]};function be(){const[e,n]=Object(c.useState)(!1),[t,a]=Object(c.useState)(pe),[o,r]=Object(c.useState)({}),i=t.map((({id:e})=>e)),s=t.map((({amount:e})=>e)),d=A("LOCAL_KEY"),[p,h]=B(i,a),[j,m]=W({ids:i,onClose:()=>p(),onMessage:e=>{const n=JSON.parse(e.data);if(null===n||void 0===n?void 0:n.d){const e=n.d;X.a.emit("WS-".concat(e.id),e),a((n=>n.map((n=>n.id===e.id?{...e,...n,price:e.p,p24h:e.p24h}:n))))}else console.log(n)}}),x=(e,n)=>{i.includes(e)&&n||(a((t=>n?[...t,{id:e}]:t.filter((n=>n.id!==e)))),r({...o,[e]:!0}))};return Object(c.useEffect)((()=>{const e=ee("name");e&&T.a.get("".concat(Y.a,"/api/v1/crypto-watch-name?name=").concat(e)).then((e=>{e.data.data&&a(e.data.data)}))}),[]),J((()=>{const e=i.map(((e,n)=>e.toString(36)+(s[n]?"".concat(ie).concat(s[n]):""))).join("_");localStorage.setItem(se,e)}),i.join()+s.join()),Object(u.jsx)(b,{children:Object(u.jsxs)("div",{className:"App",children:[Object(u.jsxs)(de,{children:[Object(u.jsx)(_,{onAdd:e=>x(e,!0),mapData:d}),Object(u.jsxs)("p",{className:"buttons",children:[Object(u.jsxs)("button",{onClick:()=>{const e=[...t];e.sort(((e,n)=>e.amount&&e.price&&n.price&&n.amount&&"number"===typeof e.amount&&"number"===typeof n.amount?n.amount*n.price-e.amount*e.price:-1/0)),a(e)},children:[Object(u.jsx)(l.g,{}),"Sort Value"]}),"\xa0",Object(u.jsxs)("button",{onClick:()=>{const e=[...t];e.sort(((e,n)=>e.p24h&&n.p24h?n.p24h-e.p24h:1/0)),a(e)},children:[Object(u.jsx)(l.f,{}),"Sort Change"]}),"\xa0",Object(u.jsxs)("button",{onClick:()=>r({}),children:[Object(u.jsx)(l.e,{}),"Fold All"]}),"\xa0",Object(u.jsxs)("button",{onClick:()=>n(!e),children:[Object(u.jsx)(l.d,{}),e?"Done":"Edit"]}),"\xa0",Object(u.jsx)(re,{prices:t})]})]}),Object(u.jsx)(le,{children:t.length?t.map(((n,c)=>{var i;return Object(u.jsx)(E,{name:null===(i=d[n.id])||void 0===i?void 0:i.symbol,info:n,onRemove:e=>x(e),prices:t,setPrices:a,idx:c,expandStatus:o,setExpandStatus:r,edit:e},n.id)})):Object(u.jsx)(ue,{onClick:()=>{var e;null===(e=document.querySelector("input.crypto-search"))||void 0===e||e.focus()},children:"Click me to add"})}),t.some((e=>!!e.amount))&&Object(u.jsxs)("p",{children:["Total Balance: $",Object(u.jsx)("b",{children:t.reduce(((e,n)=>n.amount&&n.price&&"number"==typeof n.amount?e+n.amount*n.price:e),0).toFixed(2)})]}),Object(u.jsx)(V,{}),i.length?Object(u.jsx)(F,{wsStatus:j,reconnect:m,lastRefetch:h}):null]})})}var he=e=>{e&&e instanceof Function&&t.e(5).then(t.bind(null,56)).then((({getCLS:n,getFID:t,getFCP:c,getLCP:a,getTTFB:o})=>{n(e),t(e),c(e),a(e),o(e)}))};r.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(be,{})}),document.getElementById("root")),he()},7:function(e,n,t){"use strict";t.d(n,"a",(function(){return s}));var c=t(5),a=t.n(c),o=t(0),r=t(8);const i={"1D":300,"7D":300,"1M":3600,"3M":3600,"1Y":86400},s="https://yoomin.us";n.b=(e,n)=>{const[t,c]=Object(o.useState)([]),[l,d]=Object(o.useState)(!0),u=Object(o.useCallback)((()=>(d(!0),a.a.get("".concat(s,"/api/proxy/crypto-watch/data-api/v3/cryptocurrency/detail/chart?id=").concat(e,"&range=").concat(n)).then((({data:e})=>{const n=Object.entries(e.data.points).map((([e,n])=>({time:Number(e),value:n.v[0]})));return c(n),n})).catch((e=>[])).finally((()=>{d(!1)})))),[e,n]);return Object(o.useEffect)((()=>{u();const t=r.a.subscribe("WS-".concat(e),(e=>{c((t=>{if(!t.length)return t;const c=t[t.length-1],a=1e3*c.time;return Number(new Date)-a>=1e3*i[n]?[...t,{time:Math.floor(Number(new Date)/1e3),value:e.p}]:(c.value=e.p,[...t])}))}));return()=>{console.log("unsubscribe!"),r.a.unsubscribe("WS-".concat(e),t)}}),[e,n,u]),[t,l]}},8:function(e,n,t){"use strict";n.a=new class{constructor(){this.cbs=void 0,this.cbs={}}subscribe(e,n){return this.cbs[e]||(this.cbs[e]=[]),this.cbs[e].push(n),n}unsubscribe(e,n){this.cbs[e]&&(this.cbs[e]=this.cbs[e].filter((e=>e!==n)),0===this.cbs[e].length&&delete this.cbs[e])}emit(e,n){this.cbs[e]&&this.cbs[e].forEach((e=>e(n)))}}}},[[53,1,2]]]);
//# sourceMappingURL=main.38de93c6.chunk.js.map