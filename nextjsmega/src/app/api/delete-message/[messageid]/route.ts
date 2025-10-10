import { getServerSession } from "next-auth";
import { authOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  try{
    const updatedResult = await UserModel.updateOne(
        {_id: user._id},
        {$pull: {messages:{_id: messageId}}}
    )
    if(updatedResult.modifiedCount == 0){
        return Response.json(
            {success: false,
            message: "Message not found or already deleted"}
        ),{status: 404}
    }
    return Response.json(
        {
            status: true,
            message: "Message Deleted"
        },{status: 200}
    )
  }catch(error){
    console.log("Error in Deleting Message route",error)
    return Response.json(
        {
            status: false,
            message: "Error Deleting Message"
        },{status:500}
    )
  }
}
