import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema({
    service_id: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }
});

const Service = models.Service || model("Service", ServiceSchema);
export default Service;