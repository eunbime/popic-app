import { Input } from "../ui/input";
import { useState } from "react";

interface TagsFormProps {
  tags?: string[];
  onChange: (tags: string[]) => void;
}

const TagsForm = ({ tags = [], onChange }: TagsFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    const words = value.split(" ");
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith("#") && lastWord.length > 11) {
      words[words.length - 1] = lastWord.slice(0, 11);
      value = words.join(" ");
    }

    setInputValue(value);

    const newTags = value
      .split(" ")
      .map((tag) => tag.trim())
      .filter((tag) => tag.startsWith("#"))
      .map((tag) => tag.slice(1))
      .filter((tag) => tag !== "")
      .filter((tag, index, self) => self.indexOf(tag) === index); // 중복 제거

    console.log(newTags);

    onChange(newTags);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Input
        placeholder="ex) #태그 #태그2  (최대 10개)"
        value={inputValue}
        onChange={handleChange}
      />
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <span key={tag} className="bg-gray-100 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsForm;
