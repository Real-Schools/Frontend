import NProgress from "nprogress";
import type { FC } from "react";
import { useEffect } from "react";

const LoadingScreen: FC = () => {
  useEffect(() => {
    NProgress.start();

    return (): void => {
      NProgress.done();
    };
  }, []);

  return <div className="w-screen h-screen" />;
};

export default LoadingScreen;
