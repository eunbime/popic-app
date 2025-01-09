import { Switch } from "../ui/switch";

interface PrivateSwitchProps {
  isPrivate: boolean;
  setIsPrivate: (isPrivate: boolean) => void;
}

const PrivateSwitch = ({ isPrivate, setIsPrivate }: PrivateSwitchProps) => {
  return (
    <Switch className="w-10 h-6" onChange={() => setIsPrivate(!isPrivate)} />
  );
};

export default PrivateSwitch;
