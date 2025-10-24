import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { Deck, MarkdownSlideSet, DefaultTemplate } from "spectacle";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Welcome() {
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-16 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-16 min-h-0", children: [
    /* @__PURE__ */ jsx("header", { className: "flex flex-col items-center gap-9", children: /* @__PURE__ */ jsx("div", { className: "w-[500px] max-w-[100vw] p-4", children: /* @__PURE__ */ jsx("span", { style: { fontSize: "50px" }, children: "Edubba Institute" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[300px] w-full space-y-6 px-4", children: /* @__PURE__ */ jsxs("nav", { className: "rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4", children: [
      /* @__PURE__ */ jsx("p", { className: "leading-6 text-gray-700 dark:text-gray-200 text-center", children: "What's next?" }),
      /* @__PURE__ */ jsx("ul", { children: resources.map(({ href, text, icon }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "a",
        {
          className: "group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500",
          href,
          target: "_blank",
          rel: "noreferrer",
          children: [
            icon,
            text
          ]
        }
      ) }, href)) })
    ] }) })
  ] }) });
}
const resources = [
  {
    href: "./amarna",
    text: "El Amarna",
    icon: "𒂊𒉡𒈠- "
  },
  {
    href: "./enuma-elish",
    text: "Enuma Eliš",
    icon: "𒉺‍𒅁𒇺 𒄠𒈠𒌈 "
  }
];
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
async function loadText(rawMarkdown, setMarkDown) {
  const response = await fetch(rawMarkdown);
  const text = await response.text();
  setMarkDown(text);
}
const amarnaMd = "# Amarna Letters\n\n\n---\n\n### What is Amarna\n\nsupper cool!\n\n---\n\n### Definitely cool\n";
const amarna = UNSAFE_withComponentProps(function Amarna() {
  const [md, setMd] = useState("");
  console.log("amarna", md);
  console.log(amarnaMd);
  useEffect(() => {
    loadText(amarnaMd, setMd);
    console.log(amarnaMd);
    console.log("md");
  }, []);
  return /* @__PURE__ */ jsx(Deck, {
    children: /* @__PURE__ */ jsx(MarkdownSlideSet, {
      children: amarnaMd
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: amarna
}, Symbol.toStringTag, { value: "Module" }));
const enumaElish$1 = `## The Babylonian Epic of Creation: Enuma Elish


---

## Enuma Elish
> 𒂊𒉡𒈠-  𒂊𒇺  𒆷   𒈾𒁍𒌋 𒊭𒈠𒈬
- 𒉺‍𒅁𒇺 𒄠𒈠𒌈  𒋗𒈠  𒆷l 𒍠𒋥


> enuma eliš lā nābu šamāmu
- šapliš ammatum šuma lā zakrat

Notes: what does mumu mean?

---

## When On High

> enuma eliš lā nābu šamāmu
- šapliš ammatum šuma lā zakrat

> When on high, the heavens had not been named
- When the earth below had not been called out by name


Notes: What is the focus? What is the beginning of the narrative? In the ancient near east they didn't think as much about the material, they were more interested in the purpose; the way the thing could be used.


---{"layout": "center"}

## First was Apsu and Tiamat

![](./theogany.jpg)

Notes: Absu and Tiamat were the first



---{"layout": "center"}

## Ea makes his dwelling

![](./ea-god-of-the-deep.jpg)


---{"layout": "columns"}

## Marduk is Born

::section

<img src="./Marduk_and_pet.svg.png" alt="Marduk" height="700px" />

::section

> In Apsu was Marduk born
- In pure Apsu was Marduk born.

---


> Ea his father begat him,
- Damkina his mother bore him.
His figure was well developed, the glance of his eyes was dazzling,
- His growth was manly, he was might from the beginning.
Four were his eyes, four his ears,
- Flame shot forth as he moved his lips.
His four ears grew large,
- And his eyes likewise took in everything

Lambert 2013


---

## Marduk given the Four Winds

![](./kassite-marduk-seale.png)

Notes: Notice the Musḫušu?

---

## The Four Winds Really Annoy Tiamat


1. The old gods are also mad they woke up from their nap
1. They show that they killed her old consort

Notes: The four winds inspire tiamat to create an army

---

## Tiamat Gathers her forces

![bull of heaven](./bull-of-heaven.jpg)

---{"layout": "columns"}


::section

<img src="hittite-bull-man.JPG" alt="Hittite Bull Man" height="500px" />

::section

<img src="bašmu-dragon.jpg" alt="bašmu dragon" height="500px" />


---{"layout": "center"}

### Scorpion Men

<img src="ScorpionMen.png" alt="Scorpion Men" height="500px" />

---

### The Gods React to Tiamat

1. Ea over hears Qingu being elevated to consort
1. Ea is overwhelemd by Tiamat's force
1. He tells the owther gods
1. All of the other Gods are afraid
1. Even Ea is afraid

---

### Ea informs Marduk

1. Marduk is happy to meat Tiamat in Battle
1. Anshar calls the gods to assembly
1. He prepares himself for battle

---

### Marduk's Flood Weapon

<img src="Utnapishtim.jpg" alt="Utnapishtum in the coracle" height="500px" />


---{"layout": "center"}

### Marduk Defeats Tiamat

<img src="marduk-on-mushushu.jpg" alt="marduk on his sacred animal" height="500px" />


---

### Marduk Builds the World

<img src="marduk-flowing-water.jpg" alt="Marduk surrounded by the water" height="500px" />

Notes: Modeled the world after the Apsu

---

### The Gods Praise Marduk

1. They give him the Tablet of Destinies
1. He establishes the seasons and the festivals that mark them
1. The Gods give him 50 names

---{"layout":"center"}

### Why Fifty Names?

<img src="ishtar-gate.jpg" alt="The ishtar gate" height="500px" />

---

### The names of Marduk

1. They are drawn from God lists
1. They are placed at the end of the tablet to show that Marduk is unquestionably the
   lord over all the gods
1. Ea gives him his own name en-kur-kur: lord of the lands

`;
const constrainingTheme = {
  size: {
    width: 1366,
    height: 768,
    maxCodePaneHeight: 200
  },
  colors: {
    // primary: "#ebe5da",
    // secondary: "#fc6986",
    // tertiary: "#1e2852",
    // quaternary: "#ffc951",
    // quinary: "#8bddfd",
    primary: "#01161E",
    // secondary: "#124559", // midnight green
    secondary: "#EFF6E0",
    tertiary: "#598392",
    // Airforce blue
    //tertiary: "#AEC3B0",
    //quaternary: "#598392",
    quaternary: "#AEC3B0",
    // Ash grey
    // quinary: "#EFF6E0", // Beige
    quinary: "#124559"
  },
  fonts: {
    header: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    text: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    monospace: '"Consolas", "Menlo", monospace'
  },
  fontSizes: {
    h1: "72px",
    h2: "64px",
    h3: "56px",
    text: "44px",
    monospace: "20px"
  },
  space: [16, 24, 32]
};
const enumaElish = UNSAFE_withComponentProps(function EnumaElish() {
  return /* @__PURE__ */ jsx(Deck, {
    theme: constrainingTheme,
    template: /* @__PURE__ */ jsx(DefaultTemplate, {}),
    children: /* @__PURE__ */ jsx(MarkdownSlideSet, {
      children: enumaElish$1
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: enumaElish
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/ane-docsassets/entry.client-Btk_J7Ix.js", "imports": ["/ane-docsassets/chunk-OIYGIGL5-Dxj92DAU.js", "/ane-docsassets/index-7n-dyHea.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/ane-docsassets/root-BkK02juw.js", "imports": ["/ane-docsassets/chunk-OIYGIGL5-Dxj92DAU.js", "/ane-docsassets/index-7n-dyHea.js"], "css": ["/ane-docsassets/root-CAFeW1HX.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/ane-docsassets/home-WCyU3JbL.js", "imports": ["/ane-docsassets/chunk-OIYGIGL5-Dxj92DAU.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/amarna": { "id": "routes/amarna", "parentId": "root", "path": "amarna", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/ane-docsassets/amarna-t2bMqPa_.js", "imports": ["/ane-docsassets/chunk-OIYGIGL5-Dxj92DAU.js", "/ane-docsassets/index-BbSao2db.js", "/ane-docsassets/index-7n-dyHea.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/enuma-elish": { "id": "routes/enuma-elish", "parentId": "root", "path": "enuma-elish", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/ane-docsassets/enuma-elish-BSGB1Dr8.js", "imports": ["/ane-docsassets/chunk-OIYGIGL5-Dxj92DAU.js", "/ane-docsassets/index-BbSao2db.js", "/ane-docsassets/index-7n-dyHea.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/ane-docsassets/manifest-c7f54bd6.js", "version": "c7f54bd6", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/ane-docs";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/amarna": {
    id: "routes/amarna",
    parentId: "root",
    path: "amarna",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/enuma-elish": {
    id: "routes/enuma-elish",
    parentId: "root",
    path: "enuma-elish",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
