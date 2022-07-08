import Input from "Components/Input";
import Page from "Components/Page";
import Select from "Components/select";
import useApp from "Hooks/useApp";
import { range } from "lodash";
import { useState } from "react";

export default function RegisterStudent() {
  const default_student = {
    email: "",
    first_name: "",
    last_name: "",
    other_names: "",
    level: "",
    branch_id: "",
    enrolled_at: "",
  };

  const { theme } = useApp();
  const [student, setStudent] = useState(default_student);

  const onChange = (e: any) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <Page title="Register Student">
      <div className="container w-screen mx-auto px-4 sm:px-8">
        <div className="py-20">
          <div className="flex flex-col">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    FIRST NAME
                  </label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    LAST NAME
                  </label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    LAST NAME
                  </label>
                  <Input
                    type="text"
                    placeholder="Other Names"
                    name="other_names"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    EMAIL
                  </label>
                  <Input
                    type="email"
                    placeholder="johndoe@example.com"
                    name="email"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    ENROLLED AT
                  </label>
                  <Input type="date" />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    LEVEL
                  </label>
                  <Select name="level" onChange={onChange}>
                    <option selected>Select Level</option>
                    {range(1, 8).map((level) => (
                      <option key={level} value={level}>
                        Primary {level}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    BRANCH
                  </label>
                  <Select>
                    <option selected>Select Branch</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Deleted</option>
                  </Select>
                </div>
              </div>

              <div className="grid md:flex grid-cols-2 justify-end space-x-4 w-full mt-6">
                <button className="px-4 py-2 rounded-lg text-stone-50 bg-stone-400 hover:bg-stone-500 font-bold text-white shadow-lg shadow-stone-200 transition ease-in-out duration-200 translate-10">
                  Reset
                </button>

                <button
                  className={`px-4 py-2 rounded-lg bg-${theme.primaryColor} hover:bg-${theme.primaryColorHover} font-bold text-white transition ease-in-out duration-200 translate-10`}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
