import { type RouteConfig, index , route} from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("amarna", "routes/amarna.tsx"), route("enuma-elish","routes/enuma-elish.tsx")] satisfies RouteConfig;
