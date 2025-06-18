import{j as a,r as i}from"./index-Ddsou1xW.js";const S=({children:t,id:r})=>{const o=s=>{s.dataTransfer.setData("text/plain",r)};return a.jsx("div",{draggable:!0,onDragStart:o,className:"cursor-move",children:t})},y=({children:t,onDrop:r,className:o=""})=>{const s=n=>{n.preventDefault()},l=n=>{n.preventDefault();const d=n.dataTransfer.getData("text/plain");r(d)};return a.jsx("div",{onDragOver:s,onDrop:l,className:o,children:t})};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),P=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,o,s)=>s?s.toUpperCase():o.toLowerCase()),w=t=>{const r=P(t);return r.charAt(0).toUpperCase()+r.slice(1)},N=(...t)=>t.filter((r,o,s)=>!!r&&r.trim()!==""&&s.indexOf(r)===o).join(" ").trim(),E=t=>{for(const r in t)if(r.startsWith("aria-")||r==="role"||r==="title")return!0};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var B={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=i.forwardRef(({color:t="currentColor",size:r=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:l="",children:n,iconNode:d,...p},h)=>i.createElement("svg",{ref:h,...B,width:r,height:r,stroke:t,strokeWidth:s?Number(o)*24/Number(r):o,className:N("lucide",l),...!n&&!E(p)&&{"aria-hidden":"true"},...p},[...d.map(([b,x])=>i.createElement(b,x)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=(t,r)=>{const o=i.forwardRef(({className:s,...l},n)=>i.createElement(T,{ref:n,iconNode:r,className:N(`lucide-${A(w(t))}`,`lucide-${t}`,s),...l}));return o.displayName=w(t),o};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],R=L("x",O),k="hots-team-maker-state",K=t=>{localStorage.setItem(k,JSON.stringify(t))},_=()=>{const t=localStorage.getItem(k);if(!t)return null;try{return JSON.parse(t)}catch(r){return console.error("Failed to load state from localStorage:",r),null}},$=()=>{const[t,r]=i.useState(""),[o,s]=i.useState([]),[l,n]=i.useState([]),[d,p]=i.useState([]);i.useEffect(()=>{const e=_();e&&(s(e.playerPool),n(e.teamA),p(e.teamB))},[]),i.useEffect(()=>{o.length===0&&l.length===0&&d.length===0||K({playerPool:o,teamA:l,teamB:d})},[o,l,d]);const h=()=>{if(!t.trim())return;const e={id:Date.now().toString(),name:t.trim()};s([...o,e]),r("")},b=(e,g)=>{switch(g){case"pool":s(c=>c.filter(m=>m.id!==e));break;case"A":n(c=>c.filter(m=>m.id!==e));break;case"B":p(c=>c.filter(m=>m.id!==e));break}},x=(e,g)=>{let c,m;if([o,l,d].forEach((u,j)=>{const v=u.find(D=>D.id===e);v&&(c=v,m=[s,n,p][j])}),!(!c||!m))switch(m(u=>u.filter(j=>j.id!==e)),g){case"pool":s(u=>[...u,c]);break;case"A":n(u=>[...u,c]);break;case"B":p(u=>[...u,c]);break}},C=e=>{e.key==="Enter"&&h()},f=({player:e,team:g})=>a.jsx(S,{id:e.id,children:a.jsxs("div",{className:`
        group relative p-3 rounded-lg shadow-lg cursor-move border flex items-center justify-between
      bg-gray-700 hover:bg-gray-600 border-gray-600
      `,children:[e.name,a.jsx("button",{className:"rounded-2xl p-1 w-fit h-fit",onClick:()=>b(e.id,g),children:a.jsx(R,{className:"w-4 h-4 text-white-400"})})]})},e.id);return a.jsx("div",{className:"w-full min-h-screen bg-gray-900 text-gray-100 p-8",children:a.jsxs("div",{className:"max-w-6xl mx-auto",children:[a.jsx("h1",{className:"text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent",children:"내전 팀 메이커"}),a.jsxs("div",{className:"mb-8 flex gap-4 justify-center",children:[a.jsx("input",{type:"text",value:t,onChange:e=>r(e.target.value),onKeyDown:C,placeholder:"플레이어 이름 입력",className:"bg-gray-800 border-2 border-gray-700 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors w-64 text-gray-100 placeholder-gray-500"}),a.jsx("button",{onClick:h,className:"bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold",children:"추가"})]}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[a.jsxs(y,{onDrop:e=>x(e,"pool"),className:"bg-gray-800 p-6 rounded-xl border-2 border-gray-700 min-h-[800px]",children:[a.jsx("h2",{className:"font-bold text-xl mb-4 text-gray-300",children:"플레이어 풀"}),a.jsx("div",{className:"space-y-2",children:o.map(e=>a.jsx(f,{player:e,team:"pool"},e.id))})]}),a.jsxs(y,{onDrop:e=>x(e,"A"),className:"bg-blue-900/30 p-6 rounded-xl border-2 border-blue-800 min-h-[800px]",children:[a.jsx("h2",{className:"font-bold text-xl mb-4 text-blue-300",children:"팀 A"}),a.jsx("div",{className:"space-y-2",children:l.map(e=>a.jsx(f,{player:e,team:"A"},e.id))})]}),a.jsxs(y,{onDrop:e=>x(e,"B"),className:"bg-purple-900/30 p-6 rounded-xl border-2 border-purple-800 min-h-[800px]",children:[a.jsx("h2",{className:"font-bold text-xl mb-4 text-purple-300",children:"팀 B"}),a.jsx("div",{className:"space-y-2",children:d.map(e=>a.jsx(f,{player:e,team:"B"},e.id))})]})]})]})})},J=$;export{J as component};
