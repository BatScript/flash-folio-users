import connectMongoDB from "@/lib/connect-mongoDB";

export default function handler(req, res) {
    connectMongoDB()
    
}
