import { Input } from "@components";
import { Search } from "lucide-react";
import { containerStyle } from "../styles";

const InputStylePage = () => {
  return (
    <div className={containerStyle}>
      <Input label="Name" placeholder="Normal" />
      <Input label="Email" type="email" placeholder="Enter your email" />
      <Input label="With Icon" placeholder="Search..." leftIcon={<Search />} />
      <Input label="Password" type="password" />
      <Input label="With Error" placeholder="With error" error="Invalid email format" />
      <Input label="Disabled" placeholder="" disabled />
    </div>
  );
};

export default InputStylePage;
