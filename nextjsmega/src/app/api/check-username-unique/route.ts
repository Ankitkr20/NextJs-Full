import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schema/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    // validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message:
          usernameErrors?.length > 0
            ? usernameErrors.join(", ")
            : "Invalid Query Parameters",
      },{status: 400});
    }
  } catch (error) {
    console.error("Error Checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error Checking username",
      },
      { status: 500 }
    );
  }
}
