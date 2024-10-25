import { defineConfig } from "umi";
import dotenv from 'dotenv';
import routes from './routes';

// 环境变量
const { NODE_ENV, REACT_APP_ENV } = process.env;

const envConfig = dotenv.config({
  path: `.env.${REACT_APP_ENV}`,
}).parsed ?? {};

// 路由前缀/public根目录
const ROUTE_BASE = envConfig.ROUTE_BASE ?? '/';

export default defineConfig({
  hash: true,
  title: '浙江省数智地质服务平台机房监测',
  routes,
  define: {
    NODE_ENV,
    REACT_APP_ENV,
    ROUTE_BASE,
    API_URL: envConfig.API_URL,
  },
  exportStatic: {},
  base: ROUTE_BASE,
  publicPath: ROUTE_BASE,
  plugins: [
    ...NODE_ENV !== 'development' ? [] : ['@react-dev-inspector/umi4-plugin'],
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/access',
  ],
  ...(NODE_ENV !== 'development'
    ? {}
    : {
      inspectorConfig: {
        excludes: [],
      },
    }),
  initialState: {
    loading: '@/components/PageLoading',
  },
  jsMinifier: 'terser',
  // 关掉console
  jsMinifierOptions: NODE_ENV !== 'development' ? {
    compress: {
      drop_console: false,
      drop_debugger: true,
      pure_funcs: ['console.log'],
    },
  } : {},
  model: {},
  access: {},
  favicons: [`${ROUTE_BASE}favicon.png`],
  metas: [
    { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' },
    { 'http-equiv': 'pragma', content: 'no-cache' },
    { 'http-equiv': 'expires', content: '0' },
  ],
  npmClient: 'yarn',
});
