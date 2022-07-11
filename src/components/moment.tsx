import moment from "moment";

type MomentProps = {
  format?: string;
  date: string;
};

export default function (props: MomentProps) {
  return <>{moment(props.date).format(props.format || "YYYY/MM/DD")}</>;
}
