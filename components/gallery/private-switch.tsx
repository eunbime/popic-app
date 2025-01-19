import { Switch } from "@/components/ui/switch";

interface PrivateSwitchProps {
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
}

const PrivateSwitch = ({ isPrivate, setIsPrivate }: PrivateSwitchProps) => {
  return (
    <Switch
      className="w-10 h-6"
      checked={isPrivate}
      onCheckedChange={setIsPrivate}
    />
  );
};

export default PrivateSwitch;
