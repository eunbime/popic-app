if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const u=e=>n(e,i),r={module:{uri:i},exports:c,require:u};s[i]=Promise.all(t.map((e=>r[e]||u(e)))).then((e=>(a(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"4789da5a7ce1b578e18bd77b15e81db8"},{url:"/_next/static/b5unHekJy21D84JdkM-xM/_buildManifest.js",revision:"349017ddd2f945a08ff5143b4258e9bd"},{url:"/_next/static/b5unHekJy21D84JdkM-xM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1181-f727aa699cd3f164.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/1509-de7d592b74808414.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/1517-406eac665a02b361.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/3180-02bb20378f875955.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/3642-77d6a55a3220e913.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/3d47b92a-918cc390234fe6ac.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/4057-77571c2c4588cca6.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/4900-2bef4c1d6e779693.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/4bd1b696-4da50c4b5988d8c9.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/5e22fd23-e81516e7b2efea3c.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/6122-be8d3c1db89dd942.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/7882-c82cb10791308f6f.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/8173-cc724e3fdd8de266.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/8863-33acf46fa04b9160.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/9012-2c52c71ab39a06a7.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/9100-27ccfa4e5a7e175a.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/9574-91cbac2b1120a120.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/9c4e2130-7a119c4f0894f8be.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(onboarding)/auth/error/page-6d0007ab0bc69ba1.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(onboarding)/auth/layout-75fd8a494f549288.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(onboarding)/auth/login/page-8e1957176c29ac1f.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(onboarding)/auth/register/page-43ece25bba52b9bb.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(onboarding)/layout-6296f3281a8182dc.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(onboarding)/page-6394430c05bedc56.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/(main)/calendar/%5BuserId%5D/page-77fedcabfce9e8be.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/(follow)/follower/page-97ed6a838221ffbf.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/(follow)/following/page-e82f423bcb05f567.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/(follow)/layout-796b1f9592b8e872.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/page-1f94890abdb1e01f.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/(main)/layout-832944cfc9cab760.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/(main)/loading-fd91ca4e855a63cd.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/layout-e04d1ce905335dcc.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/search/page-12d5db8bd4e8034e.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/settings/page-ea10ca6c2064df9e.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/settings/profile/page-249af9628a761bc8.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/social/feed/page-f2c2749c7ec6d497.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/social/layout-b4e13e1027ff0c35.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/social/like/page-9fba32ac3b853410.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/(protect)/social/loading-061239976e000803.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/_not-found/page-0f284aac2d510360.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-fb4350653681f130.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/posts/%5BpostId%5D/route-917dd1f7f960c508.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/posts/by-date/route-e3ac91fd9bb5ae9e.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/posts/by-user/%5BuserId%5D/route-72d2a471d4c03f14.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/posts/date-groups/%5BuserId%5D/route-9fd871ed5ac8b81b.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/posts/feed/route-0c6aeae6c14473fb.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/posts/like/route-7805397523767c7e.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/posts/route-1457e061d1b332fd.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/posts/search/route-ecf0606a19c8d35f.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/uploadthing/route-148ba073d83fd23e.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/follow/route-589e8dbf11499fbd.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/follower-list/route-36fc9c3122701113.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/following-list/route-a47d7f42e64c615e.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/following/route-0b33a9267cc4a110.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/route-7dfbb3eeafc23b86.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/unfollow/route-0e014d1146d2bf45.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/user/route-a6f8f2d7b0fee1d2.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/api/user/search/route-be4bd4abc41afcbb.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/app/layout-d6eee297bc5d4d5c.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/fc2f6fa8-4b3ccc69363aa6c3.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/framework-28674b8561f5ef2a.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/main-app-fd96bd8d7e5bcbb5.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/main-eb6c9c8610de4725.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/pages/_app-00b41aece417ee52.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/pages/_error-6b43ce36a8d09a61.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-a0249d46aed08c51.js",revision:"b5unHekJy21D84JdkM-xM"},{url:"/_next/static/css/126acce611cc7b99.css",revision:"126acce611cc7b99"},{url:"/_next/static/css/238fded2eaee1f87.css",revision:"238fded2eaee1f87"},{url:"/_next/static/css/523d24e022864d93.css",revision:"523d24e022864d93"},{url:"/_next/static/css/d498c84e4ab246b3.css",revision:"d498c84e4ab246b3"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icons/apple-touch-icon.png",revision:"7abd3ec5007c23b49b616dd5906fa7de"},{url:"/icons/icon-192x192.png",revision:"aa2c6507c9ccaa8de42cba1eece64fda"},{url:"/icons/icon-512x512.png",revision:"18943548c267222683ee58309f026c27"},{url:"/images/default-profile.png",revision:"e96da880b5dd7f8f0e296825ff98d23e"},{url:"/manifest.json",revision:"bcfe539794df564d5e1f9435b47152a3"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
