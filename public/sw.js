if(!self.define){let s,e={};const c=(c,n)=>(c=new URL(c+".js",n).href,e[c]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=c,s.onload=e,document.head.appendChild(s)}else s=c,importScripts(c),e()})).then((()=>{let s=e[c];if(!s)throw new Error(`Module ${c} didn’t register its module`);return s})));self.define=(n,t)=>{const a=s||("document"in self?document.currentScript.src:"")||location.href;if(e[a])return;let i={};const u=s=>c(s,a),r={module:{uri:a},exports:i,require:u};e[a]=Promise.all(n.map((s=>r[s]||u(s)))).then((s=>(t(...s),i)))}}define(["./workbox-4754cb34"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"fde797f64434d1565adb7fe939ea9214"},{url:"/_next/static/1FpgQFTcs5uw__Nc2LF4n/_buildManifest.js",revision:"381f95cbbb535b6e2240711f963c897c"},{url:"/_next/static/1FpgQFTcs5uw__Nc2LF4n/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1181-f727aa699cd3f164.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/1509-de7d592b74808414.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/1517-406eac665a02b361.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/3180-509bbed8b243575b.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/3642-e8ebc75dfd78c2a0.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/3d47b92a-19398748ebb66b84.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/4bd1b696-4da50c4b5988d8c9.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/5e22fd23-e81516e7b2efea3c.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/6122-a372d50d18862243.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/7882-c82cb10791308f6f.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/8173-cc724e3fdd8de266.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/8863-dcd86c2bbfc35944.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/9012-00499aa53a932b5e.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/9100-27ccfa4e5a7e175a.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/9222-ad964e2b53d12b79.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/9574-24970cc0b2a6a41a.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/9c4e2130-3a6482306d87a7c6.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(onboarding)/auth/error/page-6d0007ab0bc69ba1.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(onboarding)/auth/layout-75fd8a494f549288.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(onboarding)/auth/login/page-322d20cbdc52b143.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(onboarding)/auth/register/page-c201317b60cef0a0.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(onboarding)/layout-aa1f32d16a954e17.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(onboarding)/page-12e71bffb85c58a8.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/(main)/calendar/%5BuserId%5D/page-eb2487c7baf320f2.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/(follow)/follower/page-0dd701a72b91ae04.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/(follow)/following/page-2819b01f60032e95.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/(follow)/layout-796b1f9592b8e872.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/page-4ef0f23ec4d81b23.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/(main)/layout-c6170089caa22164.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/layout-229e1bebe93516bb.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/settings/page-ea10ca6c2064df9e.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/settings/profile/page-d173a229fd6b7f7f.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/social/feed/page-135755bb5098bccd.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/social/layout-b4e13e1027ff0c35.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/(protect)/social/like/page-793e7b17b2dcdb21.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/_not-found/page-0f284aac2d510360.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-d66cbb9ab256b31a.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/posts/%5BpostId%5D/route-bbc122c39834b898.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/posts/by-date/route-4e59753da8c68aa4.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/posts/by-user/%5BuserId%5D/route-1d97976dbcb04724.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/posts/date-groups/%5BuserId%5D/route-914b415fb6ad2223.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/posts/feed/route-17f2d2287f3fc699.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/posts/like/route-b398dfafa5a3ce77.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/posts/route-1b57751e81725428.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/uploadthing/route-720ee7e5d9228d44.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/follow/route-fe7b312e922d61c7.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/follower-list/route-7aa2049cd0e3b37f.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/following-list/route-f8760c78e0ce6bf7.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/following/route-bc34e55357af9484.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/route-f53b42be1f53a694.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/unfollow/route-9dae4c209a510de4.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/api/user/route-b0cbecd3a5993170.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/app/layout-0b325aa065806fc2.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/framework-28674b8561f5ef2a.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/main-app-fd96bd8d7e5bcbb5.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/main-cbd119fcfd308406.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/pages/_app-00b41aece417ee52.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/pages/_error-6b43ce36a8d09a61.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-a0249d46aed08c51.js",revision:"1FpgQFTcs5uw__Nc2LF4n"},{url:"/_next/static/css/126acce611cc7b99.css",revision:"126acce611cc7b99"},{url:"/_next/static/css/523d24e022864d93.css",revision:"523d24e022864d93"},{url:"/_next/static/css/8f336536fbf49c52.css",revision:"8f336536fbf49c52"},{url:"/_next/static/css/d498c84e4ab246b3.css",revision:"d498c84e4ab246b3"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icons/apple-touch-icon.png",revision:"7abd3ec5007c23b49b616dd5906fa7de"},{url:"/icons/icon-192x192.png",revision:"aa2c6507c9ccaa8de42cba1eece64fda"},{url:"/icons/icon-512x512.png",revision:"18943548c267222683ee58309f026c27"},{url:"/manifest.json",revision:"da070d4deab2f948b842d616d3c8a674"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:c,state:n})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
