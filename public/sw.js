if(!self.define){let e,n={};const s=(s,a)=>(s=new URL(s+".js",a).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(n[i])return;let c={};const r=e=>s(e,i),o={module:{uri:i},exports:c,require:r};n[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"3ba860f4188d9e35d0590aeeb31bf06e"},{url:"/_next/static/chunks/1181-f727aa699cd3f164.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/1509-de7d592b74808414.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/1517-a389dea73597be15.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/2734-f04fab1e4b7ca19c.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/3642-e8ebc75dfd78c2a0.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/3d47b92a-918cc390234fe6ac.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/4057-77571c2c4588cca6.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/4228-84be077f45676e73.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/4425-5cd30605b0068c67.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/4bd1b696-853cf3cb6ee48255.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/5942-1151467d0dcf4fab.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/5e22fd23-e81516e7b2efea3c.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/6122-a372d50d18862243.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/7882-1c297c584fab11d2.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/8173-cc724e3fdd8de266.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/8863-505a75a46da1e74e.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/9012-00499aa53a932b5e.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/9100-27ccfa4e5a7e175a.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/9574-e3267b8aa863ebcc.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/9834-be2ebe2a582d4ca5.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/9c4e2130-7a119c4f0894f8be.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(onboarding)/auth/error/page-6d0007ab0bc69ba1.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(onboarding)/auth/layout-75fd8a494f549288.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(onboarding)/auth/login/page-a385dd88637dc351.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(onboarding)/auth/register/page-d419e42b136af7ea.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(onboarding)/layout-6296f3281a8182dc.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(onboarding)/page-9876dd563c76a99a.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/(main)/calendar/%5BuserId%5D/page-77fedcabfce9e8be.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/(follow)/follower/page-97ed6a838221ffbf.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/(follow)/following/page-e82f423bcb05f567.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/(follow)/layout-796b1f9592b8e872.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/(main)/gallery/%5BuserId%5D/page-1f94890abdb1e01f.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/(main)/layout-832944cfc9cab760.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/(main)/loading-fd91ca4e855a63cd.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/layout-e04d1ce905335dcc.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/search/page-acc86b886eb7979b.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/settings/page-ea10ca6c2064df9e.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/settings/profile/page-43a08ebe7767db68.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/social/feed/page-7858c013dad38a84.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/social/layout-b4e13e1027ff0c35.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/social/like/page-9fba32ac3b853410.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/(protect)/social/loading-061239976e000803.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/_not-found/page-0f284aac2d510360.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-fb4350653681f130.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/posts/%5BpostId%5D/route-917dd1f7f960c508.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/posts/by-date/route-e3ac91fd9bb5ae9e.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/posts/by-user/%5BuserId%5D/route-72d2a471d4c03f14.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/posts/date-groups/%5BuserId%5D/route-9fd871ed5ac8b81b.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/posts/feed/route-0c6aeae6c14473fb.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/posts/like/route-7805397523767c7e.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/posts/route-1457e061d1b332fd.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/posts/search/route-ecf0606a19c8d35f.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/uploadthing/route-148ba073d83fd23e.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/follow/route-589e8dbf11499fbd.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/follower-list/route-36fc9c3122701113.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/following-list/route-a47d7f42e64c615e.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/following/route-0b33a9267cc4a110.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/route-7dfbb3eeafc23b86.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/user/%5BuserId%5D/unfollow/route-0e014d1146d2bf45.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/user/route-a6f8f2d7b0fee1d2.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/api/user/search/route-be4bd4abc41afcbb.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/app/layout-f0a53bc53d566d1f.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/fc2f6fa8-4b3ccc69363aa6c3.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/framework-28674b8561f5ef2a.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/main-app-fd96bd8d7e5bcbb5.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/main-eb6c9c8610de4725.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/pages/_app-00b41aece417ee52.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/pages/_error-6b43ce36a8d09a61.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-a0249d46aed08c51.js",revision:"nnQ3Ree_eJ_ABEnHbBsd8"},{url:"/_next/static/css/126acce611cc7b99.css",revision:"126acce611cc7b99"},{url:"/_next/static/css/523d24e022864d93.css",revision:"523d24e022864d93"},{url:"/_next/static/css/cfa2bc7065211465.css",revision:"cfa2bc7065211465"},{url:"/_next/static/css/d498c84e4ab246b3.css",revision:"d498c84e4ab246b3"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/_next/static/nnQ3Ree_eJ_ABEnHbBsd8/_buildManifest.js",revision:"349017ddd2f945a08ff5143b4258e9bd"},{url:"/_next/static/nnQ3Ree_eJ_ABEnHbBsd8/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icons/apple-touch-icon.png",revision:"7abd3ec5007c23b49b616dd5906fa7de"},{url:"/icons/icon-192x192.png",revision:"aa2c6507c9ccaa8de42cba1eece64fda"},{url:"/icons/icon-512x512.png",revision:"18943548c267222683ee58309f026c27"},{url:"/images/default-profile.png",revision:"e96da880b5dd7f8f0e296825ff98d23e"},{url:"/manifest.json",revision:"bcfe539794df564d5e1f9435b47152a3"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:a})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
