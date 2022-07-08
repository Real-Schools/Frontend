/**
 * @author Paul Jeremiah Mugaya
 * @email paulmugaya@live.com
 * @create date 2022-06-24 10:57:38
 * @modify date 2022-06-24 10:57:38
 * @desc https://github.com/jimmybutton/react-tailwind-table
 */
import classNames from "classnames";
import { useTable } from "react-table";

export default function ({ data, columns }: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal" {...getTableProps()}>
          <thead className="bg-gray-500">
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    key={i}
                  >
                    <div className="flex items-center justify-between">
                      {column.render("Header")}
                      {/* <span>}</span> add more here*/}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusPill({ value }: any) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames([
        "px-3",
        "py-1",
        "uppercase",
        "leading-wide",
        "font-bold",
        "text-xs",
        "rounded-full",
        "shadow-sm",
        {
          "bg-green-100 text-green-800": status.startsWith("active"),
          "bg-yellow-100 text-yellow-800": status.startsWith("inactive"),
          "bg-red-100 text-red-800": status.startsWith("offline"),
        },
      ])}
    >
      {status}
    </span>
  );
}

export function AvatarCell({ value, column, row }: any) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  );
}
