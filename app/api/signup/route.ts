import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/hash";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {


//     const calculation = await prisma.calculation.findMany()

//     let json_response = {
//         status: "success",
//         results: calculation.length,
//         calculation,
//     };
//     return NextResponse.json(json_response);
// }

export async function POST(request: Request) {

    try {
        const json = await request.json();
        const hashPass = await hashPassword(json.password) 
        const user = await prisma.user.create({
            data: {
                email : json.email,
                password : hashPass,
            },
        });

        let json_response = {
            status: "success",
            data: {
                user : user.email,
                id : user.id,
                createAt : user.createdAt,
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
                message: "user with title already exists",
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

