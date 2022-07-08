import useApp from "Hooks/useApp";

export default function Select(props: any) {
  const { theme } = useApp();

  return (
    <select
      {...props}
      className={`form-select appearance-none
      mt-2
      block
      w-full
      px-3
      py-2
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border-2 border-gray-300
      rounded-md
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-${theme.primaryColor} focus:outline-none`}
    >
      {props.children}
    </select>
  );
}
