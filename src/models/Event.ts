import mongoose, { Schema, model } from 'mongoose';

export enum EventType {
  StudioThree = 'studioThree',
  MensClub = 'mensClub',
  Vinhausa = 'vinhausa',
  Other = 'other',
}

export const EventTypeDisplay: Record<EventType, string> = {
  [EventType.StudioThree]: 'Studio Three',
  [EventType.MensClub]: "Men's Club",
  [EventType.Vinhausa]: 'Vinhausa',
  [EventType.Other]: 'Other',
};

export interface EventDocument {
  _id: string;
  title: string;
  description: string;
  eventDate: Date;
  startTime: string; // time of day in HH:mm format
  duration: number; // duration in minutes
  username: string;
  eventType: EventType;
  location: string; // Add this line
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<EventDocument>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
    },
    description: {
      type: String,
      default: '',
    },
    eventDate: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Event start time is required'],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        'Start time must be in HH:mm format',
      ],
    },
    duration: {
      type: Number,
      required: [true, 'Event duration is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    eventType: {
      type: String,
      enum: Object.values(EventType),
      required: [true, 'Event type is required'],
    },
    location: {
      // Add this block
      type: String,
      required: [true, 'Event location is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Event =
  mongoose.models?.Event || model<EventDocument>('Event', EventSchema);
export default Event;
