import { nextTick } from 'vue';

const useTheme = () => {
  const setBodyClassName = (theme: string) => {
    nextTick(() => {
      const body = document.getElementsByTagName('body')[0];
      body.className = `${theme}-mode`;
    });
  };
  return { setBodyClassName };
};

export default useTheme;
