import { nextTick } from 'vue';

const useTheme = () => {
  const setBodyClassName = (theme: string) => {
    nextTick(() => {
      const body = document.getElementsByTagName('body')[0];
      if (theme === 'blue') {
        body.classList.remove('green-mode');
        body.classList.add('blue-mode');
      } else {
        body.classList.remove('blue-mode');
        body.classList.add('green-mode');
      }
    });
  };
  return { setBodyClassName };
};

export default useTheme;
