import SuccessActivation from "@/components/auth/SuccessActivation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Activation",
  description: "Registrasi Berhasil",
};
const SuccessPage = () => {
  return (
    <div>
      <SuccessActivation />
    </div>
  );
};

export default SuccessPage;
