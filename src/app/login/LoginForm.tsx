"use client";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

const LoginForm = () => {
  return (
    <Card className="max-w-sm w-2/5 mx-auto">
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
}

export default LoginForm;