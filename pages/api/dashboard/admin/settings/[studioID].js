import db from "../../../../../lib/dbConnect";
import StudioListing from "../../../../../models/StudioListing";
import StudioService from "../../../../../models/StudioService";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const { topic } = req.query;
  if (token.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Not an admin!",
    });
  }

  if (topic === "studioservice") {
    if (req.method === "GET") {
      try {
        const { studioID } = req.query;
        const fetchingStudio = await StudioListing.find({ _id: studioID });
        return res.status(200).json({ success: true, data: fetchingStudio });
      } catch (error) {
        return res.status(400).json({ success: false, message: "Studio not found" });
      }
    } else if (req.method === "POST") {
      await db.connect();
      try {
        const service = await StudioService.create(req.body);
        return res.status(201).json({ success: true, data: service });
      } catch (error) {
        return res.status(400).json({ success: false, message: "Unauthorized", error });
      }
    } else if (req.method === "PATCH") {
      await db.connect();
      try {
        const { studioID } = req.query;
        const listing = await StudioListing.findByIdAndUpdate(studioID, req.body);
        return res.status(201).json({ success: true, data: listing });
      } catch (error) {
        return res.status(400).json({ success: false, message: "Unauthorized", error });
      }
    } else if (req.method === "DELETE") {
      await db.connect();
      try {
        const { studioID } = req.query;
        const status = await StudioListing.findByIdAndDelete(studioID);
        return res.status(201).json({ success: true, status });
      } catch (error) {
        return res.status(400).json({ success: false, message: "Unauthorized", error });
      }
    }
  }
  return res.status(400).json({
    success: false,
    message: "HTTP method is not allowed, Unauthorized",
  });
}
