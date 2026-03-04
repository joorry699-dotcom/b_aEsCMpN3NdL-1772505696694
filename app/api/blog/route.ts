import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "blog.json")
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json([])
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const blogs = JSON.parse(fileContent)
  
  return NextResponse.json(blogs)
}
