import { Event } from "@server/models";
import presentUser from "./user";

export default function presentEvent(event: Event, isAdmin = false) {
  const data = {
    id: event.id,
    name: event.name,
    modelId: event.modelId,
    actorId: event.actorId,
    actorIpAddress: event.ip || undefined,
    collectionId: event.collectionId,
    documentId: event.documentId,
    createdAt: event.createdAt,
    data: event.data,
    actor: presentUser(event.actor),
  };

  if (!isAdmin) {
    delete data.actorIpAddress;
  }

  return data;
}
