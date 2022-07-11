import { useMutation } from "@apollo/client";
import { notification } from "antd";
import { CREATE_BRANCH } from "Api/graphql";
import Button from "Components/Button";
import Input from "Components/Input";
import Modal from "Components/Modal";
import { useEffect, useState } from "react";

type CreateBranchModelProps = {
  onUpdate: () => void;
};

interface CreateBranchResponse {
  id: string | number;
}

interface CreateBranchVariables {
  input: {
    name: string;
    location: string;
    prefix: string;
  };
}

export default (props: CreateBranchModelProps) => {
  const [show, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [prefix, setPrefix] = useState("");
  const [mutate, { data, loading, error }] =
    useMutation<CreateBranchResponse, CreateBranchVariables>(CREATE_BRANCH);

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
          name,
          location,
          prefix,
        },
      },
    });
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Add Branch</Button>
      <Modal
        title="NEW BRANCH"
        show={show}
        onCancel={() => setShowModal(false)}
        onOk={create}
        okButtonProps={{
          loading,
          disabled: loading,
          loadingText: "submitting",
        }}
      >
        <div className="w-80">
          <label className="font-medium text-sm text-stone-600">Name</label>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <div className="m-5" />
          <label className="font-medium text-sm text-stone-600">Location</label>
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e: any) => setLocation(e.target.value)}
          />
          <div className="m-5" />
          <label className="font-medium text-sm text-stone-600">Prefix</label>
          <Input
            type="text"
            placeholder="Prefix"
            value={prefix}
            onChange={(e: any) => setPrefix(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
