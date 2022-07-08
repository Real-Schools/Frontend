import { notification, PageHeader } from "antd";
import classNames from "classnames";
import useApp from "Hooks/useApp";
import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PageProps {
  children?: ReactNode;
  title?: string;
  noBack?: boolean;
  noHeader?: boolean;
  overFlowHidden?: boolean;
  headerExtra?: Array<ReactNode>;
  error?: any;
}

const Page: FC<PageProps> = (props) => {
  const { collapsed, sidebar } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.error) {
      notification.error({
        message: "Application Error",
        description: props.error.message,
      });
    }
  }, [props.error]);

  return (
    <div
      className={classNames("page", {
        "overflow-hidden": props.overFlowHidden,
      })}
    >
      {!props.noHeader && (
        <PageHeader
          className={`site-page-header fixed bg-gray-100`}
          onBack={() => navigate(-1)}
          title={props.title}
          backIcon={props.noBack}
          style={{
            left: collapsed ? sidebar.collapsed : sidebar.full,
            right: 0,
            top: 0,
          }}
          extra={props.headerExtra}
        />
      )}

      <div
        style={{ marginLeft: collapsed ? 80 : 220 }}
        className={`mt-${props.noHeader ? 1 : 0}`}
      >
        {props.children}
      </div>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
