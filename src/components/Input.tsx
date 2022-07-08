import useApp from "Hooks/useApp";

function Input(props: any) {
  const { theme } = useApp();

  return (
    <input
      {...props}
      className={`mt-2 block w-full border-2 border-gray-300 rounded-md transition duration-300 
hover:border-${theme.primaryColorHover} focus:bg-white active:bg-${theme.primaryColor} focus:outline-none`}
    />
  );
}

export default Input;
