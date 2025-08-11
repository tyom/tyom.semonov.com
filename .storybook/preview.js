import '$src/global.css';

const LOCAL_STORAGE_KEY = 'cv-sb-theme';

// Get saved theme from localStorage or default to light
const getSavedTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || 'light';
  }
  return 'light';
};

const withTheme = (Story, context) => {
  const theme = context.globals.theme;

  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
  }

  return Story();
};

const preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: getSavedTheme(),
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', title: 'Light mode', icon: 'sun' },
          { value: 'dark', title: 'Dark mode', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
