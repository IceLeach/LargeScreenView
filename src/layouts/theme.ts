import { ThemeConfig, theme as antdTheme } from "antd";

const theme: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimaryBg: '#18635E',
    colorBgElevated: '#063534',
  },
  components: {
    Select: {
      controlHeight: 30,
      colorBorder: 'transparent',
      hoverBorderColor: 'transparent',
      activeBorderColor: 'transparent',
      activeOutlineColor: 'transparent',
      colorBgContainer: 'transparent',
    },
  },
};

export default theme;
