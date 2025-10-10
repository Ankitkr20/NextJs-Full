"use client";
import axios, { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, Terminal } from "lucide-react";
import { Message } from "@/model/User.model";
import { useAppToast } from "@/hooks/useAppToast";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toastShow } = useAppToast();

  const handleDelete = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toastShow("info", response.data.message);
      onMessageDelete(message._id!); // remove from UI
    } catch (err) {
      if (err instanceof AxiosError) {
        toastShow(
          "error",
          err.response?.data?.message || "Failed to delete message"
        );
      } else {
        toastShow("error", "Something went wrong");
      }
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{message.title || "No Title"}</CardTitle>
        <Alert variant="destructive" className="mt-2">
          <Terminal className="mr-2" />
          <div>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the CLI.
            </AlertDescription>
          </div>
        </Alert>
        <CardDescription>{message.description || "No description"}</CardDescription>
      </CardHeader>

      <CardContent>{message.content}</CardContent>

      <CardFooter className="flex justify-between items-center">
        {/* <p className="text-sm text-gray-500">{message.footer || ""}</p> */}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            if (confirm("Are you sure you want to delete this message?"))
              handleDelete();
          }}
        >
          <X className="mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
