(this["webpackJsonpwhite-tent"]=this["webpackJsonpwhite-tent"]||[]).push([[10],{85:function(e,t,n){},99:function(e,t,n){"use strict";n.r(t);var s=n(27),c=n(0),r=n(16),i=n(36),a=(n(85),n(26));function l(e){return e.substr(0,1).toUpperCase()+e.substr(1)}var o=n(9);function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e}).apply(this,arguments)}function j(e,t){if(null==e)return{};var n,s,c=function(e,t){if(null==e)return{};var n,s,c={},r=Object.keys(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)n=r[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var d=c.createElement("defs",null,c.createElement("style",null,".a{filter:url(#a);}"),c.createElement("filter",{id:"a",x:0,y:0,width:240.792,height:150,filterUnits:"userSpaceOnUse"},c.createElement("feOffset",{dy:3,input:"SourceAlpha"}),c.createElement("feGaussianBlur",{stdDeviation:5,result:"b"}),c.createElement("feFlood",{floodOpacity:.161}),c.createElement("feComposite",{operator:"in",in2:"b"}),c.createElement("feComposite",{in:"SourceGraphic"}))),b=c.createElement("g",{className:"a",transform:"matrix(1, 0, 0, 1, 0, 0)"},c.createElement("path",{d:"M158.513,0s10.02,34.579,18.906,59.667,25.929,56.372,25.929,56.372a80.707,80.707,0,0,1,2.705-10.231c1.455-4.624,3.7-2.67,3.7-2.67a2.185,2.185,0,0,1,.905,2.623c-.221.713-.271.871-.25.8L207.2,117.136s-.829,2.613-1.606,2.669-47.076.2-47.076.2ZM4.994,119.766S.444,112,.061,108.757s1.044-5.281,3.407-1.974a44.561,44.561,0,0,1,4.319,8.61s20.74-40.24,32-74.437S51.813,0,51.813,0s29.651,7.134,61.681,4.532S154.325.146,154.325.146L110.436,117.221s-3.658-8.523-6.1-10.64-4.046-2.107-3.663,2.176,4.977,11.009,4.977,11.009Z",transform:"translate(15 12)"}));function x(e,t){var n=e.title,s=e.titleId,r=j(e,["title","titleId"]);return c.createElement("svg",h({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:240.792,height:150,viewBox:"0 0 240.792 150",ref:t,"aria-labelledby":s},r),n?c.createElement("title",{id:s},n):null,d,b)}var p=c.forwardRef(x),m=(n.p,n(3));t.default=function(){var e=Object(o.f)().push,t=Object(c.useState)({}),n=Object(s.a)(t,2),h=n[0],j=n[1],d=Object(c.useState)([]),b=Object(s.a)(d,2),x=b[0],O=b[1],u=Object(c.useState)([]),g=Object(s.a)(u,2),f=g[0],y=g[1];Object(c.useEffect)((function(){var e=function(e){console.error(e)};navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){var n=t.coords,s=n.longitude,c=n.latitude;Object(a.e)((function(e){return j(e)}),e),Object(a.c)(c,s,(function(e){return y(e)}),e),Object(a.b)((function(e){O(e)}),e)}),(function(e){console.log(e.message)}),{enableHighAccuracy:!0}):console.warn("Geolocation is not supported by this browser")}),[]);var v=Array(7).fill(0);return Object(m.jsxs)("div",{className:"homepage",children:[Object(m.jsxs)("div",{className:"banner-wrap",children:[Object(m.jsxs)("div",{className:"logogram",children:[Object(m.jsx)(p,{}),Object(m.jsx)("div",{className:"logoText",style:{fontFamily:"Butler-Medium",letterSpacing:"-0.02em",fontWeight:500},children:"White Tent"})]}),Object(m.jsx)("div",{className:"banner",children:Object(m.jsxs)("div",{className:"pitch",children:[Object(m.jsxs)("p",{className:"first",children:["Save your ",Object(m.jsx)("span",{style:{opacity:"1"},children:"Money."})]}),Object(m.jsxs)("p",{className:"second",children:["Help ",Object(m.jsx)("span",{style:{opacity:"1"},children:"Local Stores."})]}),Object(m.jsxs)("p",{className:"third",children:["Rescue the ",Object(m.jsx)("span",{style:{opacity:"1"},children:"Environment."})]})]})})]}),Object(m.jsx)("h2",{children:"Nearest from you"}),Object(m.jsx)("div",{className:"slider-container",children:f.length>0?f.map((function(t,n){return Object(m.jsx)("div",{className:"card-wrapper",onClick:function(){return e("/store/".concat(t.shop_id))},children:Object(m.jsxs)(r.d,{style:{width:260,boxShadow:"0 0 4px 0 rgba(0, 0, 0, .1)",marginTop:"15px"},children:[Object(m.jsx)(r.g,{className:"k-hbox",style:{background:"transparent",minHeight:"12vh"},children:Object(m.jsxs)("div",{children:[Object(m.jsx)(r.j,{style:{marginBottom:"4px",fontSize:"1.3em",minHeight:"5vh"},children:l(t.name)}),Object(m.jsx)(r.i,{children:Object(m.jsxs)("p",{children:[t.distance," km"]})})]})}),Object(m.jsx)(r.h,{src:t.photo_url,style:{height:"185px",maxWidth:"100%",objectFit:"contain"}})]})},n)})):v.map((function(e,t){return Object(m.jsx)("div",{className:"card-wrapper",children:Object(m.jsxs)(r.d,{style:{width:260,boxShadow:"0 0 4px 0 rgba(0, 0, 0, .1)",marginTop:"15px"},children:[Object(m.jsx)(r.g,{className:"k-hbox",style:{background:"transparent",minHeight:"12vh"},children:Object(m.jsxs)("div",{children:[Object(m.jsx)(i.b,{shape:"text",style:{marginBottom:"4px",fontSize:"1.3em",minHeight:"5vh",width:225}}),Object(m.jsx)(i.b,{shape:"text",style:{width:45}})]})}),Object(m.jsx)(i.b,{shape:"rectangle",style:{width:"100%",height:185}})]})},t)}))}),Object(m.jsx)("h2",{children:"Most Liked"}),Object(m.jsx)("div",{className:"slider-container",children:x.length>0?x.map((function(e,t){var n;return Object(m.jsx)("div",{className:"card-wrapper",children:Object(m.jsxs)(r.d,{style:{width:260,boxShadow:"0 0 4px 0 rgba(0, 0, 0, .1)",marginTop:"15px",minHeight:"38vh"},children:[Object(m.jsx)(r.g,{className:"k-hbox",style:{background:"transparent",minHeight:"8vh"},children:Object(m.jsxs)("div",{children:[Object(m.jsx)(r.j,{style:{marginBottom:"4px",fontSize:"1.3em"},children:l(e.name)}),Object(m.jsx)(r.i,{children:Object(m.jsx)("p",{children:e.information})})]})}),Object(m.jsx)(r.h,{src:e.photo_url,style:{height:"185px",maxWidth:"100%",objectFit:"contain"}}),Object(m.jsxs)(r.e,{style:{display:"flex",justifyContent:"space-between"},children:[Object(m.jsx)("div",{children:Object(m.jsx)("button",{className:"k-button k-flat",onClick:function(){return console.log("onClick 1")},children:Object(m.jsx)("span",{className:"k-icon k-i-heart"})})}),Object(m.jsxs)("span",{style:{fontSize:"13px",alignSelf:"center",color:"#656565"},children:[null!==(n=e.total_likes)&&void 0!==n?n:0," likes"]})]})]})},t)})):v.map((function(e,t){return Object(m.jsx)("div",{className:"card-wrapper",children:Object(m.jsxs)(r.d,{style:{width:260,boxShadow:"0 0 4px 0 rgba(0, 0, 0, .1)",marginTop:"15px",minHeight:"38vh"},children:[Object(m.jsx)(r.g,{className:"k-hbox",style:{background:"transparent",minHeight:"8vh"},children:Object(m.jsxs)("div",{children:[Object(m.jsx)(i.b,{shape:"text",style:{marginBottom:"4px",fontSize:"1.3em",minHeight:"5vh",width:225}}),Object(m.jsx)(i.b,{shape:"text",style:{width:45}})]})}),Object(m.jsx)(i.b,{style:{height:"185px",maxWidth:"100%"}}),Object(m.jsxs)(r.e,{style:{display:"flex",justifyContent:"space-between"},children:[Object(m.jsx)(i.b,{shape:"circle",style:{width:20}}),Object(m.jsx)("span",{style:{fontSize:"13px",alignSelf:"center",color:"#656565"},children:Object(m.jsx)(i.b,{shape:"text",style:{width:45}})})]})]})},t)}))}),Object(m.jsx)("h2",{children:"By category"}),Object(m.jsx)("div",{className:"slider-container",children:Object.keys(h).length>0?Object.keys(h).map((function(e){return Object(m.jsx)("div",{className:"card-wrapper",children:Object(m.jsxs)(r.d,{style:{width:260,boxShadow:"0 0 4px 0 rgba(0, 0, 0, .1)",marginTop:"15px"},children:[Object(m.jsx)(r.h,{src:h[e].photo_url,style:{height:"185px",maxWidth:"100%"}}),Object(m.jsx)(r.f,{style:{textAlign:"center"},children:Object(m.jsx)(r.j,{style:{fontSize:"1em"},children:l(h[e].name)})})]})},e)})):v.map((function(e,t){return Object(m.jsx)("div",{className:"card-wrapper",children:Object(m.jsxs)(r.d,{style:{width:260,boxShadow:"0 0 4px 0 rgba(0, 0, 0, .1)",marginTop:"15px"},children:[Object(m.jsx)(i.b,{shape:"rectangle",style:{height:"185px",maxWidth:"100%"}}),Object(m.jsx)(r.f,{style:{textAlign:"center"},children:Object(m.jsx)(i.b,{shape:"text",style:{width:45,margin:"auto"}})})]})},t)}))})]})}}}]);
//# sourceMappingURL=10.a6808568.chunk.js.map