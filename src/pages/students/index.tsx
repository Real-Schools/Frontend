/**
 * @author Paul Jeremiah Mugaya
 * @email paulmugaya@live.com
 * @create date 2022-06-24 10:57:38
 * @modify date 2022-06-24 10:57:38
 * @desc https://codepen.io/knyttneve/pen/vYEzXOR
 */
import { GET_STUDENTS } from "@/api/graphql";
import { useQuery } from "@apollo/client";
import { Skeleton } from "antd";
import Page from "Components/Page";
import useApp from "Hooks/useApp";
import { range } from "lodash";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { StudentType } from "Types/student";

export type StudentsResponse = {
  students: StudentType[];
};

const StudentsPage = () => {
  const { loading, error, data, refetch } =
    useQuery<StudentsResponse, any>(GET_STUDENTS);
  const { theme } = useApp();
  const navigate = useNavigate();

  return (
    <Page overFlowHidden noHeader error={error}>
      <div className="container mx-auto h-screen py-4 px-8 relative">
        <div className="flex w-full rounded-lg h-full lg:overflow-hidden overflow-auto lg:flex-row flex-col shadow-2xl">
          <div className={`w-screen bg-white text-gray-800 flex flex-col`}>
            <div className="p-8 shadow-md relative bg-white">
              <div className="flex items-center">
                <FiArrowLeft className="w-6 h-6" />
                <div
                  className={`text-gray-${theme.primaryColor} ml-3 font-medium text-lg`}
                >
                  STUDENTS
                </div>
                {/* <button
                  className={`text-indigo-400 ml-auto w-8 h-8 flex items-center justify-center`}
                >
                  <FiUserPlus className="w-8 h-8" />
                </button> */}
              </div>

              <div className="mt-6 flex">
                <button
                  className={`bg-${theme.primaryColor} hover:bg-${theme.primaryColorHover} transition duration-300 text-white py-2 text-sm px-3 rounded focus:outline-none`}
                  onClick={() => navigate("/students/register")}
                >
                  New Student
                </button>
                <div className="relative ml-auto flex-1 pl-8 sm:block hidden">
                  <input
                    placeholder="Search"
                    type="text"
                    className="w-full border rounded border-gray-600 h-full focus:outline-none pl-4 pr-8 text-gray-700 text-sm text-gray-500"
                  />
                  <svg
                    stroke="currentColor"
                    className="w-4 h-4 absolute right-0 top-0 mt-3 mr-2 text-gray-500"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
              </div>
            </div>

            {loading ? (
              range(0, 3).map((n) => (
                <div className="py-5 px-5" key={n}>
                  <Skeleton avatar paragraph={{ rows: 3 }} active />
                </div>
              ))
            ) : (
              <div className="overflow-auto flex-grow">
                {data?.students?.map((student: StudentType) => (
                  <div
                    className={`${
                      student?.highlight ? "bg-gray-200" : ""
                    } px-8 py-6 flex items-center border-b border-gray-300`}
                  >
                    {student?.select && <input type="checkbox" />}
                    <Link
                      className={`flex ml-4 text-${theme.primaryColor}`}
                      to={`/students/${student.id}/profile`}
                    >
                      {student?.avatar ? (
                        <img
                          src={student?.avatar}
                          className="w-10 h-10 object-cover rounded object-top"
                        />
                      ) : (
                        <FiUser className="w-10 h-10" />
                      )}

                      <div className="flex flex-col pl-4">
                        <h2 className="font-medium text-sm">
                          {student.firstName} {student.lastName}{" "}
                          {student.otherNames}
                        </h2>
                        <h3 className="text-gray-500 text-sm">
                          Primary {student.level}
                        </h3>
                      </div>
                    </Link>
                    <button className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                      <svg
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default StudentsPage;
