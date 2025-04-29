export const proverbCategories = ["IT", "Misc.", "Science", "Secular"];

export const proverbLanguages = ["eng", "swe", "fin"];

export class ActivityObject {
  constructor(
    data = {
      title: "",
      content: "",
      author: "",
      description: "",
      lang: "eng",
      likes: 0,
      category: "",
      tags: [],
    },
  ) {
    const { title, content, author, description, lang, likes, category, tags } = data;
    const now = new Date();
    this._id = null; // Placeholder for MongoDB ObjectId
    this.title = title;
    this.content = content;
    this.author = author;
    this.description = description;
    this.lang = lang;
    this.likes = likes;
    this.category = category;
    this.tags = tags;
    this.createdAt = now;
    this.updatedAt = now;
  }

  get id() {
    return this._id;
  }
}
