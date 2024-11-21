"use client";

import ButtonSocial from "./button-social";

export default function Social() {
  return (
    <div className="flex items-center justify-center  gap-x-5 w-full">
      <ButtonSocial provider={"github"} />
      <ButtonSocial provider={"google"} />
      <ButtonSocial provider={"facebook"} />
    </div>
  );
}
