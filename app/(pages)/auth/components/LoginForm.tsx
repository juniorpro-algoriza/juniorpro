import { Input, Button } from "@components";

export const LoginForm = () => (
  <>
    <Input label="Email" type="email" placeholder="Enter email address" />
    <div>
      <Input label="Password" type="password" placeholder="Enter Password" />
      {/* TODO: Use padding instead of margin, mt-2 ==> pt-2 */}
      {/* TODO: replace text-[#xxxxxx] */}
      <div className="text-right mt-2">
        <a href="#" className="text-sm text-[#96A0B6] font-medium">
          Forget Password?
        </a>
      </div>
    </div>
    <Button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
      size="large"
    >
      Login
    </Button>
  </>
);
