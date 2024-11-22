export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {} 