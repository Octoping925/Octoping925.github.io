import{j as t,r as u}from"./index-BSfE_7d7.js";const L=({children:r,id:o})=>{const a=s=>{s.dataTransfer.setData("text/plain",o)};return t.jsx("div",{draggable:!0,onDragStart:a,className:"cursor-move",children:r})},v=({children:r,onDrop:o,className:a=""})=>{const s=n=>{n.preventDefault()},i=n=>{n.preventDefault();const m=n.dataTransfer.getData("text/plain");o(m)};return t.jsx("div",{onDragOver:s,onDrop:i,className:a,children:r})};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),R=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,a,s)=>s?s.toUpperCase():a.toLowerCase()),N=r=>{const o=R(r);return o.charAt(0).toUpperCase()+o.slice(1)},S=(...r)=>r.filter((o,a,s)=>!!o&&o.trim()!==""&&s.indexOf(o)===a).join(" ").trim(),_=r=>{for(const o in r)if(o.startsWith("aria-")||o==="role"||o==="title")return!0};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var M={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=u.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:a=2,absoluteStrokeWidth:s,className:i="",children:n,iconNode:m,...g},b)=>u.createElement("svg",{ref:b,...M,width:o,height:o,stroke:r,strokeWidth:s?Number(a)*24/Number(o):a,className:S("lucide",i),...!n&&!_(g)&&{"aria-hidden":"true"},...g},[...m.map(([h,x])=>u.createElement(h,x)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(r,o)=>{const a=u.forwardRef(({className:s,...i},n)=>u.createElement(K,{ref:n,iconNode:o,className:S(`lucide-${O(N(r))}`,`lucide-${r}`,s),...i}));return a.displayName=N(r),a};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],J=k("copy",F);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],W=k("x",U),C="hots-team-maker-state",Z=r=>{localStorage.setItem(C,JSON.stringify(r))},G=()=>{const r=localStorage.getItem(C);if(!r)return null;try{return JSON.parse(r)}catch(o){return console.error("Failed to load state from localStorage:",o),null}};function H(){const[r,o]=u.useState(""),[a,s]=u.useState([]),[i,n]=u.useState([]),[m,g]=u.useState([]),[b,h]=u.useState(!1);u.useEffect(()=>{const e=G();e&&(s(e.playerPool),n(e.teamA),g(e.teamB))},[]),u.useEffect(()=>{a.length===0&&i.length===0&&m.length===0||Z({playerPool:a,teamA:i,teamB:m})},[a,i,m]);const x=()=>{if(!r.trim())return;const e={id:Date.now().toString(),name:r.trim()};s([...a,e]),o("")},A=()=>{confirm("동호회 기본 멤버를 불러오시겠습니까?")&&(s([{id:"1",name:"김성봉"},{id:"2",name:"정시욱"},{id:"3",name:"문영채"},{id:"4",name:"정재윤"},{id:"5",name:"이민행"},{id:"6",name:"채수관"},{id:"7",name:"이훈규"},{id:"8",name:"윤호영"},{id:"9",name:"배종근"},{id:"10",name:"박승원"},{id:"11",name:"김찬"}]),n([]),g([]))},D=()=>{const e=[...a,...i,...m];if(e.length<2)return;const d=[...e].sort(()=>Math.random()-.5),c=Math.ceil(d.length/2);n(d.slice(0,c)),g(d.slice(c)),s([])},T=(e,d)=>{switch(d){case"pool":s(c=>c.filter(l=>l.id!==e));break;case"A":n(c=>c.filter(l=>l.id!==e));break;case"B":g(c=>c.filter(l=>l.id!==e));break}},f=(e,d)=>{let c,l;if([a,i,m].forEach((p,j)=>{const w=p.find($=>$.id===e);w&&(c=w,l=[s,n,g][j])}),!(!c||!l))switch(l(p=>p.filter(j=>j.id!==e)),d){case"pool":s(p=>[...p,c]);break;case"A":n(p=>[...p,c]);break;case"B":g(p=>[...p,c]);break}},P=e=>{e.key==="Enter"&&x()},B=()=>{const e=i.length>0?`[A팀]
${i.map(l=>l.name).join(", ")}`:"",d=m.length>0?`[B팀]
${m.map(l=>l.name).join(", ")}`:"",c=a.length>0?`[대기]
${a.map(l=>l.name).join(", ")}`:"";return[e,d,c].filter(l=>l.length>0).join(`

`)},E=async()=>{const e=B();try{await navigator.clipboard.writeText(e),h(!0),setTimeout(()=>h(!1),2e3)}catch(d){console.error("Failed to copy text: ",d)}},y=({player:e,team:d})=>t.jsx(L,{id:e.id,children:t.jsxs("div",{className:`
        group relative p-3 rounded-lg shadow-lg cursor-move border flex items-center justify-between
      bg-gray-700 hover:bg-gray-600 border-gray-600
      `,children:[e.name,t.jsx("button",{className:"rounded-2xl p-1 w-12 h-10 bg-gray-900 flex items-center justify-center cursor-pointer",onClick:()=>T(e.id,d),children:t.jsx(W,{className:"w-4 h-5 text-white-400"})})]})},e.id);return t.jsx("div",{className:"w-full min-h-screen bg-gray-900 text-gray-100 p-8",children:t.jsxs("div",{className:"max-w-6xl mx-auto",children:[t.jsx("h1",{className:"text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent",children:"내전 팀 메이커"}),t.jsxs("div",{className:"mb-8 flex gap-4 justify-center",children:[t.jsx("input",{type:"text",value:r,onChange:e=>o(e.target.value),onKeyDown:P,placeholder:"플레이어 이름 입력",className:"bg-gray-800 border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors w-64 text-gray-100 placeholder-gray-500"}),t.jsx("button",{onClick:x,className:"bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold cursor-pointer",children:"추가"}),t.jsxs("button",{onClick:E,className:"bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold flex items-center gap-2 cursor-pointer",children:[t.jsx(J,{className:"w-5 h-5"}),b?"복사됨!":"팀 구성 복사"]}),t.jsx("button",{onClick:A,className:"bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold cursor-pointer",children:"기본 팀 설정"}),t.jsx("button",{onClick:D,className:"bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold cursor-pointer",children:"랜덤 팀 설정"})]}),t.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[t.jsxs(v,{onDrop:e=>f(e,"pool"),className:"bg-gray-800 p-6 rounded-xl border-2 border-gray-700 min-h-[800px]",children:[t.jsx("h2",{className:"font-bold text-xl mb-4 text-gray-300",children:"플레이어 풀"}),t.jsx("div",{className:"space-y-2",children:a.map(e=>t.jsx(y,{player:e,team:"pool"},e.id))})]}),t.jsxs(v,{onDrop:e=>f(e,"A"),className:"bg-blue-900/30 p-6 rounded-xl border-2 border-blue-800 min-h-[800px]",children:[t.jsx("h2",{className:"font-bold text-xl mb-4 text-blue-300",children:"팀 A"}),t.jsx("div",{className:"space-y-2",children:i.map(e=>t.jsx(y,{player:e,team:"A"},e.id))})]}),t.jsxs(v,{onDrop:e=>f(e,"B"),className:"bg-purple-900/30 p-6 rounded-xl border-2 border-purple-800 min-h-[800px]",children:[t.jsx("h2",{className:"font-bold text-xl mb-4 text-purple-300",children:"팀 B"}),t.jsx("div",{className:"space-y-2",children:m.map(e=>t.jsx(y,{player:e,team:"B"},e.id))})]})]})]})})}const V=H;export{V as component};
