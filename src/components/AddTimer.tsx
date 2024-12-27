import { useRef } from "react";
import Form, { FormHandle } from "./UI/Form";
import Button from "./UI/Button";
import { useTimersContext } from "../store/timers-context";
import Input from "./UI/Input";

const AddTimer = () => {
  const form = useRef<FormHandle>(null);

  const { addTimer } = useTimersContext();

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };
    console.log(extractedData);
    addTimer({ name: extractedData.name, duration: +extractedData.duration });
    form.current?.clear();
  }

  return (
    <div>
      <Form ref={form} onSave={handleSaveTimer}>
        <Input id="name" label="Name" type="text"></Input>
        <Input id="duration" label="Duration" type="text"></Input>
        <p>
          <Button>Add Timer</Button>
        </p>
      </Form>
    </div>
  );
};

export default AddTimer;
