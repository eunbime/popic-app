"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ProfileSchema } from "@/schemas";
import FileUpload from "@/components/file-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfileForm = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  console.log(userData);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: userData?.name || "",
      image: userData?.image || "",
      bio: userData?.bio || "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name || "",
        image: userData.image || "",
        bio: userData.bio || "",
      });
    }
  }, [userData]);

  const image = form.watch("image");

  const { mutate: updateUser } = useMutation({
    mutationFn: (data: z.infer<typeof ProfileSchema>) => {
      return axios.put("/api/user", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const onSubmit = (data: z.infer<typeof ProfileSchema>) => {
    updateUser(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col w-full h-full"
    >
      <div className="flex items-center justify-center w-full py-5">
        <div className="relative w-[200px] h-[200px] bg-black rounded-md overflow-hidden">
          <FileUpload
            value={image || null}
            onChange={(url) => {
              form.setValue("image", url || null);
              setIsImageUploaded(!!url);
            }}
            endpoint="profileImage"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full p-4">
        <label htmlFor="name" className="text-sm text-gray-500">
          닉네임
        </label>
        <Input
          {...form.register("name")}
          placeholder="Name"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-4 w-full p-4">
        <label htmlFor="name" className="text-sm text-gray-500">
          소개
        </label>
        <Textarea
          {...form.register("bio")}
          placeholder="Name"
          className="h-[200px]"
          maxLength={500}
        />
      </div>
      <div className="flex flex-col gap-4 w-full p-4">
        <label htmlFor="name" className="text-sm text-gray-500">
          이메일
        </label>
        <p>{userData?.email}</p>
      </div>
      <div className="flex justify-center w-full p-4">
        <Button
          type="submit"
          disabled={!form.formState.isDirty && !isImageUploaded}
        >
          저장하기
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
