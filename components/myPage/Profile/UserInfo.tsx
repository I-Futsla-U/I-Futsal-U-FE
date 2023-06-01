import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";

import userImg from "../../../public/images/user-profile-default.png";

function UserInfo() {
  return (
    <div className="relative w-24 h-24 mx-auto text-center">
      <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto my-1 border-2 border-solid">
        <Image src={userImg} fill alt="유저 프로필" />
      </div>
      <p className="text-sm md:text-lg">홍길동</p>
      <button type="button" className="absolute top-2 right-2 font-bold">
        <IoSettingsOutline />
      </button>
    </div>
  );
}

export default UserInfo;
