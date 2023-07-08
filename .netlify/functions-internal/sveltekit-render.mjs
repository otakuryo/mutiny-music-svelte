import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","favicon.svg","sitemap-index.xml"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".png":"image/png",".svg":"image/svg+xml",".xml":"application/xml"},
	_: {
<<<<<<< HEAD
		entry: {"file":"_app/immutable/start-55a78f0a.js","imports":["_app/immutable/start-55a78f0a.js","_app/immutable/chunks/index-6a905201.js","_app/immutable/chunks/singletons-4a06a8de.js"],"stylesheets":[],"fonts":[]},
=======
		entry: {"file":"_app/immutable/start-6d94d727.js","imports":["_app/immutable/start-6d94d727.js","_app/immutable/chunks/index-6a905201.js","_app/immutable/chunks/singletons-4a06a8de.js"],"stylesheets":[],"fonts":[]},
>>>>>>> 38f96ad (build: netflify: Configuration and compilation)
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js'),
			() => import('../server/nodes/3.js'),
			() => import('../server/nodes/4.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/directory",
				pattern: /^\/directory\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
