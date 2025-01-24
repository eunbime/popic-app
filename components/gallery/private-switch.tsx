import { Switch } from "@/components/ui/switch";

interface PrivateSwitchProps {
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
}

const PrivateSwitch = ({ isPrivate, setIsPrivate }: PrivateSwitchProps) => {
  return (
    <Switch
      className=" w-10 h-6
        dark:data-[state=unchecked]:bg-gray-400
        dark:data-[state=checked]:bg-gray-200"
      checked={isPrivate}
      onCheckedChange={setIsPrivate}
    />
  );
};

export default PrivateSwitch;
