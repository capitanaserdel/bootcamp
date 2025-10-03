// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()

//     const response = await fetch("https://api.simkash.com/api/v1/user/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     })

//     const data = await response.json()
//     return NextResponse.json(data, { status: response.status })
//   } catch (error) {
//     console.error("❌ Proxy error:", error)
//     return NextResponse.json(
//       { responseSuccessful: false, responseMessage: "Proxy error" },
//       { status: 500 }
//     )
//   }
// }