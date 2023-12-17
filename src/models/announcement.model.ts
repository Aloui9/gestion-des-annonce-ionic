// Interface representing the structure of an announcement
export interface Announcement {
  id: string;             // Unique identifier for the announcement
  imageUrl: string;       // URL of the image associated with the announcement
  title: string;          // Title of the announcement
  description: string;    // Description providing more details about the announcement
  price: string;          // Price associated with the announcement
  category: string;       // Category to which the announcement belongs
  announcer: string;      // Email of the user making the announcement (for simplicity)
}
