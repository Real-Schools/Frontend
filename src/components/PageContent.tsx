import { Skeleton } from "antd";
import classNames from "classnames";
import useApp from "Hooks/useApp";
import PropTypes from "prop-types";
import { FC, ReactNode, useEffect, useState } from "react";

interface PageContentProps {
  children: ReactNode;
  loading: boolean;
}

const PageContent: FC<PageContentProps> = (props) => {
  const { collapsed, sidebar } = useApp();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  return (
    <div className={classNames("container w-screen mx-auto px-4 sm:px-8", {})}>
      <div className="py-20 px-8">
        {loading ? <Skeleton active /> : <>{props.children}</>}
      </div>
    </div>
  );
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContent;
