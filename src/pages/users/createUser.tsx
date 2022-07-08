import { useMutation } from "@apollo/client";
import { notification } from "antd";
import { CREATE_USER } from "Api/graphql";
import Button from "Components/Button";
import Input from "Components/Input";
import Modal from "Components/Modal";
import Select from "Components/select";
import { useEffect, useState } from "react";

type CreateUserModelProps = {
  onUpdate: () => void;
};

interface CreateUserResponse {
  id: string | number;
  email: string;
}

interface CreateUserVariables {
  input: {
    email: string;
    password: string;
    role: number;
  };
}

export default (props: CreateUserModelProps) => {
  const [show, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);
  const [mutate, { data, loading, error }] =
    useMutation<CreateUserResponse, CreateUserVariables>(CREATE_USER);

  useEffect(() => {
    if (data) {
      setShowModal(false);
      props.onUpdate();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: error.name,
        description: error.message,
      });
    }
  }, [error]);

  const create = () => {
    mutate({
      variables: {
        input: {
          email,
          password,
          role,
        },
      },
    });
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Create</Button>
      <Modal
        title="CREATE USER"
        show={show}
        onCancel={() => setShowModal(false)}
        onOk={create}
        okButtonProps={{
          loading,
          disabled: loading,
          loadingText: "submitting",
        }}
      >
        <div className="w-100">
          <label className="font-medium text-sm text-stone-600">Email</label>
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <div className="m-5" />
          <label className="font-medium text-sm text-stone-600">Password</label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <div className="m-5" />
          <label className="font-medium text-sm text-stone-600">Role</label>
          <Select value={role} onChange={(e: any) => setRole(e.target.value)}>
            <option>Choose Role</option>
            <option value={0}>Admin</option>
          </Select>
        </div>
      </Modal>
    </>
  );
};
