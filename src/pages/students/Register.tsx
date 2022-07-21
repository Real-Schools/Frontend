import { useMutation } from "@apollo/client";
import { GET_BRANCHES, REGISTER_STUDENT } from "Api/graphql";
import Button from "Components/Button";
import Input from "Components/Input";
import Page from "Components/Page";
import Select, { AjaxSelect } from "Components/select";
import { range } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateStudentResponse {
  id: string | number;
  createStudent: {
    student: {
      id: string | number;
    };
  };
}

type StudentInput = {
  bio: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  level: string;
  branchId: number;
  enrolledAt: string;
};

interface CreateStudentVariables {
  input: StudentInput;
}

export default function RegisterStudent() {
  const navigate = useNavigate();
  const [mutate, { data, loading, error }] =
    useMutation<CreateStudentResponse, CreateStudentVariables>(
      REGISTER_STUDENT
    );
  const [student, setStudent] = useState<StudentInput>({
    bio: "",
    firstName: "",
    lastName: "",
    otherNames: "",
    level: "",
    branchId: 1,
    enrolledAt: "",
  });

  useEffect(() => {
    if (data) {
      navigate(`/students/${data.createStudent.student.id}/profile`);
    }
  }, [data]);

  const onChange = (e: any) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const register = () => {
    student.branchId = Number(student.branchId);

    mutate({
      variables: {
        input: student,
      },
    });
  };

  return (
    <Page title="Register Student" error={error}>
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
                    name="firstName"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    OTHER NAMES
                  </label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
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
                    name="otherNames"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    BIO
                  </label>
                  <Input
                    type="text"
                    placeholder="Bio..."
                    name="bio"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-sm text-stone-600">
                    ENROLLED AT
                  </label>
                  <Input type="date" name="enrolledAt" onChange={onChange} />
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
                  <AjaxSelect
                    gql={GET_BRANCHES}
                    dataKey="branches"
                    dataLabelKey="name"
                    dataSelectKey="id"
                    name="branchId"
                    onSelect={onChange}
                  >
                    <option selected>Select Branch</option>
                  </AjaxSelect>
                </div>
              </div>

              <div className="grid md:flex grid-cols-2 justify-end space-x-4 w-full mt-6">
                <Button
                  onClick={register}
                  medium
                  loading={loading}
                  loadingText="Submitting..."
                  disabled={loading}
                >
                  SUBMIT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
