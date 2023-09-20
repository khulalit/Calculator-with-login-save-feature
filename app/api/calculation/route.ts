import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next'
import { options } from "../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {

    try {
        const session = await getServerSession(options)
        if(!session?.user) return new NextResponse(JSON.stringify({
            message: 'login please'
        }),{
            status : 402
        })


        const email : any = session?.user?.email;
        const calculations = await prisma.calculation.findMany({
            where : {
                email : email
            }
        })

        let json_response = {
            status: "success",
            results: calculations.length,
            calculations,
        };
        return NextResponse.json(json_response);

    } catch (error:any) {
        let error_response = {
            status: "error",
            message: error?.message,
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
export async function DELETE(request: Request){
    try {

        const session = await getServerSession(options)
        const json = await request.json();

        if(!session?.user) return new NextResponse(JSON.stringify({
            message: 'login please'
        }),{
            status : 402
        })

        const email = session?.user.email;
        const calculation = await prisma.calculation.delete({
            where : {
                id : json.id
            }
        })

        let json_response = {
            status: "success",
            calculation,
        };
        return NextResponse.json(json_response);

    } catch (error:any) {
        let error_response = {
            status: "error",
            message: error?.message,
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session: any = await getServerSession(options);

        if(!session?.user) return new NextResponse(JSON.stringify({
            message: 'login please'
        }),{
            status : 402
        })

        const calculation = await prisma.calculation.create({
            data: {
                name : json.name,
                email : session.user.email,
                expression : json.expression,
                result : json.result,
            },
        });

        let json_response = {
            status: "success",
            data: {
                calculation,
            },
        };
        return new NextResponse(JSON.stringify(json_response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {

        if (error.code === "P2002") {
            let error_response = {
                status: "fail",
                message: "Feedback with title already exists",
            };
            return new NextResponse(JSON.stringify(error_response), {
                status: 409,
                headers: { "Content-Type": "application/json" },
            });
        }

        let error_response = {
            status: "error",
            message: error.message,
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

