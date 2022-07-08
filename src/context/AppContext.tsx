import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";

interface State {
  collapsed: boolean;
  sidebar: {
    full: number;
    collapsed: number;
  };

  theme: {
    primaryColor: string;
    primaryColorHover: string;
  };
}

interface AppContextValue extends State {
  toggleSideBar: (collapsed: boolean) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

type SideBarAction = {
  type: "TOGGLE_SIDEBAR";
  payload: {
    collapsed: boolean;
  };
};

type Action = SideBarAction;

const initialState: State = {
  collapsed: false,
  sidebar: {
    full: 220,
    collapsed: 65,
  },
  theme: {
    primaryColor: "blue-600",
    primaryColorHover: "blue-700",
  },
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  TOGGLE_SIDEBAR: (state: State, action: SideBarAction | any): State => {
    window.localStorage.setItem("collapsed", `${action.payload.collapsed}`);

    return {
      ...state,
      collapsed: action.payload.collapsed,
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AppContext = createContext<AppContextValue>({
  ...initialState,
  toggleSideBar: () => {},
});

export const AppProvider: FC<AppProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      const collapsed = JSON.parse(
        window.localStorage.getItem("collapsed") || "false"
      );

      if (collapsed) {
        dispatch({
          type: "TOGGLE_SIDEBAR",
          payload: {
            collapsed,
          },
        });
      }
    };

    initialize();
  }, []);

  const toggleSideBar = (collapsed: boolean): void => {
    dispatch({
      type: "TOGGLE_SIDEBAR",
      payload: {
        collapsed,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleSideBar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
