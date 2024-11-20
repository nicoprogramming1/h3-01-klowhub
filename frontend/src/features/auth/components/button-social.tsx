import { FaFacebook, FaGithub } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
// import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface ButtonSocialProps {
  provider: "google" | "github" | "facebook";
}
const ButtonSocial = ({ provider }: ButtonSocialProps) => {
  //   const searchParams = useSearchParams();
  //   const callbackUrl = searchParams?.get("callbackUrl");

  const onHandleClick = (provider: "google" | "github" | "facebook") => {
    console.log("provider", provider);
    // signIn(provider, { callbackUrl: callbackUrl ?? DEFAULT_LOGIN_REDIRECT });
  };

  const iconMap = {
    google: IoLogoGoogle,
    github: FaGithub,
    facebook: FaFacebook,
  };

  const Icon = iconMap[provider];

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="rounded-full border-primary border bg-transparent text-primary hover:bg-primary/10 size-12"
      onClick={() => onHandleClick(provider)}
    >
      <Icon style={{ height: "28px", width: "28px", flexShrink: 0 }} />
    </Button>
  );
};

export default ButtonSocial;
