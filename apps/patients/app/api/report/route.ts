import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma  from "@repo/db/client";

export async function POST(req:NextRequest){
    const body=await req.json()
    const session=await getServerSession(NEXT_AUTH_CONFIG)
    if(body.report===null){
        return NextResponse.json({
            msg:"no report provided"
        })
    }
    const appointments=await prisma.appointment.update({
      where:{
        id: body?.id
      },
      data:{
      patientReport: body?.report
      }
    })
    console.log(appointments)
    return NextResponse.json({
      msg:"added successfully"
    })
  }