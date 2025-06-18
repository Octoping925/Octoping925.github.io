import{j as r,r as d}from"./index-Dqh-XhKm.js";const $=({children:t,id:a})=>{const o=s=>{s.dataTransfer.setData("text/plain",a)};return r.jsx("div",{draggable:!0,onDragStart:o,className:"cursor-move",children:t})},v=({children:t,onDrop:a,className:o=""})=>{const s=n=>{n.preventDefault()},c=n=>{n.preventDefault();const m=n.dataTransfer.getData("text/plain");a(m)};return r.jsx("div",{onDragOver:s,onDrop:c,className:o,children:t})};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),O=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,o,s)=>s?s.toUpperCase():o.toLowerCase()),N=t=>{const a=O(t);return a.charAt(0).toUpperCase()+a.slice(1)},S=(...t)=>t.filter((a,o,s)=>!!a&&a.trim()!==""&&s.indexOf(a)===o).join(" ").trim(),_=t=>{for(const a in t)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var R={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=d.forwardRef(({color:t="currentColor",size:a=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:c="",children:n,iconNode:m,...g},b)=>d.createElement("svg",{ref:b,...R,width:a,height:a,stroke:t,strokeWidth:s?Number(o)*24/Number(a):o,className:S("lucide",c),...!n&&!_(g)&&{"aria-hidden":"true"},...g},[...m.map(([h,x])=>d.createElement(h,x)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(t,a)=>{const o=d.forwardRef(({className:s,...c},n)=>d.createElement(K,{ref:n,iconNode:a,className:S(`lucide-${L(N(t))}`,`lucide-${t}`,s),...c}));return o.displayName=N(t),o};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],M=C("copy",F);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],U=C("x",J),k="hots-team-maker-state",W=t=>{localStorage.setItem(k,JSON.stringify(t))},Z=()=>{const t=localStorage.getItem(k);if(!t)return null;try{return JSON.parse(t)}catch(a){return console.error("Failed to load state from localStorage:",a),null}},G=()=>{const[t,a]=d.useState(""),[o,s]=d.useState([]),[c,n]=d.useState([]),[m,g]=d.useState([]),[b,h]=d.useState(!1);d.useEffect(()=>{const e=Z();e&&(s(e.playerPool),n(e.teamA),g(e.teamB))},[]),d.useEffect(()=>{o.length===0&&c.length===0&&m.length===0||W({playerPool:o,teamA:c,teamB:m})},[o,c,m]);const x=()=>{if(!t.trim())return;const e={id:Date.now().toString(),name:t.trim()};s([...o,e]),a("")},A=()=>{confirm("동호회 기본 멤버를 불러오시겠습니까?")&&(s([{id:"1",name:"김성봉"},{id:"2",name:"정시욱"},{id:"3",name:"문영채"},{id:"4",name:"정재윤"},{id:"5",name:"김수진"},{id:"6",name:"엄소현"},{id:"7",name:"이민행"},{id:"8",name:"채수관"},{id:"9",name:"이훈규"},{id:"10",name:"윤호영"}]),n([]),g([]))},D=(e,u)=>{switch(u){case"pool":s(i=>i.filter(l=>l.id!==e));break;case"A":n(i=>i.filter(l=>l.id!==e));break;case"B":g(i=>i.filter(l=>l.id!==e));break}},f=(e,u)=>{let i,l;if([o,c,m].forEach((p,j)=>{const w=p.find(E=>E.id===e);w&&(i=w,l=[s,n,g][j])}),!(!i||!l))switch(l(p=>p.filter(j=>j.id!==e)),u){case"pool":s(p=>[...p,i]);break;case"A":n(p=>[...p,i]);break;case"B":g(p=>[...p,i]);break}},T=e=>{e.key==="Enter"&&x()},B=()=>{const e=c.length>0?`[A팀]
${c.map(l=>l.name).join(", ")}`:"",u=m.length>0?`[B팀]
${m.map(l=>l.name).join(", ")}`:"",i=o.length>0?`[대기]
${o.map(l=>l.name).join(", ")}`:"";return[e,u,i].filter(l=>l.length>0).join(`

`)},P=async()=>{const e=B();try{await navigator.clipboard.writeText(e),h(!0),setTimeout(()=>h(!1),2e3)}catch(u){console.error("Failed to copy text: ",u)}},y=({player:e,team:u})=>r.jsx($,{id:e.id,children:r.jsxs("div",{className:`
        group relative p-3 rounded-lg shadow-lg cursor-move border flex items-center justify-between
      bg-gray-700 hover:bg-gray-600 border-gray-600
      `,children:[e.name,r.jsx("button",{className:"rounded-2xl p-1 w-fit h-fit",onClick:()=>D(e.id,u),children:r.jsx(U,{className:"w-4 h-4 text-white-400"})})]})},e.id);return r.jsx("div",{className:"w-full min-h-screen bg-gray-900 text-gray-100 p-8",children:r.jsxs("div",{className:"max-w-6xl mx-auto",children:[r.jsx("h1",{className:"text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent",children:"내전 팀 메이커"}),r.jsxs("div",{className:"mb-8 flex gap-4 justify-center",children:[r.jsx("input",{type:"text",value:t,onChange:e=>a(e.target.value),onKeyDown:T,placeholder:"플레이어 이름 입력",className:"bg-gray-800 border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors w-64 text-gray-100 placeholder-gray-500"}),r.jsx("button",{onClick:x,className:"bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold",children:"추가"}),r.jsx("button",{onClick:A,className:"bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold",children:"기본 팀 설정"}),r.jsxs("button",{onClick:P,className:"bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold flex items-center gap-2",children:[r.jsx(M,{className:"w-5 h-5"}),b?"복사됨!":"팀 구성 복사"]})]}),r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[r.jsxs(v,{onDrop:e=>f(e,"pool"),className:"bg-gray-800 p-6 rounded-xl border-2 border-gray-700 min-h-[800px]",children:[r.jsx("h2",{className:"font-bold text-xl mb-4 text-gray-300",children:"플레이어 풀"}),r.jsx("div",{className:"space-y-2",children:o.map(e=>r.jsx(y,{player:e,team:"pool"},e.id))})]}),r.jsxs(v,{onDrop:e=>f(e,"A"),className:"bg-blue-900/30 p-6 rounded-xl border-2 border-blue-800 min-h-[800px]",children:[r.jsx("h2",{className:"font-bold text-xl mb-4 text-blue-300",children:"팀 A"}),r.jsx("div",{className:"space-y-2",children:c.map(e=>r.jsx(y,{player:e,team:"A"},e.id))})]}),r.jsxs(v,{onDrop:e=>f(e,"B"),className:"bg-purple-900/30 p-6 rounded-xl border-2 border-purple-800 min-h-[800px]",children:[r.jsx("h2",{className:"font-bold text-xl mb-4 text-purple-300",children:"팀 B"}),r.jsx("div",{className:"space-y-2",children:m.map(e=>r.jsx(y,{player:e,team:"B"},e.id))})]})]})]})})},I=G;export{I as component};
