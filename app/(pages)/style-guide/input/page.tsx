import { Input } from "@components";
import { Search } from "lucide-react";
import { containerStyle } from "../styles";

const InputStylePage = () => {
  return (
    <div className={containerStyle}>
      <Input label="Name" placeholder="Enter your name" />
      <Input label="Email" type="email" placeholder="Enter your email" />
      <Input label="Search" placeholder="Search..." leftIcon={<Search />} />
      <Input label="Amount" placeholder="0.00" rightIcon={<Search />} />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <Input
        label="Email"
        placeholder="Enter email"
        error="Invalid email format"
      />
      <Input label="Username" placeholder="Enter username" disabled />
    </div>
  );
};

export default InputStylePage;
