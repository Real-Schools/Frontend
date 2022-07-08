import { ReactElement, ReactNode, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

type ModelInfo = {
  show: boolean;
  title?: string;
  children?: ReactNode | ReactElement | string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  okButtonProps?: any;
  onCancel?: () => void;
  cancelButtonProps?: any;
};

export default function Modal(props: ModelInfo) {
  const [showModal, setShowModal] = useState(props.show);

  useEffect(() => {
    setShowModal(props.show);
  }, [props.show]);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2l font-semibold">{props.title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={props.onCancel}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <AiOutlineClose />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{props.children}</div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <Button
                    onClick={props.onCancel}
                    danger
                    transparent
                    small
                    {...props.cancelButtonProps}
                  >
                    {props.cancelText || "Cancel"}
                  </Button>
                  <Button onClick={props.onOk} small {...props.okButtonProps}>
                    {props.okText || "ok"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
