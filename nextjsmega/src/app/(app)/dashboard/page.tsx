"use client";
import { useAppToast } from "@/hooks/useAppToast";
import { useCallback, useEffect, useState } from "react";
import { Message } from "@/model/User.model";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schema/acceptMessageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/MessageCard";

type AppUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
  _id?: string | null;
  isVerified?: boolean;
  isAcceptingMessages?: boolean;
};

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toastShow } = useAppToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };
  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });
  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages || false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toastShow("error", "Failed to fetch message Settings");
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/get-messages");
      setMessages(response.data.messages || []);
      if (refresh) {
        toastShow("info", "Showing latest Messages");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toastShow("error", "Failed to fetch message settings");
    } finally {
      setIsLoading(false);
      setIsSwitchLoading(false);
    }
  }, []);
  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  // handle swith change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toastShow("info", response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toastShow(
        "error",
        axiosError.response?.data.message || "Failed to fetch message settings"
      );
    }
  };
  const user = session?.user as AppUser | undefined;
  const username = user?.username ?? user?.email?.split("@")[0] ?? "guest";

  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && session?.user) {
      const user = session.user as AppUser;
      const username = user?.username ?? user?.email?.split("@")[0] ?? "guest";
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      setProfileUrl(`${baseUrl}/u/${username}`);
    }
  }, [session]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toastShow("info", "Profile URL has been copied to clipboard");
  };

  if (!session || !session.user) {
    return <>Please Login</>;
  }

  return (
    <>
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
          <div className="flex items-center">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="input input-bordered w-full p-2 mr-2"
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>
        <div className="mb-4">
          <Switch
            {...register("acceptMessages")}
            checked={acceptMessages}
            disabled={isSwitchLoading}
          />
          <span className="ml-2">
            Accept Messages: {acceptMessages ? "On" : "Off"}
          </span>
        </div>
        <Separator />
        <Button
          className="mt-4"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <MessageCard
                key={message._id}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p>No messages to Display.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
