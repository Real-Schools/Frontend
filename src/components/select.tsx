import { DocumentNode, useQuery } from "@apollo/client";
import useApp from "Hooks/useApp";
import { ReactNode } from "react";

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

type AjaxSelectProps = {
  gql: DocumentNode;
  dataKey: string;
  dataSelectKey: string;
  dataLabelKey: string;
  children?: ReactNode;
  name?: string;
  onSelect: (e: any) => void;
};

export function AjaxSelect(props: AjaxSelectProps) {
  const { loading, error, data, refetch } = useQuery(props.gql);
  const dataRender: any[] = data ? data[props.dataKey] : [];

  return (
    <Select onChange={props.onSelect} name={props.name}>
      {props.children}
      {dataRender.map((item: any, idx: number) => (
        <option value={item[props.dataSelectKey]} key={idx}>
          {item[props.dataLabelKey]}
        </option>
      ))}
    </Select>
  );
}
